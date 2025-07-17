// URL base de la API
const API_URL = 'https://oukitel-backend.onrender.com/api';

const encuestaService = {
  crearEncuesta: async (encuestaData) => {
    try {
      const response = await fetch(`${API_URL}/encuestas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(encuestaData)
      });

      if (!response.ok) {
        throw new Error('Error al guardar la encuesta');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  obtenerEncuestas: async () => {
    try {
      const response = await fetch(`${API_URL}/encuestas`);
      if (!response.ok) {
        throw new Error('Error al obtener las encuestas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};

export default encuestaService; 