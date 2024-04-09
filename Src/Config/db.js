const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
        await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('DB Online');
  } catch (error) {
    console.error(error);
    throw new Error('Error a la hora de inicializar DB');
  }
};

module.exports = dbConnection;
