const mongoose = require('mongoose')

const mensajeAlumnoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fechaEnvio: Date,
  estado: String
})
module.exports = mongoose.model('mensajeAlumno', mensajeAlumnoSchema)