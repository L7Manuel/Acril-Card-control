import React from 'react';
import { Link } from 'react-router-dom';
import TestError from '../components/test/TestError';
import TestNotifications from '../components/test/TestNotifications';
import TestAsyncOperations from '../components/test/TestAsyncOperations';

const TestErrorHandling = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pruebas de Manejo de Errores</h1>
          <p className="text-gray-600">
            Página de prueba para verificar el funcionamiento del sistema de manejo de errores.
          </p>
          <div className="mt-4">
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Volver a la aplicación principal
            </Link>
          </div>
        </div>
        
        <div className="space-y-8">
          <TestError />
          <TestNotifications />
          <TestAsyncOperations />
        </div>
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Instrucciones de Prueba</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">1. Error Boundary</h3>
              <p className="text-gray-600 text-sm">
                Haz clic en el botón "Producir error" para forzar un error en el componente y ver cómo el ErrorBoundary lo maneja mostrando una interfaz de error amigable.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">2. Notificaciones</h3>
              <p className="text-gray-600 text-sm">
                Prueba los diferentes tipos de notificaciones haciendo clic en los botones. Observa cómo se muestran en diferentes posiciones y con diferentes tiempos de cierre automático.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900">3. Operaciones Asíncronas</h3>
              <p className="text-gray-600 text-sm">
                Prueba las operaciones que simulan llamadas a API. Cada operación tiene un 50% de probabilidad de éxito o fallo, lo que te permitirá ver cómo se manejan los errores en operaciones asíncronas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestErrorHandling;
