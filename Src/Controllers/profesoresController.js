const Profesor = require('../models/Profesor');
const {validationResult } = require('express-validator');
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
    await profesor.save();
    res.json(profesor);
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
