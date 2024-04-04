const express = require('express');
const {body, validationResult } = require('express-validator');
const router = express.Router();

const profesoresController = require('../Controllers/profesoresController');

router.post(
    '/',
    [
        body('nombre').not().isEmpty().withMessage('el nombre es obligatorio'),
        body('email').isEmail().withMessage('debe ser un email valido'),
        body('password').isLength({min: 6}).withMessage('la contraseña debe tener como minimo 6 caracteres')
    ],
    profesoresController.crearProfesor
);
router.get('/', profesoresController.obtenerProfesores);

module.exports = router;
