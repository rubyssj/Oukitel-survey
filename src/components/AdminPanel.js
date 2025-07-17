import React, { useState, useEffect } from 'react';
import { getEncuestas, getEstadisticas, exportarEncuestasCSV, limpiarEncuestas } from '../utils/helpers';
import { defaultProducts } from '../mock/products';

const AdminPanel = () => {
  const [stats, setStats] = useState({
    totalEncuestas: 0,
    totalVotos: 0,
    productosMasGustados: [],
    intencionCompra: {},
    encuestadores: []
  });
  const [encuestas, setEncuestas] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState('estadisticas');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Cargar datos al montar el componente
  useEffect(() => {
    loadData();
  }, []);
  
  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const estadisticas = await getEstadisticas();
      const encuestasData = await getEncuestas();
      
      setStats(estadisticas || {
        totalEncuestas: 0,
        totalVotos: 0,
        productosMasGustados: [],
        intencionCompra: {},
        encuestadores: []
      });
      setEncuestas(encuestasData || []);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExportCSV = async () => {
    setIsLoading(true);
    
    try {
      const csvContent = await exportarEncuestasCSV();
      
      if (!csvContent) {
        alert('No hay datos para exportar');
        setIsLoading(false);
        return;
      }
      
      // Crear un blob con los datos CSV - especificando que es UTF-8 con BOM
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      // Crear un enlace para descargar el archivo
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `encuestas_oukitel_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.display = 'none';
      
      // Añadir el enlace al documento, hacer clic y luego eliminarlo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error al exportar CSV:', err);
      alert('Error al exportar los datos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClearData = () => {
    setShowConfirmDialog(true);
  };
  
  const confirmClearData = async () => {
    setIsLoading(true);
    
    try {
      const cleared = await limpiarEncuestas();
      
      if (cleared) {
        alert('Datos eliminados correctamente');
        await loadData(); // Recargar datos (ahora vacíos)
      } else {
        alert('Error al eliminar los datos');
      }
    } catch (err) {
      console.error('Error al limpiar datos:', err);
      alert('Error al eliminar los datos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
    }
  };
  
  const cancelClearData = () => {
    setShowConfirmDialog(false);
  };
  
  // Obtener nombre del producto por ID
  const getProductName = (productId) => {
    const product = defaultProducts.find(p => p.id.toString() === productId.toString());
    return product ? product.name : `Producto ${productId}`;
  };
  
  // Renderizar mensaje de carga o error
  const renderLoadingOrError = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-orange-600">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
            <p>Cargando datos...</p>
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="text-center text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>{error}</p>
            <button 
              onClick={loadData} 
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto my-8">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-center">
            Panel de Administración
          </h1>
          <p className="text-center text-orange-100">Encuestas Oukitel</p>
        </div>
      </div>
      
      {/* Pestañas */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ${
            selectedTab === 'estadisticas' 
              ? 'text-white bg-orange-500 border-b-2 border-orange-600' 
              : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
          }`}
          onClick={() => setSelectedTab('estadisticas')}
          disabled={isLoading}
        >
          📊 Estadísticas
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ${
            selectedTab === 'encuestas' 
              ? 'text-white bg-orange-500 border-b-2 border-orange-600' 
              : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
          }`}
          onClick={() => setSelectedTab('encuestas')}
          disabled={isLoading}
        >
          📝 Encuestas Individuales
        </button>
        <button 
          className={`px-6 py-3 font-medium text-sm rounded-t-lg transition-all duration-200 ${
            selectedTab === 'encuestadores' 
              ? 'text-white bg-orange-500 border-b-2 border-orange-600' 
              : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
          }`}
          onClick={() => setSelectedTab('encuestadores')}
          disabled={isLoading}
        >
          👤 Encuestadores
        </button>
      </div>
      
      {/* Mensaje de carga o error */}
      {renderLoadingOrError()}
      
      {/* Contenido según pestaña seleccionada */}
      {!isLoading && !error && selectedTab === 'estadisticas' && (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resumen */}
              <div className="bg-orange-50 p-5 rounded-xl shadow-sm border border-orange-100">
                <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-lg mr-2">📈</span> Resumen
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                    <p className="text-sm text-gray-600">Total de encuestas</p>
                  <p className="text-3xl font-bold text-orange-600">{stats?.totalEncuestas || 0}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                    <p className="text-sm text-gray-600">Total de votos</p>
                  <p className="text-3xl font-bold text-orange-600">{stats?.totalVotos || 0}</p>
                </div>
                </div>
              </div>
              
              {/* Productos más gustados */}
              <div className="bg-orange-50 p-5 rounded-xl shadow-sm border border-orange-100">
                <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-lg mr-2">👍</span> Productos más gustados
                </h2>
              {(stats?.productosMasGustados?.length || 0) > 0 ? (
                  <ul className="space-y-2">
                    {stats.productosMasGustados.map(item => (
                      <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-orange-100">
                        <span className="font-medium text-gray-800">{getProductName(item.id)}</span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                          {item.count} votos
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic bg-white p-4 rounded-lg text-center">No hay datos disponibles</p>
                )}
              </div>
              
              {/* Intención de compra */}
              <div className="bg-orange-50 p-5 rounded-xl shadow-sm border border-orange-100 md:col-span-2">
                <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                  <span className="bg-orange-100 p-2 rounded-lg mr-2">🛒</span> Intención de compra por producto
                </h2>
              {Object.keys(stats?.intencionCompra || {}).length > 0 ? (
                  <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-orange-100">
                          <th className="py-3 px-4 text-left text-orange-800">Producto</th>
                          <th className="py-3 px-4 text-center text-orange-800">Sí compraría</th>
                          <th className="py-3 px-4 text-center text-orange-800">No compraría</th>
                          <th className="py-3 px-4 text-center text-orange-800">% Intención positiva</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(stats.intencionCompra).map(([productId, data]) => (
                          <tr key={productId} className="border-t border-orange-100">
                            <td className="py-3 px-4 font-medium">{getProductName(productId)}</td>
                            <td className="py-3 px-4 text-center text-green-600 font-medium">{data.si}</td>
                            <td className="py-3 px-4 text-center text-red-500 font-medium">{data.no}</td>
                            <td className="py-3 px-4 text-center">
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-orange-500 h-3 rounded-full" 
                                  style={{ width: `${data.porcentajeSi}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-gray-700 mt-1 block">
                                {data.porcentajeSi}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 italic bg-white p-4 rounded-lg text-center">No hay datos disponibles</p>
                )}
              </div>
            </div>
        </>
      )}
      
      {!isLoading && !error && selectedTab === 'encuestas' && (
        <>
          {/* Lista de encuestas individuales */}
          <div className="bg-orange-50 p-5 rounded-xl shadow-sm border border-orange-100">
            <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
              <span className="bg-orange-100 p-2 rounded-lg mr-2">📋</span> Listado de encuestas
            </h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
              {encuestas.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="py-3 px-4 text-left text-orange-800">#</th>
                      <th className="py-3 px-4 text-left text-orange-800">Fecha</th>
                      <th className="py-3 px-4 text-left text-orange-800">Nombre</th>
                      <th className="py-3 px-4 text-left text-orange-800">Teléfono</th>
                      <th className="py-3 px-4 text-left text-orange-800">Encuestador</th>
                      <th className="py-3 px-4 text-left text-orange-800">Productos evaluados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {encuestas.map((encuesta, index) => (
                      <tr key={encuesta._id || index} className="border-t border-orange-100 hover:bg-orange-50 transition-colors">
                        <td className="py-3 px-4 font-medium">{index + 1}</td>
                        <td className="py-3 px-4">{new Date(encuesta.fecha).toLocaleString()}</td>
                        <td className="py-3 px-4">{encuesta.usuario?.nombre || '—'}</td>
                        <td className="py-3 px-4">{encuesta.usuario?.telefono || '—'}</td>
                        <td className="py-3 px-4">
                          {encuesta.encuestador?.nombre || '—'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            {encuesta.votos ? Object.keys(encuesta.votos).length : 0} productos
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500 py-8">No hay encuestas registradas</p>
              )}
            </div>
          </div>
        </>
      )}

      {!isLoading && !error && selectedTab === 'encuestadores' && (
        <>
          {/* Lista de encuestadores */}
          <div className="bg-orange-50 p-5 rounded-xl shadow-sm border border-orange-100">
            <h2 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
              <span className="bg-orange-100 p-2 rounded-lg mr-2">👥</span> Rendimiento de Encuestadores
            </h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
              {stats && stats.encuestadores && stats.encuestadores.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="py-3 px-4 text-left text-orange-800">Nombre</th>
                      <th className="py-3 px-4 text-center text-orange-800">Encuestas Realizadas</th>
                      <th className="py-3 px-4 text-center text-orange-800">% del Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.encuestadores.map((encuestador, index) => (
                      <tr key={index} className="border-t border-orange-100 hover:bg-orange-50 transition-colors">
                        <td className="py-3 px-4 font-medium">{encuestador.nombre || '—'}</td>
                        <td className="py-3 px-4 text-center">{encuestador.encuestas}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-orange-500 h-3 rounded-full" 
                              style={{ width: `${Math.round((encuestador.encuestas / (stats.totalEncuestas || 1)) * 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700 mt-1 block">
                            {Math.round((encuestador.encuestas / (stats.totalEncuestas || 1)) * 100)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500 py-8">No hay datos de encuestadores registrados</p>
              )}
            </div>
          </div>
        </>
      )}
      
      {/* Botones de acción */}
      <div className="flex justify-end mt-8 space-x-4">
        <button
          onClick={handleExportCSV}
          className={`px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <span className="mr-2">📊</span> Exportar a CSV
        </button>
        
        <button
          onClick={handleClearData}
          className={`px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center shadow-md ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          <span className="mr-2">🗑️</span> Eliminar datos
        </button>
      </div>
      
      {/* Diálogo de confirmación */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
            <div className="text-center text-red-500 mb-4">
              <span className="text-5xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">¿Estás seguro?</h3>
            <p className="text-gray-700 mb-6 text-center">
              Esta acción eliminará permanentemente todos los datos de encuestas. Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={cancelClearData}
                className={`px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center shadow-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                <span className="mr-2">✖️</span> Cancelar
              </button>
              <button
                onClick={confirmClearData}
                className={`px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center shadow-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2 inline-block animate-spin">⏳</span> Eliminando...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🗑️</span> Sí, eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel; 