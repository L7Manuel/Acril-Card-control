import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const iconVariants = {
  success: {
    icon: <CheckCircle2 className="h-5 w-5" />,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  error: {
    icon: <AlertCircle className="h-5 w-5" />,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  warning: {
    icon: <AlertTriangle className="h-5 w-5" />,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  info: {
    icon: <Info className="h-5 w-5" />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
};

const Notification = ({ 
  message, 
  type = 'info', 
  onClose, 
  autoClose = true, 
  autoCloseDuration = 5000,
  position = 'top-right'
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, onClose]);

  if (!message) return null;

  const { icon, color, bgColor, borderColor } = iconVariants[type] || iconVariants.info;
  
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div 
      className={`fixed z-50 p-4 rounded-lg border ${bgColor} ${borderColor} shadow-lg max-w-sm w-full ${positionClasses[position]}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${color}`}>
          {icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-4 -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <span className="sr-only">Cerrar</span>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  autoCloseDuration: PropTypes.number,
  position: PropTypes.oneOf([
    'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
  ]),
};

export default Notification;
