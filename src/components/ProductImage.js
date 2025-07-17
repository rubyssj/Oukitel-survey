import React, { useState } from 'react';

const ProductImage = ({ src, alt, className, style }) => {
  const [imageError, setImageError] = useState(false);
  
  // Determinar si es una URL absoluta o relativa
  const isAbsoluteUrl = src && (src.startsWith('http://') || src.startsWith('https://'));
  
  // Determinar si ya incluye la carpeta /images/
  const includesImagesPath = src && src.startsWith('/images/');
  
  // Construir la ruta completa para imágenes relativas
  let imageSrc = src;
  if (!isAbsoluteUrl && !includesImagesPath && src) {
    imageSrc = `/images/${src}`;
  }
  
  // Imagen de respaldo con el nombre del producto
  const fallbackImageUrl = `https://via.placeholder.com/400x600/F0F0F0/333333?text=${encodeURIComponent(alt || 'Producto')}`;
  
  const handleImageError = () => {
    console.log(`Error cargando imagen: ${imageSrc}`);
    setImageError(true);
  };
  
  return (
    <img
      src={imageError ? fallbackImageUrl : (imageSrc || fallbackImageUrl)}
      alt={alt || 'Imagen de producto'}
      className={className}
      style={{
        objectFit: 'contain',
        ...style
      }}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

export default ProductImage; 