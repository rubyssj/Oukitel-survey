import React from 'react';
import AdminPanel from './components/AdminPanel';

function AdminApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 py-8 px-4">
      <AdminPanel />
      
      <footer className="text-center text-white text-sm mt-12 bg-black bg-opacity-10 py-4 rounded-lg max-w-6xl mx-auto">
        <p className="font-medium">© {new Date().getFullYear()} Oukitel - Panel de Administración de Encuestas</p>
        <p className="text-xs mt-1">Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default AdminApp; 