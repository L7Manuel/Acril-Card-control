import React, { useContext } from 'react';
import { NotificationContext } from '../../contexts/NotificationContext';

const TestNotifications = () => {
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo,
    showNotification 
  } = useContext(NotificationContext);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Prueba de Notificaciones</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Notificaciones Básicas</h3>
            <div className="space-x-2">
              <button 
                onClick={() => showSuccess('¡Operación completada con éxito!')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm"
              >
                Éxito
              </button>
              
              <button 
                onClick={() => showError('¡Algo salió mal!')}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                Error
              </button>
              
              <button 
                onClick={() => showWarning('¡Cuidado! Esto puede causar problemas.')}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm"
              >
                Advertencia
              </button>
              
              <button 
                onClick={() => showInfo('Información importante para el usuario.')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Información
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Notificación Personalizada</h3>
            <div className="space-y-2">
              <div>
                <button 
                  onClick={() => 
                    showNotification({
                      message: 'Mensaje personalizado en la parte inferior',
                      type: 'info',
                      position: 'bottom-center',
                      autoCloseDuration: 5000 // 5 segundos
                    })
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm w-full"
                >
                  Notificación Inferior (5s)
                </button>
              </div>
              
              <div>
                <button 
                  onClick={() => 
                    showNotification({
                      message: 'Mensaje de éxito que no se cierra automáticamente',
                      type: 'success',
                      autoClose: false,
                      position: 'top-right'
                    })
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm w-full"
                >
                  Sin Cierre Automático
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestNotifications;
