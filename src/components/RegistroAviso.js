import React from 'react';

const RegistroAviso = ({ onClick }) => {
  // Función segura que verifica si onClick es una función antes de llamarla
  const handleClick = (e) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <div className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2">
      <div 
        className="bg-white rounded-2xl shadow-xl p-4 w-64 transform transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-orange-500"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center">
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
          
          <h3 className="text-xl font-bold text-orange-600 mb-2 text-center">¡Regístrate y Gana!</h3>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-3 mb-3 rounded-lg">
            <p className="text-orange-700 text-sm font-medium">
              ¡Participa en nuestra encuesta y podrás ganar increíbles premios Oukitel! 🎁 ¡Regístrate ahora y comienza la diversión!
            </p>
          </div>
          
          <div className="w-full space-y-2 mb-3">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <p className="text-gray-700 text-sm">¡Proceso súper rápido! ⚡</p>
            </div>
            
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <p className="text-gray-700 text-sm">Solo nombre y celular 📱</p>
            </div>
            
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <p className="text-gray-700 text-sm">¡Sorpresas exclusivas! 🎉</p>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el evento se propague al div padre
              handleClick(e);
            }}
            className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <span className="mr-2">¡Registrarme ahora!</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Establecer valores predeterminados para las props
RegistroAviso.defaultProps = {
  onClick: () => {}
};

export default RegistroAviso; 