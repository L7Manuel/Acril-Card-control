import { useState, useCallback } from 'react';

const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    console.error('Error:', error);
    
    // Mensaje de error amigable
    let errorMessage = 'Ocurrió un error inesperado';
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    setError(errorMessage);
    return errorMessage;
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, resetError };
};

export default useErrorHandler;
