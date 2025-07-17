const mongoose = require('mongoose');
const Encuesta = require('./models/Encuesta');
const connectDB = require('./config/db');

const testEncuesta = async () => {
  let conn;
  try {
    conn = await connectDB();
    
    const nuevaEncuesta = new Encuesta({
      usuario: {
        nombre: "Usuario Prueba",
        telefono: "123456789"
      },
      encuestador: {
        nombre: "Encuestador Test",
        id: "TEST001"
      },
      votos: new Map([
        ['Oukitel-C3', {
          like: 1,
          dislike: 0,
          design_like: 1,
          design_dislike: 0,
          buy_yes: 1,
          buy_no: 0
        }]
      ]),
      productos: [{
        id: "Oukitel-C3",
        nombre: "Oukitel C3"
      }]
    });

    const resultado = await nuevaEncuesta.save();
    console.log('Encuesta guardada exitosamente:', resultado);
  } catch (error) {
    console.error('Error al guardar la encuesta:', error);
  } finally {
    if (conn) {
      await conn.connection.close();
      console.log('Conexión cerrada');
    }
  }
};

testEncuesta(); 