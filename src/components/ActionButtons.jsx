import React from 'react';

const ActionButtons = ({ 
  onCustomize, 
  onAddToCart, 
  disabled = false, 
  customizationCount = 0,
  finalPrice = 0 
}) => {
  const hasModifications = customizationCount > 0;
  
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
          <div className="flex flex-col items-center gap-0.5">
            <span className="leading-tight">Add to Cart</span>
            {hasModifications && (
              <span className="text-xs font-medium text-gray-600 leading-tight">
                {customizationCount} {customizationCount === 1 ? 'modification' : 'modifications'} • ${finalPrice.toFixed(2)}
              </span>
            )}
            {!hasModifications && (
              <span className="text-xs font-medium text-gray-600 leading-tight">
                ${finalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;

