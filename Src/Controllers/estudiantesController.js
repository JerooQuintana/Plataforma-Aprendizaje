const { validationResult } = require('express-validator');
const Estudiante = require('../Models/Estudiante');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.obtenerEstudiantes = async (req, res)=>{
    try{
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    }
    catch(error){
        console.error(error);
        res.status(500).send('hubo un error');
    }
};

exports.crearEstudiante = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
  }

  try {
      // Crear una instancia del modelo Estudiante con los datos del body del request
      let estudiante = new Estudiante(req.body);

      // Generar sal y hashear la contraseña antes de guardarla en la base de datos
      const salt = await bcrypt.genSalt(10);
      estudiante.password = await bcrypt.hash(estudiante.password, salt);

      // Guardar el estudiante en la base de datos
      await estudiante.save();

      // Enviar respuesta exitosa al cliente
      res.send(estudiante);
  } catch (error) {
      if (error.code === 11000) {
          // Manejar error de duplicidad (e.g., DNI o email ya registrado)
          const campoDuplicado = Object.keys(error.keyPattern)[0];
          res.status(400).json({ mensaje: `El campo ${campoDuplicado} ya está en uso.` });
      } else {
          console.error(error);
          if (!res.headersSent) {
              res.status(500).send('Hubo un error en el servidor.');
          }
      }
  }
};

exports.iniciarSesionEstudiante = async (req, res) => {
  const { DNI, password } = req.body;

  try {
    const estudiante = await Estudiante.findOne({ DNI });
    if (!estudiante) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    const isMatch = await bcrypt.compare(password, estudiante.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: estudiante._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const usuario = { nombre: estudiante.nombre, perfil: 'estudiante' };
    res.json({ token, usuario }); // Asegúrate de que esta línea está correctamente formateada
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};
