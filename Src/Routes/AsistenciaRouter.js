const express = require('express')
const AsistenciaRouter = express.Router()
const AsistenciaController = require('../Controllers/AsistenciaController')

AsistenciaRouter.post('/asistencias', AsistenciaController.crearAsistencia)
AsistenciaRouter.get('/asistencias', AsistenciaController.obtenerAsistencias)
AsistenciaRouter.delete('/asistencias/:id', AsistenciaController.eliminarAsistencia)

module.exports = AsistenciaRouter