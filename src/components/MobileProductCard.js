import React, { useState, useEffect } from 'react';
import ProductImage from './ProductImage';

const MobileProductCard = ({ product, onVote, onComplete }) => {
  const [votes, setVotes] = useState({
    model: null,  // like o dislike
    design: null, // design_like o design_dislike
    purchase: null // buy_yes o buy_no
  });
  
  const [activeTab, setActiveTab] = useState('info'); // 'info' o 'vote'

  const handleVote = (category, type) => {
    const newVotes = {
      ...votes,
      [category]: type
    };
    
    setVotes(newVotes);
    
    // Verificar si todas las preguntas han sido respondidas
    const allQuestionsAnswered = Object.values(newVotes).every(vote => vote !== null);
    
    // Llamar a onVote con el ID del producto y el tipo de voto
    onVote(product.id, type, category);
    
    // Si todas las preguntas han sido respondidas, notificar al componente padre
    if (allQuestionsAnswered) {
      setTimeout(() => {
        onComplete(product.id, newVotes);
      }, 500);
    }
  };

  // Verificar si todas las preguntas han sido respondidas
  const allAnswered = Object.values(votes).every(vote => vote !== null);
  
  // Efecto para cambiar automáticamente a la pestaña de votación cuando se carga un nuevo producto
  useEffect(() => {
    // Resetear los votos cuando cambia el producto
    setVotes({
      model: null,
      design: null,
      purchase: null
    });
    
    // Cambiar automáticamente a la pestaña de votación al cargar un nuevo producto
    setActiveTab('vote');
  }, [product.id]);

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg w-full overflow-hidden">
      {/* Cabecera con imagen y nombre */}
      <div className="w-full p-3 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center">
          <div className="image-container-small mr-3">
            <ProductImage
              src={product.image}
              alt={product.name}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
            <p className="text-xs text-gray-600 line-clamp-1">{product.description.substring(0, 60)}...</p>
          </div>
        </div>
      </div>
      
      {/* Pestañas */}
      <div className="w-full flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'info' 
              ? 'text-orange-600 border-b-2 border-orange-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Información
        </button>
        <button 
          onClick={() => setActiveTab('vote')}
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === 'vote' 
              ? 'text-orange-600 border-b-2 border-orange-500' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Valoración
        </button>
      </div>
      
      {/* Contenido según la pestaña activa */}
      <div className="w-full p-3">
        {activeTab === 'info' ? (
          // Pestaña de información
          <div className="text-sm">
            <p className="text-gray-600 mb-3">{product.description}</p>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Características:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-xs text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // Pestaña de votación
          <div className="w-full flex flex-col items-center space-y-3">
            <div className="w-full">
              <p className="text-sm font-semibold text-gray-800 mb-1">1. ¿Te gusta este modelo?</p>
              <div className="flex space-x-2 w-full justify-center">
                <button
                  onClick={() => handleVote('model', 'like')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    votes.model === 'like'
                      ? 'bg-teal-600 text-white shadow'
                      : 'bg-gray-100 text-gray-800 hover:bg-teal-500 hover:text-white'
                  }`}
                >
                  👍 Sí
                </button>
                <button
                  onClick={() => handleVote('model', 'dislike')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    votes.model === 'dislike'
                      ? 'bg-orange-600 text-white shadow'
                      : 'bg-gray-100 text-gray-800 hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  👎 No
                </button>
              </div>
              {!votes.model && (
                <p className="text-xs text-orange-500 mt-1 text-center">* Respuesta requerida</p>
              )}
            </div>

            <div className="w-full">
              <p className="text-sm font-semibold text-gray-800 mb-1">2. ¿Te gusta el diseño?</p>
              <div className="flex space-x-2 w-full justify-center">
                <button
                  onClick={() => handleVote('design', 'design_like')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    votes.design === 'design_like'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-gray-100 text-gray-800 hover:bg-indigo-500 hover:text-white'
                  }`}
                >
                  🎨 Sí
                </button>
                <button
                  onClick={() => handleVote('design', 'design_dislike')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    votes.design === 'design_dislike'
                      ? 'bg-pink-600 text-white shadow'
                      : 'bg-gray-100 text-gray-800 hover:bg-pink-500 hover:text-white'
                  }`}
                >
                  🚫 No
                </button>
              </div>
              {!votes.design && (
                <p className="text-xs text-orange-500 mt-1 text-center">* Respuesta requerida</p>
              )}
            </div>
            
            <div className="w-full">
              <p className="text-sm font-semibold text-gray-800 mb-1">3. ¿Comprarías este teléfono?</p>
              <div className="flex space-x-2 w-full justify-center">
                <button
                  onClick={() => handleVote('purchase', 'buy_yes')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    votes.purchase === 'buy_yes'
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white'
                  }`}
                >
                  💰 Sí
                </button>
                <button
                  onClick={() => handleVote('purchase', 'buy_no')}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    votes.purchase === 'buy_no'
                      ? 'bg-red-600 text-white shadow'
                      : 'bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  ❌ No
                </button>
              </div>
              {!votes.purchase && (
                <p className="text-xs text-orange-500 mt-1 text-center">* Respuesta requerida</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Pie con mensaje de completado */}
      {allAnswered && (
        <div className="w-full p-2 bg-green-50 border-t border-green-100 text-center">
          <p className="text-green-600 font-bold text-xs">
            ✓ ¡Gracias por tus respuestas!
          </p>
        </div>
      )}
    </div>
  );
};

export default MobileProductCard; 