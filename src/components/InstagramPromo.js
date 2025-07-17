import React from 'react';

const InstagramPromo = ({ onClick }) => {
  return (
    <div className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2">
      <div className="bg-white rounded-2xl shadow-xl p-4 w-64 transform transition-all duration-300 hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-center mb-3">
            <div className="bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 p-0.5 rounded-full">
              <div className="bg-white p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">¡Síguenos en Instagram!</h3>
          
          <div className="relative w-full h-40 mb-3 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
            <img 
              src="/images/instagram-previews.jpg" 
              alt="Instagram Feed" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400/F5F5F5/555555?text=Instagram+Feed';
              }}
            />
            <div className="absolute bottom-2 left-2 flex items-center">
              <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
                <img  
                  src="/images/logo-small.jpg" 
                
                  alt="Logo" 
                  className="h-6 w-6 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/50x50/F5F5F5/555555?text=Logo';
                  }}
                />
              </div>
              <span className="text-white text-sm font-bold drop-shadow-md">@oukite_py</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm text-center mb-4">
            Descubre nuestras últimas novedades, ofertas exclusivas.
          </p>
          
          <button 
            onClick={onClick}
            className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <span className="mr-2">¡Click aquí!</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramPromo; 