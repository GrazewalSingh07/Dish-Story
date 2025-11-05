import React from 'react';

const ActionButtons = ({ onCustomize, onAddToCart }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
      <div className="flex gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCustomize();
          }}
          className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-lg backdrop-blur-sm transition-all"
        >
          Customize
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="flex-1 bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;

