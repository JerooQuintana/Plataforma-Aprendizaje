const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
// Importar el controlador de estudiantes
const estudiantesController = require('../Controllers/estudiantesController');

// validar ruta para crear un nuevo estudiante
router.post(
    '/',
    [
        body('nombre').not().isEmpty().withMessage('el nombre es obligatorio'),
        body('edad').isNumeric().withMessage('la edad es obligatoria'),
        body('nivel').not().isEmpty().withMessage('el nivel es obligatorio')
    ],
    estudiantesController.crearEstudiante
);
// Ruta para obtener todos los estudiantes 
router.get('/', estudiantesController.obtenerEstudiantes);

module.exports = router;