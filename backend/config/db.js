const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    console.log('Using cached database connection');
    return cachedConnection;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://oukitel_app:oukitel123456@cluster0.sjgdfeu.mongodb.net/Oukitel_registro';
    
    console.log('Intentando conectar a MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    cachedConnection = conn;
    return conn;
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    return null;
  }
};

// Asegurarse de que la conexión se cierre cuando la aplicación se detenga
process.on('SIGTERM', async () => {
  if (cachedConnection) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
  process.exit(0);
});

module.exports = connectDB; 