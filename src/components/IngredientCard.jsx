import React, { useRef } from 'react';

const IngredientCard = ({ 
  ingredient, 
  isOpen, 
  onClose, 
  onCustomize, 
  onAddExtra 
}) => {
  const cardRef = useRef(null);
  const swipeStartY = useRef(null);

  if (!isOpen || !ingredient) {
    return null;
  }

  const handleCardTouchStart = (e) => {
    swipeStartY.current = e.touches[0].clientY;
  };

  const handleCardTouchMove = (e) => {
    if (swipeStartY.current && e.touches[0].clientY - swipeStartY.current > 50) {
      onClose();
      swipeStartY.current = null;
    }
  };

  const handleCardTouchEnd = () => {
    swipeStartY.current = null;
  };

  return (
    <div 
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Dimmed backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Ingredient Card */}
      <div
        ref={cardRef}
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto transform transition-all"
        onTouchStart={handleCardTouchStart}
        onTouchMove={handleCardTouchMove}
        onTouchEnd={handleCardTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center bg-none justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-all shadow-sm"
          aria-label="Close"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Card Content */}
        <div className="p-6 pt-12">
          {/* Header with image */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{ingredient.name}</h3>
            </div>
            {ingredient.image && (
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-24 h-24 rounded-xl object-cover shadow-md"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200/333333/ffffff?text=Image';
                }}
              />
            )}
          </div>

          {/* Nutritional Information */}
          {ingredient.nutrition && (
            <div className="grid grid-cols-4 gap-3 mb-5 pb-5 border-b border-gray-200">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Calories</div>
                <div className="text-xl font-bold text-gray-900">{ingredient.nutrition.calories}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Protein</div>
                <div className="text-xl font-bold text-gray-900">{ingredient.nutrition.protein_g}g</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Carbs</div>
                <div className="text-xl font-bold text-gray-900">{ingredient.nutrition.carbs_g}g</div>
              </div>
              {ingredient.nutrition.fat_g !== undefined && (
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Fat</div>
                  <div className="text-xl font-bold text-gray-900">{ingredient.nutrition.fat_g}g</div>
                </div>
              )}
            </div>
          )}

          {/* Allergen Warnings */}
          {ingredient.allergens && ingredient.allergens.length > 0 && (
            <div className="flex items-center gap-2 mb-5 pb-5 border-b border-gray-200 bg-yellow-50 rounded-lg p-3">
              <span className="text-sm font-medium text-gray-700">Allergen:</span>
              <span className="text-sm font-semibold text-gray-900">
                {ingredient.allergens.join(', ')}
              </span>
              <span className="text-yellow-500 text-xl ml-auto">⚠️</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onCustomize}
              className="flex-1 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Customize
            </button>
            <button
              onClick={onAddExtra}
              className="flex-1 bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Add Extra +$1.50
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;

