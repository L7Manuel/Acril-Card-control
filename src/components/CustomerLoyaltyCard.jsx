// src/CustomerLoyaltyCard.jsx
import React from 'react';

const CustomerLoyaltyCard = ({ customer }) => {
  return (
    <div className="border-4 border-yellow-500 rounded-2xl p-8 text-center bg-white shadow-xl max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-red-800 mb-2">ACRILCARD</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4"></div>
      </div>
      
      <div className="py-4">
        <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-center gap-2 flex-wrap">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className={`w-8 h-8 rounded-full border-2 ${
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