const Padre = require('../Models/Padre');
const { validationResult } = require('express-validator');

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

exports.crearPadre = async (req, res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errores: error.array()});
    }
    try{
        let padre = new Padre(req.body);
        await padre.save();
        res.json(padre);
    }
    catch(error){
        console.error(error);
        if (!res.headersSent) { // Verificar si la respuesta ya fue enviada
            res.status(500).send('Hubo un error');
        }
    }
};