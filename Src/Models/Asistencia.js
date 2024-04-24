const mongoose = require('mongoose')

const AsistenciaSchema = new mongoose.Schema({
  estudiante: String,
  faltas: Number,
  tardanzas: Number,
  justificadas: Number,
  observaciones: String
})
module.exports = mongoose.model('Asistencia', AsistenciaSchema);