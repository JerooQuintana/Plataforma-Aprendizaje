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

exports.crearEstudiante = async (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        let estudiante = new Estudiante(req.body);
        await estudiante.save();
        res.send(estudiante);
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