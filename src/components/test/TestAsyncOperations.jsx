import React, { useState, useCallback, useContext } from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';

const TestAsyncOperations = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { showSuccess, showError } = useContext(NotificationContext);

  // Simular una operación que podría fallar
  const simularOperacion = useCallback(async (tipo) => {
    setLoading(true);
    setResult(null);
    
    try {
      // Simulamos una operación asíncrona con un retraso
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const exito = Math.random() > 0.5; // 50% de probabilidad de éxito
          
          if (exito) {
            resolve();
          } else {
            reject(new Error(`La operación de ${tipo} ha fallado inesperadamente.`));
          }
        }, 1500); // 1.5 segundos de retraso
      });
      
      // Si llegamos aquí, la operación fue exitosa
      const mensaje = `Operación de ${tipo} completada con éxito`;
      setResult({ tipo: 'success', mensaje });
      showSuccess(mensaje);
    } catch (error) {
      // Si hay un error, lo manejamos aquí
      const mensajeError = error.message || `Error en la operación de ${tipo}`;
      setResult({ tipo: 'error', mensaje: mensajeError });
      showError(mensajeError);
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Prueba de Operaciones Asíncronas</h2>
      
      <p className="mb-4 text-gray-600">
        Prueba el manejo de errores en operaciones asíncronas. Cada operación tiene un 50% de probabilidad de éxito o fallo.
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => simularOperacion('guardado')}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {loading ? 'Procesando...' : 'Guardar Datos'}
          </button>
          
          <button
            onClick={() => simularOperacion('actualización')}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            } transition-colors`}
          >
            {loading ? 'Procesando...' : 'Actualizar Registro'}
          </button>
          
          <button
            onClick={() => simularOperacion('eliminación')}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
            } transition-colors`}
          >
            {loading ? 'Procesando...' : 'Eliminar Elemento'}
          </button>
        </div>
        
        {result && (
          <div className={`p-4 rounded-md ${
            result.tipo === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <p className="font-medium">
              {result.tipo === 'success' ? '✅ Éxito' : '❌ Error'}:
            </p>
            <p>{result.mensaje}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAsyncOperations;
