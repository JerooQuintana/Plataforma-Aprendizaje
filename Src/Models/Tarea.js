const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true
  },
  descripcion:{
    type: String,
    required: true
  },
  materia: String,
  fechaInicio:{
    type: Date,
    required: true
  },
  fechaEntrega:{
    type: Date,
    required:true
  },
  estado:String,
  nota:{
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Tarea', tareaSchema);