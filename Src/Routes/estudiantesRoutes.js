const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Estudiante = require('../Models/Estudiante');

// Importar el controlador de estudiantes
const estudiantesController = require('../Controllers/estudiantesController');

// validar ruta para crear un nuevo estudiante
router.post('/', [
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('email').isEmail(),
    body('DNI').isNumeric(),
    body('password').isLength({ min: 5 }),
], estudiantesController.crearEstudiante);

router.post('/login', estudiantesController.iniciarSesionEstudiante);
// Ruta para obtener todos los estudiantes 
router.get('/', estudiantesController.obtenerEstudiantes);


module.exports = router;