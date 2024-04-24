const mongoose = require('mongoose')

const RepExamenSchema = new mongoose.Schema({
  estudiante: String,
  materia: String,
  estado: String, //corregido o pendiente
  nota: Number,
  observacion: String
})
module.exports = mongoose.model('RepExamen', RepExamenSchema)