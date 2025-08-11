import React, { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Notification from '../components/common/Notification';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const showNotification = useCallback(({ message, type = 'info', autoClose = true, autoCloseDuration = 5000, position = 'top-right' }) => {
    // Limpiar el timeout anterior si existe
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Establecer la nueva notificación
    setNotification({ message, type, autoClose, autoCloseDuration, position });

    // Configurar el auto-cierre si está habilitado
    if (autoClose) {
      const id = setTimeout(() => {
        setNotification(null);
      }, autoCloseDuration);
      setTimeoutId(id);
    }
  }, [timeoutId]);

  const hideNotification = useCallback(() => {
    setNotification(null);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  // Métodos de conveniencia para diferentes tipos de notificaciones
  const showSuccess = useCallback((message, options = {}) => {
    showNotification({ ...options, message, type: 'success' });
  }, [showNotification]);

  const showError = useCallback((message, options = {}) => {
    showNotification({ ...options, message, type: 'error' });
  }, [showNotification]);

  const showWarning = useCallback((message, options = {}) => {
    showNotification({ ...options, message, type: 'warning' });
  }, [showNotification]);

  const showInfo = useCallback((message, options = {}) => {
    showNotification({ ...options, message, type: 'info' });
  }, [showNotification]);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
          autoClose={notification.autoClose}
          autoCloseDuration={notification.autoCloseDuration}
          position={notification.position}
        />
      )}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext;
