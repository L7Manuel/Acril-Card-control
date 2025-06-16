// src/CustomerLoyaltyCard.jsx
import React from 'react';

const CustomerLoyaltyCard = ({ customer }) => {
  return (
    <div className="border border-yellow-500 rounded-xl p-6 text-center">
      <h2 className="text-xl font-bold text-red-800 mb-2">{customer.name}</h2>
      <p className="text-sm text-gray-600">Cédula: {customer.cedula}</p>
      <p className="text-sm text-gray-600">Teléfono: {customer.phone}</p>
      <p className="text-sm text-yellow-600 font-semibold">Código: {customer.code}</p>
      <div className="mt-4">
        <p className="text-gray-700 font-semibold mb-2">Sellos actuales:</p>
        <div className="flex justify-center gap-1 flex-wrap">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className={`w-6 h-6 rounded-full border ${
                i < (customer.stamps % 10)
                  ? 'bg-red-800 border-red-800'
                  : 'bg-white border-gray-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerLoyaltyCard;