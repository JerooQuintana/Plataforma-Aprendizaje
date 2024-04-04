const mongoose = require('mongoose');

const estudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    nivel:{
        type: String,
        require: true
    },
    estiloAprendizaje:{
        type: String,
        enum:['Visual', 'Auditivo'],
        required: false
    },
    progreso: {
        type: Map,
        of: Number,
        required: false
    }
});
module.exports = mongoose.model('Estudiante', estudianteSchema);