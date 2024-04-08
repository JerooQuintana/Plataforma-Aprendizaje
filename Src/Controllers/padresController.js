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

exports.crearPadre = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        let padre = new Padre(req.body);
        await padre.save();
        res.json(padre);
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