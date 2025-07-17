// Función para obtener el índice del siguiente producto
export const getNextIndex = (currentIndex, totalProducts) => {
  return (currentIndex + 1) % totalProducts;
};

// Función para obtener el índice del producto anterior
export const getPreviousIndex = (currentIndex, totalProducts) => {
  return (currentIndex - 1 + totalProducts) % totalProducts;
};

// Detectar si es dispositivo móvil
export const isMobileDevice = () => {
  return window.innerWidth <= 768;
};

// Obtener tipo de dispositivo
export const getDeviceType = () => {
  const width = window.innerWidth;
  if (width <= 768) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

// Obtener encuestas
export const getEncuestas = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/encuestas');
    if (!response.ok) {
      throw new Error('Error al obtener las encuestas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Obtener estadísticas
export const getEstadisticas = async () => {
  try {
    const encuestas = await getEncuestas();
    
    if (!encuestas || encuestas.length === 0) {
    return {
      totalEncuestas: 0,
      totalVotos: 0,
      productosMasGustados: [],
      intencionCompra: {},
      encuestadores: []
    };
  }
  
  const stats = {
    totalEncuestas: encuestas.length,
    totalVotos: 0,
      productosMasGustados: [],
      intencionCompra: {},
      encuestadores: []
    };
    
    // Objeto temporal para acumular datos de encuestadores
    const encuestadoresTemp = {};
  
  // Procesar cada encuesta
  encuestas.forEach(encuesta => {
      // Procesar votos (asumiendo que es un objeto, no un Map)
      Object.entries(encuesta.votos || {}).forEach(([productId, votos]) => {
        // Sumar todos los votos válidos
        const votosValidos = {
          like: votos.like || 0,
          dislike: votos.dislike || 0,
          design_like: votos.design_like || 0,
          design_dislike: votos.design_dislike || 0,
          buy_yes: votos.buy_yes || 0,
          buy_no: votos.buy_no || 0
        };
        
        stats.totalVotos += Object.values(votosValidos).reduce((a, b) => a + b, 0);
        
        // Contabilizar likes
        if (votosValidos.like > 0) {
          const productoIndex = stats.productosMasGustados.findIndex(p => p.id === productId);
          if (productoIndex >= 0) {
            stats.productosMasGustados[productoIndex].count += votosValidos.like;
          } else {
            stats.productosMasGustados.push({ id: productId, count: votosValidos.like });
          }
        }
        
        // Contabilizar intención de compra
        if (!stats.intencionCompra[productId]) {
          stats.intencionCompra[productId] = { si: 0, no: 0, porcentajeSi: 0 };
        }
        stats.intencionCompra[productId].si += votosValidos.buy_yes;
        stats.intencionCompra[productId].no += votosValidos.buy_no;
      });
      
      // Contabilizar encuestadores
      if (encuesta.encuestador?.nombre) {
        const encuestadorId = encuesta.encuestador.id || encuesta.encuestador.nombre;
        if (!encuestadoresTemp[encuestadorId]) {
          encuestadoresTemp[encuestadorId] = {
            nombre: encuesta.encuestador.nombre,
          encuestas: 0
        };
      }
        encuestadoresTemp[encuestadorId].encuestas++;
      }
    });
    
    // Calcular porcentajes de intención de compra
    Object.values(stats.intencionCompra).forEach(intencion => {
      const total = intencion.si + intencion.no;
      intencion.porcentajeSi = total > 0 ? Math.round((intencion.si / total) * 100) : 0;
    });
    
    // Convertir encuestadores de objeto a array
    stats.encuestadores = Object.values(encuestadoresTemp);
    
    // Ordenar productos más gustados
    stats.productosMasGustados.sort((a, b) => b.count - a.count);
    
    return stats;
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return null;
  }
};

// Exportar encuestas a CSV
export const exportarEncuestasCSV = async () => {
  try {
  const encuestas = await getEncuestas();
    if (!encuestas || encuestas.length === 0) return null;
  
  const headers = [
    'Fecha',
      'Usuario',
    'Teléfono',
    'Encuestador',
      'Productos',
      'Likes',
      'Dislikes',
      'Design Likes',
      'Design Dislikes',
      'Compraría',
      'No Compraría'
    ];

    const rows = encuestas.map(encuesta => {
      const votosMap = encuesta.votos instanceof Map ? encuesta.votos : new Map(Object.entries(encuesta.votos));
      const productos = encuesta.productos.map(p => p.nombre).join(', ');
      
      let likes = 0, dislikes = 0, designLikes = 0, designDislikes = 0, buyYes = 0, buyNo = 0;
      
      votosMap.forEach(votos => {
        likes += votos.like || 0;
        dislikes += votos.dislike || 0;
        designLikes += votos.design_like || 0;
        designDislikes += votos.design_dislike || 0;
        buyYes += votos.buy_yes || 0;
        buyNo += votos.buy_no || 0;
      });

      return [
        new Date(encuesta.fecha).toLocaleString(),
        encuesta.usuario.nombre,
        encuesta.usuario.telefono,
        encuesta.encuestador?.nombre || '',
        productos,
        likes,
        dislikes,
        designLikes,
        designDislikes,
        buyYes,
        buyNo
      ];
    });

    // Convertir a CSV
  const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
    return '\ufeff' + csvContent; // Agregar BOM para UTF-8
  } catch (error) {
    console.error('Error al exportar CSV:', error);
    return null;
  }
};

// Limpiar todas las encuestas
export const limpiarEncuestas = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/encuestas/limpiar', {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};