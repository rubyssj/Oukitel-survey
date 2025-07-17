import React, { useState } from 'react';

const RegistroExpress = ({ onRegister, isVisible }) => {
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
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
    
    // Si todo está bien, enviar los datos
    onRegister({ nombre, celular });
    setError('');
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Registro Express</h2>
      
      <p className="text-gray-600 text-center mb-6">
        Para enviar tu encuesta, por favor completa estos datos:
      </p>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu nombre"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="celular" className="block text-gray-700 font-medium mb-1">
            Número de celular
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 0981123456"
              maxLength="10"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 px-6 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 text-xl font-bold"
        >
          Continuar
        </button>
      </form>
    </div>
  );
};

export default RegistroExpress; 