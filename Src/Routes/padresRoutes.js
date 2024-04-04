const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const padresController = require('../Controllers/padresController');

router.post(
    '/',
    [
        body('nombre').not().isEmpty().withMessage('el nombre es obligatorio'),
        body('email').isEmail().withMessage('debe ser un email valido'),
        body('password').isLength({min: 6}).withMessage('la contraseña debe tener como minimo 6 caracteres')
    ],
    padresController.crearPadre
);
router.get('/', padresController.obtenerPadres);


module.exports = router;
