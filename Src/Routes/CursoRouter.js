const express = require('express')
const CursoRouter = express.Router()
const CursoController = require('../Controllers/CursoController')

CursoRouter.post('/cursos', CursoController.crearCurso)
CursoRouter.get('/cursos', CursoController.obtenerCursos)
CursoRouter.delete('/cursos/:id', CursoController.eliminarCurso)

module.exports = CursoRouter