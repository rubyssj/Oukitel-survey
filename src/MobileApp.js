import React, { useState, useEffect } from 'react';
import MobileProductCard from './components/MobileProductCard';
import QRModal from './components/QRModal';
import RegistroModal from './components/RegistroModal';
import MobileMenu from './components/MobileMenu';
import { defaultProducts } from './mock/products';
import { getNextIndex, getPreviousIndex } from './utils/helpers';
import encuestaService from './services/encuestaService';
import './mobileStyles.css';

function MobileApp() {
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
      
      // Si es el último producto, marcar la encuesta como completada
      if (currentProductIndex === defaultProducts.length - 1) {
        setSurveyCompleted(true);
      }
    }
  };

  const handleNext = () => {
    if (completedProducts.includes(defaultProducts[currentProductIndex].id)) {
      setCurrentProductIndex(getNextIndex(currentProductIndex, defaultProducts.length));
    } else {
      alert("Por favor, responde a todas las preguntas antes de continuar.");
    }
  };

  const handlePrevious = () => {
    setCurrentProductIndex(getPreviousIndex(currentProductIndex, defaultProducts.length));
  };
  
  const handleRegistroClick = () => {
    if (userData) {
      alert("¡Ya estás registrado como " + userData.nombre + "!");
      return;
    }
    setShowRegistroModal(true);
  };
  
  const handleCloseRegistroModal = () => {
    setShowRegistroModal(false);
  };
  
  const handleSubmitClick = () => {
    if (allProductsCompleted()) {
      if (userData) {
        handleSubmitSurvey(userData);
      } else {
        setShowRegistroModal(true);
      }
    } else {
      alert("Por favor, completa la encuesta para todos los productos antes de enviar.");
    }
  };
  
  const handleRegister = (data) => {
    const userDataFormatted = {
      nombre: data.nombre,
      telefono: data.telefono,
      encuestador: data.encuestador
    };
    
    setUserData(userDataFormatted);
    setShowRegistroModal(false);
    
    if (allProductsCompleted()) {
      handleSubmitSurvey(userDataFormatted);
    }
  };
  
  const handleSubmitSurvey = async (user) => {
    if (!user || !user.nombre || !user.telefono) {
      console.error('Datos de usuario incompletos:', user);
      alert('Error: Datos de usuario incompletos. Por favor, regístrate nuevamente.');
      setShowRegistroModal(true);
      return;
    }
    
    setIsSaving(true);
    
    try {
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
      
      if (user.encuestador) {
        surveyData.encuestador = {
          nombre: user.encuestador
        };
      }
      
      await encuestaService.crearEncuesta(surveyData);
      
      console.log('Encuesta guardada exitosamente:', surveyData);
      
      setShowThankYou(true);
      
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
    console.log('Votos actuales:', votes);
    console.log('Productos completados:', completedProducts);
    if (userData) {
      console.log('Datos del usuario:', userData);
    }
  }, [votes, completedProducts, userData]);

  const isCurrentProductCompleted = completedProducts.includes(defaultProducts[currentProductIndex].id);
  const progress = (completedProducts.length / defaultProducts.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex flex-col items-center p-3 pb-20">
      {showThankYou ? (
        <div className="flex flex-col items-center justify-center h-full text-center mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-extrabold text-orange-600 mb-3">¡Gracias {userData?.nombre}!</h2>
            <p className="text-lg text-gray-700">Tu opinión es muy importante para nosotros.</p>
            <div className="text-5xl my-4">👍</div>
            
            <button 
              onClick={toggleQRModal}
              className="mt-3 flex items-center justify-center mx-auto px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
          <header className="w-full text-center mb-3 sticky top-0 bg-orange-500 py-2 px-3 rounded-b-xl shadow-md z-10">
            <h1 className="text-xl font-bold text-white drop-shadow-sm">
              Encuesta Oukitel
            </h1>
            {userData && (
              <p className="text-sm text-white font-medium mt-1">
                {userData.nombre} | {userData.telefono}
              </p>
            )}
          </header>

          {/* Barra de progreso */}
          <div className="w-full max-w-md mx-auto mb-3 px-2">
            <div className="w-full bg-white bg-opacity-30 rounded-full h-1.5">
              <div
                className="bg-white h-full rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-white">
              <span>Producto {currentProductIndex + 1} de {defaultProducts.length}</span>
              <span>{Math.round(progress)}% completado</span>
            </div>
          </div>
          
          {/* Contenedor principal con tarjeta de producto y navegación */}
          <div className="w-full max-w-md flex flex-col items-center">
            {/* Tarjeta de producto */}
            <div className="w-full mb-3">
              <MobileProductCard
                product={defaultProducts[currentProductIndex]}
                onVote={handleVote}
                onComplete={handleProductComplete}
              />
            </div>
            
            {/* Botones de navegación */}
            <div className="w-full flex justify-between mb-4 px-2">
              <button
                onClick={handlePrevious}
                disabled={currentProductIndex === 0}
                className={`p-2 bg-white rounded-full shadow-lg ${
                  currentProductIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {surveyCompleted ? (
                <button
                  onClick={handleSubmitClick}
                  disabled={isSaving}
                  className={`py-2 px-4 bg-orange-700 text-white rounded-xl shadow-lg hover:bg-orange-800 transition-all duration-300 font-bold ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <span className="inline-block animate-spin mr-2">⏳</span>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    'Enviar Encuesta'
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentProductCompleted}
                  className={`p-2 bg-white rounded-full shadow-lg ${
                    !isCurrentProductCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-orange-600"
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
          
          {/* Menú móvil */}
          <MobileMenu 
            onInstagramClick={toggleQRModal}
            onRegistroClick={handleRegistroClick}
            userData={userData}
          />
        </>
      )}
      
      {/* Modal de QR de Instagram */}
      {showQRModal && (
        <QRModal 
          isOpen={showQRModal} 
          onClose={toggleQRModal} 
          qrImage="/images/instagram-qr.jpg" 
        />
      )}
      
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

export default MobileApp; 