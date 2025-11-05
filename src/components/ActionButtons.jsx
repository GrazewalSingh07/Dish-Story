import React from 'react';

const ActionButtons = ({ onCustomize, onAddToCart, disabled = false }) => {
  return (
    <div className="relative mt-4">
      <div className="flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onCustomize();
          }}
          disabled={disabled}
          className={`flex-1 font-semibold py-3 px-4 rounded-lg backdrop-blur-sm transition-all ${
            disabled 
              ? 'bg-white/10 text-white/50 cursor-not-allowed' 
              : 'bg-white/20 hover:bg-white/30 text-white cursor-pointer'
          }`}
        >
          Customize
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) onAddToCart();
          }}
          disabled={disabled}
          className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all shadow-lg ${
            disabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-gray-100 cursor-pointer'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;

