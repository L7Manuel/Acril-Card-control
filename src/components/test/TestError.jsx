import React from 'react';

const TestError = () => {
  // Este componente lanzará un error cuando se haga clic en el botón
  const triggerError = () => {
    throw new Error('¡Este es un error de prueba para el ErrorBoundary!');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Prueba de ErrorBoundary</h2>
      <p className="mb-4 text-gray-600">
        Haz clic en el botón para forzar un error y probar el ErrorBoundary.
      </p>
      <button 
        onClick={triggerError}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Producir error
      </button>
    </div>
  );
};

export default TestError;
