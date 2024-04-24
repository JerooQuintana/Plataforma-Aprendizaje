const mongoose = require('mongoose')

const EventoSchema = new mongoose.Schema({
  nombreEvento: String,
  fecha: Date,
  hora: String,
  descripcion: String
})
module.exports = mongoose.model('Evento', EventoSchema);