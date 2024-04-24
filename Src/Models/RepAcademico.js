const mongoose = require('mongoose')

const RepAcademicoSchema = new mongoose.Schema({
  estudiante:{
    type: String,
    required: true
  },
  notas:{
    type: Object,
    required: true
  },
  observaciones:{
    type: String,
    required: true
  }
})
module.exports = mongoose.model('RepAcademico', RepAcademicoSchema);