const express = require('express')
const RepAcademicoRouter = express.Router()
const RepAcademicoController = require('../Controllers/RepAcademicoController')

RepAcademicoRouter.post('/repacademico', RepAcademicoController.crearRepAcademico)
RepAcademicoRouter.get('/repacademico', RepAcademicoController.obtenerRepAcademico)

module.exports = RepAcademicoRouter
