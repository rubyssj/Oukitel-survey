import React, { useState } from 'react';
import ProductImage from './ProductImage';

const ProductCard = ({ product, onVote, onComplete }) => {
  const [votes, setVotes] = useState({
    model: null,  // like o dislike
    design: null, // design_like o design_dislike
    purchase: null // buy_yes o buy_no
  });

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

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.01] mx-auto max-w-md w-full overflow-y-auto">
      <ProductImage
        src={product.image}
        alt={product.name}
        className="w-full h-auto object-contain rounded-xl mb-4 shadow-lg"
        style={{ maxHeight: '40vh' }}
      />
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">{product.name}</h2>
      <p className="text-lg text-gray-600 mb-4 text-center">{product.description}</p>
      
      <div className="w-full bg-gray-50 p-4 rounded-xl mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Características:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {product.features.map((feature, index) => (
            <li key={index} className="text-gray-700">{feature}</li>
          ))}
        </ul>
      </div>

      <div className="w-full flex flex-col items-center space-y-4">
        <div className="w-full">
          <p className="text-xl font-semibold text-gray-800 mb-2">1. ¿Te gusta este modelo?</p>
        <div className="flex space-x-4 w-full justify-center">
          <button
              onClick={() => handleVote('model', 'like')}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-bold transition-all duration-300 ease-in-out transform ${
                votes.model === 'like'
                ? 'bg-teal-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-800 hover:bg-teal-500 hover:text-white hover:shadow-md'
              }`}
          >
            👍 Sí
          </button>
          <button
              onClick={() => handleVote('model', 'dislike')}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-bold transition-all duration-300 ease-in-out transform ${
                votes.model === 'dislike'
                ? 'bg-orange-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-800 hover:bg-orange-500 hover:text-white hover:shadow-md'
              }`}
          >
            👎 No
          </button>
          </div>
          {!votes.model && (
            <p className="text-sm text-orange-500 mt-1 text-center">* Respuesta requerida</p>
          )}
        </div>

        <div className="w-full">
          <p className="text-xl font-semibold text-gray-800 mb-2">2. ¿Te gusta el diseño?</p>
        <div className="flex space-x-4 w-full justify-center">
          <button
              onClick={() => handleVote('design', 'design_like')}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-bold transition-all duration-300 ease-in-out transform ${
                votes.design === 'design_like'
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-800 hover:bg-indigo-500 hover:text-white hover:shadow-md'
              }`}
          >
            🎨 Sí
          </button>
          <button
              onClick={() => handleVote('design', 'design_dislike')}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-bold transition-all duration-300 ease-in-out transform ${
                votes.design === 'design_dislike'
                ? 'bg-pink-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-800 hover:bg-pink-500 hover:text-white hover:shadow-md'
              }`}
          >
            🚫 No
          </button>
        </div>
          {!votes.design && (
            <p className="text-sm text-orange-500 mt-1 text-center">* Respuesta requerida</p>
          )}
        </div>
        
        <div className="w-full">
          <p className="text-xl font-semibold text-gray-800 mb-2">3. ¿Comprarías este teléfono?</p>
          <div className="flex space-x-4 w-full justify-center">
            <button
              onClick={() => handleVote('purchase', 'buy_yes')}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-bold transition-all duration-300 ease-in-out transform ${
                votes.purchase === 'buy_yes'
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white hover:shadow-md'
              }`}
            >
              💰 Sí
            </button>
            <button
              onClick={() => handleVote('purchase', 'buy_no')}
              className={`flex-1 py-3 px-4 rounded-xl text-xl font-bold transition-all duration-300 ease-in-out transform ${
                votes.purchase === 'buy_no'
                  ? 'bg-red-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white hover:shadow-md'
              }`}
            >
              ❌ No
            </button>
          </div>
          {!votes.purchase && (
            <p className="text-sm text-orange-500 mt-1 text-center">* Respuesta requerida</p>
          )}
        </div>
        
        {allAnswered && (
          <div className="w-full mt-4 text-center">
            <p className="text-green-600 font-bold text-lg">¡Gracias por tus respuestas!</p>
            <p className="text-gray-600">Pulsa "Siguiente" para continuar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;