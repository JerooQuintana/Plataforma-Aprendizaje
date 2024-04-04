const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://jeroquintana18:locl1206@cluster0.xow5jup.mongodb.net/Plataforma-aprendizaje-DB');
    console.log('DB Online');
  } catch (error) {
    console.error(error);
    throw new Error('Error a la hora de inicializar DB');
  }
};

module.exports = dbConnection;
