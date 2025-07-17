import React from 'react';

const RegistroAvisoMobile = ({ onClick }) => {
  // Función segura que verifica si onClick es una función antes de llamarla
  const handleClick = (e) => {
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <div className="lg:hidden w-full mb-4">
      <div 
        className="bg-white rounded-xl shadow-lg p-3 w-full transform transition-all duration-300 hover:shadow-xl cursor-pointer border-2 border-orange-500"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className="bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 p-0.5 rounded-full mr-3">
            <div className="bg-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-orange-600">¡Regístrate y Gana!</h3>
            <p className="text-orange-700 text-xs font-medium">
              ¡Participa y gana premios Oukitel! 🎁 🎉
            </p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el evento se propague al div padre
              handleClick(e);
            }}
            className="ml-2 py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm"
          >
            <span>¡Registrarme!</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Establecer valores predeterminados para las props
RegistroAvisoMobile.defaultProps = {
  onClick: () => {}
};

export default RegistroAvisoMobile;