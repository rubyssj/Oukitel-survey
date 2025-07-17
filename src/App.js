import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import QRModal from './components/QRModal';
import RegistroModal from './components/RegistroModal';
import InstagramPromo from './components/InstagramPromo';
import InstagramPromoMobile from './components/InstagramPromoMobile';
import RegistroAviso from './components/RegistroAviso';
import RegistroAvisoMobile from './components/RegistroAvisoMobile';
import { defaultProducts } from './mock/products';
import { getNextIndex, getPreviousIndex } from './utils/helpers';
import encuestaService from './services/encuestaService';

function App() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const [completedProducts, setCompletedProducts] = useState([]);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Verificar si todos los productos han sido completados
  const allProductsCompleted = () => {
    return completedProducts.length === defaultProducts.length;
  };

  const handleVote = (productId, type, category) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [productId]: {
        ...prevVotes[productId],
        [type]: (prevVotes[productId]?.[type] || 0) + 1,
      },
    }));
  };
  
  const handleProductComplete = (productId, productVotes) => {
    // Marcar el producto como completado si aún no está en la lista
    if (!completedProducts.includes(productId)) {
      setCompletedProducts(prev => [...prev, productId]);
    }
    
    // Si estamos en el último producto y está completo, marcar la encuesta como completada
    if (currentProductIndex === defaultProducts.length - 1) {
      setSurveyCompleted(true);
    }
  };

  const handleNext = () => {
    // Solo permitir avanzar si el producto actual está completo
    if (completedProducts.includes(defaultProducts[currentProductIndex].id)) {
      setCurrentProductIndex(getNextIndex(currentProductIndex, defaultProducts.length));
    } else {
      // Mostrar algún tipo de alerta o feedback (opcional)
      alert("Por favor, responde a todas las preguntas antes de continuar.");
    }
  };

  const handlePrevious = () => {
    setCurrentProductIndex(getPreviousIndex(currentProductIndex, defaultProducts.length));
  };
  
  const handleRegistroClick = () => {
    // Si el usuario ya está registrado, no mostrar el modal nuevamente
    if (userData) {
      alert("¡Ya estás registrado como " + userData.nombre + "!");
      return;
    }
    
    // Mostrar el modal de registro
    setShowRegistroModal(true);
  };
  
  const handleCloseRegistroModal = () => {
    // Cerrar el modal de registro
    setShowRegistroModal(false);
  };
  
  const handleSubmitClick = () => {
    // Verificar que todos los productos estén completos antes de mostrar el registro
    if (allProductsCompleted()) {
      // Si el usuario ya está registrado, enviar la encuesta directamente
      if (userData) {
        handleSubmitSurvey(userData);
      } else {
        // Mostrar el modal de registro
        setShowRegistroModal(true);
      }
    } else {
      alert("Por favor, completa la encuesta para todos los productos antes de enviar.");
    }
  };
  
  const handleRegister = (data) => {
    // Guardar los datos del usuario
    const userDataFormatted = {
      nombre: data.nombre,
      telefono: data.telefono,
      encuestador: data.encuestador
    };
    
    // Guardar los datos del usuario
    setUserData(userDataFormatted);
    
    // Cerrar el modal de registro
    setShowRegistroModal(false);
    
    // Si la encuesta está completa, enviar los datos
    if (allProductsCompleted()) {
      handleSubmitSurvey(userDataFormatted);
    }
  };
  
  const handleSubmitSurvey = async (user) => {
    // Verificar que user tenga los campos requeridos
    if (!user || !user.nombre || !user.telefono) {
      console.error('Datos de usuario incompletos:', user);
      alert('Error: Datos de usuario incompletos. Por favor, regístrate nuevamente.');
      setShowRegistroModal(true);
      return;
    }
    
    // Indicar que estamos guardando
    setIsSaving(true);
    
    try {
      // Crear objeto con los datos de la encuesta
      const surveyData = {
        usuario: {
          nombre: user.nombre,
          telefono: user.telefono
        },
        votos: votes,
        productos: defaultProducts.map(product => ({
          id: product.id,
          nombre: product.name
        }))
      };
      
      // Añadir información del encuestador si existe
      if (user.encuestador) {
        surveyData.encuestador = {
          nombre: user.encuestador
        };
      }
      
      // Guardar usando el servicio
      await encuestaService.crearEncuesta(surveyData);
      
      console.log('Encuesta guardada exitosamente:', surveyData);
      
      // Mostrar mensaje de agradecimiento
      setShowThankYou(true);
      
      // Después de 5 segundos, reiniciar la encuesta
      setTimeout(() => {
        setShowThankYou(false);
        setVotes({});
        setCompletedProducts([]);
        setSurveyCompleted(false);
        setCurrentProductIndex(0);
        setUserData(null);
      }, 5000);
    } catch (error) {
      console.error('Error al guardar la encuesta:', error);
      alert('Hubo un problema al guardar la encuesta. Por favor, intenta nuevamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleQRModal = () => {
    setShowQRModal(!showQRModal);
  };

  useEffect(() => {
    // Opcional: Puedes imprimir los votos en la consola para ver el resultado
    console.log('Votos actuales:', votes);
    console.log('Productos completados:', completedProducts);
    if (userData) {
      console.log('Datos del usuario:', userData);
    }
  }, [votes, completedProducts, userData]);

  // Verificar si el producto actual está completo
  const isCurrentProductCompleted = completedProducts.includes(defaultProducts[currentProductIndex].id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex flex-col items-center justify-between p-4 overflow-hidden">
      {showThankYou ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
            <h2 className="text-4xl font-extrabold text-orange-600 mb-4">¡Gracias {userData?.nombre}!</h2>
            <p className="text-xl text-gray-700">Tu opinión es muy importante para nosotros.</p>
            <div className="text-6xl mt-6 mb-4">👍</div>
            
            <button 
              onClick={toggleQRModal}
              className="mt-4 flex items-center justify-center space-x-2 mx-auto px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Síguenos en Instagram
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className="w-full text-center mb-2">
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
              Encuesta de Productos Oukitel
            </h1>
            <p className="text-lg text-white mt-1">
              Tu opinión nos ayuda a mejorar
            </p>
            {userData && (
              <p className="text-sm text-white font-medium mt-1 bg-orange-700 bg-opacity-50 inline-block px-3 py-1 rounded-full">
                {userData.nombre} | {userData.telefono}
              </p>
            )}
          </header>
          
          {/* Versión móvil del promo de Instagram y aviso de registro */}
          <div className="w-full flex flex-col space-y-2">
            <InstagramPromoMobile onClick={toggleQRModal} />
            {!userData && <RegistroAvisoMobile onClick={handleRegistroClick} />}
          </div>
          
          <div className="flex-1 w-full flex flex-col items-center justify-center relative">
            {/* Componente de promoción de Instagram para escritorio */}
            <InstagramPromo onClick={toggleQRModal} />
            
            {/* Componente de aviso de registro para escritorio */}
            {!userData && <RegistroAviso onClick={handleRegistroClick} />}
            
            {/* Contenedor para el producto y los botones de navegación */}
            <div className="relative w-full max-w-4xl flex items-center justify-center">
              {/* Botón anterior */}
              <button
                onClick={handlePrevious}
                disabled={currentProductIndex === 0}
                className={`absolute left-0 z-10 p-3 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                  currentProductIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'
                }`}
                aria-label="Producto anterior"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Tarjeta de producto */}
              <div className="w-full max-w-md">
                <ProductCard
                  key={defaultProducts[currentProductIndex].id}
                  product={defaultProducts[currentProductIndex]}
                  onVote={handleVote}
                  onComplete={handleProductComplete}
                />
              </div>
              
              {/* Botón siguiente o enviar encuesta */}
              {surveyCompleted ? (
                <div className="absolute right-0 z-10">
                  <button
                    onClick={handleSubmitClick}
                    className="py-3 px-6 bg-orange-700 text-white rounded-xl shadow-lg hover:bg-orange-800 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 text-xl font-bold"
                  >
                    Enviar Encuesta
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentProductCompleted}
                  className={`absolute right-0 z-10 p-3 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                    !isCurrentProductCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'
                  }`}
                  aria-label="Siguiente producto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <footer className="w-full flex flex-col items-center mt-4">
            <div className="flex justify-between w-full max-w-md mb-4">
              <div className="flex space-x-2">
                {defaultProducts.map((product, index) => (
                  <div 
                    key={index} 
                    className={`w-3 h-3 rounded-full ${
                      index === currentProductIndex 
                        ? 'bg-white' 
                        : completedProducts.includes(product.id)
                          ? 'bg-green-400'
                          : 'bg-white bg-opacity-30'
                    }`}
                  />
                ))}
              </div>
              
              <div className="text-sm text-white">
                {currentProductIndex + 1} / {defaultProducts.length}
              </div>
            </div>
            
            {!isCurrentProductCompleted && (
              <p className="text-white text-sm mt-2 text-center bg-orange-700 bg-opacity-50 px-3 py-1 rounded-full">
                * Por favor, responde a todas las preguntas para continuar
              </p>
            )}
          </footer>
          
          {/* Botones de acción en la parte inferior */}
          <div className="w-full max-w-4xl flex justify-center mt-4">
            {surveyCompleted ? (
              <button
                onClick={handleSubmitClick}
                disabled={isSaving}
                className={`py-3 px-6 bg-orange-700 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-orange-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                  isSaving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <>
                    <span className="inline-block animate-spin mr-2">⏳</span>
                    Enviando...
                  </>
                ) : (
                  'Enviar Encuesta'
                )}
              </button>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={handleNext}
                  disabled={!isCurrentProductCompleted}
                  className={`py-3 px-6 bg-orange-600 text-white text-xl font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                    !isCurrentProductCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-700'
                  }`}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Modal de QR de Instagram */}
      <QRModal 
        isOpen={showQRModal} 
        onClose={toggleQRModal} 
        qrImage="/images/instagram-qr.jpg" 
      />
      
      {/* Modal de Registro */}
      <RegistroModal 
        isOpen={showRegistroModal}
        onClose={handleCloseRegistroModal}
        onRegister={handleRegister}
        productos={defaultProducts}
      />
    </div>
  );
}

export default App;