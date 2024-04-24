const express = require('express')
const EventoRouter = express.Router()
const EventoController = require('../Controllers/EventoController')

EventoRouter.post('/eventos', EventoController.crearEvento)
EventoRouter.get('/eventos', EventoController.obtenerEventos)
// ProfeRouter.delete('/eventos/:id', EventoController.eliminarEvento)

module.exports = EventoRouter

