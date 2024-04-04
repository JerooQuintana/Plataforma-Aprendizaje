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
  const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errores: error.array()});
    }
  try {
    let profesor = new Profesor(req.body);
    await profesor.save();
    res.json(profesor);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) { // Verificar si la respuesta ya fue enviada
      res.status(500).send('Hubo un error');
  }
  }
};
