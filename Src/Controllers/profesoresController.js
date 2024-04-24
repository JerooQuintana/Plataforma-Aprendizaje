const Profesor = require('../Models/Profesor');
const {validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.find();
    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};

exports.crearProfesor = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    let profesor = new Profesor(req.body);
    const salt = await bcrypt.genSalt(10);
      profesor.password = await bcrypt.hash(profesor.password, salt);
    await profesor.save();
    res.json({
      profesor: profesor,
      mensaje: `Usuario [${profesor.nombre}] registrado con éxito!`
    });
  } catch (error) {
    if (error.code === 11000) {
      const campoDuplicado = Object.keys(error.keyPattern)[0];
      res.status(400).json({ mensaje: `El campo ${campoDuplicado} ya está en uso.` });
    } else {
      console.error(error);
      // Se mantiene la verificación de headersSent por si otro middleware podría haber enviado ya una respuesta
      if (!res.headersSent) {
        res.status(500).send('Hubo un error en el servidor.');
      }
    }
  }
};
exports.iniciarSesionProfesores = async (req, res) => {
  const { DNI, password } = req.body;

  try {
    const profesor = await Profesor.findOne({ DNI });
    if (!profesor) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    const isMatch = await bcrypt.compare(password, profesor.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: profesor._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, usuario: { nombre: profesor.nombre, perfil: 'profesor'} });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};