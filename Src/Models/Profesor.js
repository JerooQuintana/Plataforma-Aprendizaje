const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
},
apellido: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
  },
  DNI:{
    type: Number,
    required: true,
    unique: true
  },
password: {
    type: String,
    required: true
  },
    materias:[String]
});
module.exports = mongoose.model('Profesor', profesorSchema);

