const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const padreSchema = new Schema({
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
    hijos: [{
        type: Schema.Types.ObjectId,
        ref: 'Estudiante'
    }]
});
module.exports = mongoose.model('Padre', padreSchema);