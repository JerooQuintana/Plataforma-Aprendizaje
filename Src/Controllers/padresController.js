const Padre = require('../Models/Padre');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.obtenerPadres = async (req, res) =>{
    try{
        const padres = await Padre.find();
        res.json(padres);
    }
    catch(error){
        console.error(error);
        res.status(500).send('hubo un error');
    }
};

exports.crearPadre = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        let padre = new Padre(req.body);
        const salt = await bcrypt.genSalt(10);
      padre.password = await bcrypt.hash(padre.password, salt);
        await padre.save();
        res.json({
          padre: padre,
          mensaje: `Usuario [${padre.nombre}] registrado con éxito!`
        });
    } catch (error) {
        if (error.code === 11000) {
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

exports.iniciarSesionPadre = async (req, res) => {
    const { DNI, password } = req.body;
  
    try {
      const padre = await Padre.findOne({ DNI });
      if (!padre) {
        return res.status(404).json({ msg: 'El usuario no existe' });
      }
  
      const isMatch = await bcrypt.compare(password, padre.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Contraseña incorrecta' });
      }
  
      const token = jwt.sign(
        { id: padre._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token, usuario: { nombre: padre.nombre, perfil: 'padre'} });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  };