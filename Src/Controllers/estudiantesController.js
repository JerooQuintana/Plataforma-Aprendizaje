const { validationResult } = require('express-validator');
const Estudiante = require('../Models/Estudiante');

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

exports.crearEstudiante = async (req, res, next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errores: error.array() })
    }
    try{
        let estudiante = new Estudiante(req.body);
        await estudiante.save();
        res.send(estudiante);
    }
    catch(error){
        console.error(error);
        if (!res.headersSent) { // Verificar si la respuesta ya fue enviada
            res.status(500).send('Hubo un error');
        }
    }
};