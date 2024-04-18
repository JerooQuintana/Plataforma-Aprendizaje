const express = require('express');
const {body, validationResult } = require('express-validator');
const router = express.Router();
const profesoresController = require('../Controllers/profesoresController');

router.post('/', [
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('email').isEmail(),
    body('DNI').isNumeric(),
    body('password').isLength({ min: 5 }),
], profesoresController.crearProfesor);

router.post('/login', profesoresController.iniciarSesionProfesores);

router.get('/', profesoresController.obtenerProfesores);

module.exports = router;
