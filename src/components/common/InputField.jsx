import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  error, 
  ...props 
}) => (
  <div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
        error ? 'border-red-500 bg-red-50' : 'border-gray-300'
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default InputField;
