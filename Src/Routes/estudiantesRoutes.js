const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
// Importar el controlador de estudiantes
const estudiantesController = require('../Controllers/estudiantesController');

// validar ruta para crear un nuevo estudiante
router.post(
    '/estudiantes',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'Debe ser un email válido').isEmail(),
        check('DNI', 'El DNI debe ser numérico y de 8 dígitos').isNumeric().isLength({ min: 8, max: 8 }),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    estudiantesController.crearEstudiante
);
// Ruta para obtener todos los estudiantes 
router.get('/', estudiantesController.obtenerEstudiantes);

module.exports = router;