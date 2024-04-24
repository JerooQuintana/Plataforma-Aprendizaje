const express = require('express');
const TareaRouter = express.Router();
const TareaController = require('../Controllers/TareaController');

TareaRouter.post('/tareas', TareaController.crearTarea);
TareaRouter.get('/tareas', TareaController.obtenerTareas);
TareaRouter.delete('/tareas/:id', TareaController.eliminarTarea)

module.exports = TareaRouter;