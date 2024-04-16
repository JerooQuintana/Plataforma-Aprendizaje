const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const padresController = require('../Controllers/padresController');

router.post('/', 
[
  body('nombre').not().isEmpty(),
  body('apellido').not().isEmpty(),
  body('email').isEmail(),
  body('DNI').isNumeric(),
  body('password').isLength({ min: 5 }),
], padresController.crearPadre);

router.post('/login', padresController.iniciarSesionPadre);

router.get('/', padresController.obtenerPadres);


module.exports = router;
