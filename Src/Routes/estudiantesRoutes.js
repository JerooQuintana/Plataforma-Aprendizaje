const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Estudiante = require('../Models/Estudiante');

// Importar el controlador de estudiantes
const estudiantesController = require('../Controllers/estudiantesController');

router.post('/login', async (req, res) => {
  const { DNI, password } = req.body;

  try {
    // Buscar el estudiante por DNI
    const estudiante = await Estudiante.findOne({ DNI });
    if (!estudiante) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, estudiante.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Si todo es correcto, enviar respuesta positiva
    res.json({ msg: 'Inicio de sesión exitoso', estudiante });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});
// validar ruta para crear un nuevo estudiante
router.post('/', [
    body('nombre').not().isEmpty(),
    body('apellido').not().isEmpty(),
    body('email').isEmail(),
    body('DNI').isNumeric(),
    body('password').isLength({ min: 5 }),
], estudiantesController.crearEstudiante);


router.post('/login', async (req, res) => {
    const { DNI, password } = req.body;
  
    try {
      // Buscar el estudiante por DNI
      const estudiante = await Estudiante.findOne({ DNI: DNI });
      if (!estudiante) {
        return res.status(400).json({ message: 'El usuario no existe' });
      }
  
      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, estudiante.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      // Si todo es correcto, enviar confirmación
      res.json({ message: 'Inicio de sesión exitoso', estudiante: estudiante });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });
// Ruta para obtener todos los estudiantes 
router.get('/', estudiantesController.obtenerEstudiantes);


module.exports = router;