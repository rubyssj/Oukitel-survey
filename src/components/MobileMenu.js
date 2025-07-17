import React, { useState } from 'react';

const MobileMenu = ({ onInstagramClick, onRegistroClick, userData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón de menú flotante */}
      <button 
        onClick={toggleMenu}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 bg-orange-500 rounded-full shadow-lg flex items-center justify-center"
        aria-label="Abrir menú"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-6 w-6 text-white transition-transform duration-300 ${isOpen ? 'transform rotate-45' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>

      {/* Menú desplegable */}
      <div 
        className={`fixed bottom-20 right-4 z-40 transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-56">
          {/* Información del usuario si está registrado */}
          {userData && (
            <div className="p-3 bg-orange-50 border-b border-orange-100">
              <p className="text-sm font-medium text-orange-800">
                ¡Hola, {userData.nombre}!
              </p>
              <p className="text-xs text-orange-600">
                Tel: {userData.telefono}
              </p>
            </div>
          )}

          {/* Opciones del menú */}
          <div className="p-2">
            {/* Opción de Instagram */}
            <button
              onClick={() => {
                onInstagramClick();
                setIsOpen(false);
              }}
              className="w-full text-left p-3 rounded-md flex items-center hover:bg-pink-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600 mr-3">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span className="text-sm">Instagram</span>
            </button>

            {/* Opción de Registro (solo si no está registrado) */}
            {!userData && (
              <button
                onClick={() => {
                  onRegistroClick();
                  setIsOpen(false);
                }}
                className="w-full text-left p-3 rounded-md flex items-center hover:bg-orange-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Registrarse</span>
              </button>
            )}
            
            {/* Información de la encuesta */}
            <div className="p-3 mt-2 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-500">
                Encuesta de productos Oukitel
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Tu opinión nos ayuda a mejorar
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu; 