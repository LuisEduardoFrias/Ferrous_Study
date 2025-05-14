// src/components/NotFoundPage.tsx
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Oops! Página no encontrada</h1>
      <p className="text-lg text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
      <button
        onClick={() => window.history.back()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Volver atrás
      </button>
    </div>
  );
};

export default NotFoundPage;
