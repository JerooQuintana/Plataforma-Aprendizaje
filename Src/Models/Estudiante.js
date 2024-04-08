const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
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
    
    nivel:{
        type: String,
        require: true
    },
});
module.exports = mongoose.model('Estudiante', estudianteSchema);