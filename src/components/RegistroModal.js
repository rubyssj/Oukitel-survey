import React, { useState } from 'react';

const RegistroModal = ({ isOpen, onClose, onRegister }) => {
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [encuestador, setEncuestador] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!nombre.trim()) {
      setError('Por favor, ingresa tu nombre');
      return;
    }
    
    // Validación de número de celular (formato básico)
    const celularRegex = /^\d{9,10}$/;
    if (!celularRegex.test(celular.trim())) {
      setError('Por favor, ingresa un número de celular válido (9-10 dígitos)');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Crear objeto de usuario
      const userData = {
        nombre: nombre.trim(),
        telefono: celular.trim(),
        encuestador: encuestador.trim() || undefined
      };
      
      // Llamar al callback con los datos del usuario
      if (onRegister) {
        onRegister(userData);
      }
      
      // Limpiar el formulario
      setNombre('');
      setCelular('');
      setEncuestador('');
      
      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error al registrar:', error);
      setError('Hubo un error al guardar tus datos. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100 border-4 border-orange-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-orange-600">¡Regístrate y Gana!</h3>
          <button 
            onClick={onClose}
            className="text-orange-500 hover:text-orange-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <div className="w-full flex justify-center mb-3">
            <div className="bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 p-0.5 rounded-full">
              <div className="bg-white p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
          
          <p className="text-orange-700 text-center mb-4 font-medium">
            ¡Completa tus datos y participa por increíbles premios Oukitel! 🎁 🎉
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
              Tu nombre completo 👤
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Ingresa tu nombre"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="celular" className="block text-gray-700 font-medium mb-1">
              Número de celular 📱
            </label>
            <div className="relative">
              <input
                type="tel"
                id="celular"
                value={celular}
                onChange={(e) => {
                  // Solo permitir números
                  const value = e.target.value.replace(/\D/g, '');
                  setCelular(value);
                }}
                className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ej: 0981123456"
                maxLength="10"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="encuestador" className="block text-gray-700 font-medium mb-1">
              Nombre del encuestador 📋 <span className="text-xs text-gray-500">(opcional)</span>
            </label>
            <input
              type="text"
              id="encuestador"
              value={encuestador}
              onChange={(e) => setEncuestador(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Nombre de quien realiza la encuesta"
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Guardando...' : '¡Registrarme ahora!'}
            </button>
          </div>
          
          <p className="text-center text-xs text-gray-500 mt-2">
            Tus datos están seguros y protegidos 🔒
          </p>
        </form>
      </div>
    </div>
  );
};

// Establecer valores predeterminados para las props
RegistroModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onRegister: () => {}
};

export default RegistroModal; 