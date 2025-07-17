import React from 'react';

const InstagramPromoMobile = ({ onClick }) => {
  return (
    <div className="lg:hidden w-full mb-4">
      <div className="bg-white rounded-xl shadow-lg p-3 w-full transform transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center">
          <div className="bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 p-0.5 rounded-full mr-3">
            <div className="bg-white p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">¡Síguenos en Instagram!</h3>
            <p className="text-gray-600 text-xs">
              Descubre nuestras novedades y ofertas
            </p>
          </div>
          
          <button 
            onClick={onClick}
            className="ml-2 py-2 px-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-sm"
          >
            <span>Ver QR</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramPromoMobile; 