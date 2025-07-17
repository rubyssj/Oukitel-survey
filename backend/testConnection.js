const mongoose = require('mongoose');

async function testConnection() {
  try {
    const password = encodeURIComponent('97399');
    const mongoURI = `mongodb+srv://rubenroa973299:${password}@cluster0.sjgdfeu.mongodb.net/Oukitel_registro`;
    
    console.log('URI de conexión:', mongoURI);
    console.log('Intentando conectar a MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('¡Conexión exitosa!');
    console.log('Host:', conn.connection.host);
    console.log('Base de datos:', conn.connection.name);
    
    // Listar las colecciones disponibles
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Colecciones disponibles:', collections.map(c => c.name));
    
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada correctamente');
  } catch (error) {
    console.error('Error detallado:', error);
  }
}

testConnection(); 