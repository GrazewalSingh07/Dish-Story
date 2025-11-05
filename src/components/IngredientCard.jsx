import React, { useRef, useState } from 'react';
import CustomizationPanel from './CustomizationPanel';
import { useCustomization } from '../context/CustomizationContext';

const IngredientCard = ({ 
  ingredient, 
  dish,
  isOpen, 
  onClose, 
  onCustomize, 
  onAddExtra 
}) => {
  const { getCustomization } = useCustomization();
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const cardRef = useRef(null);
  const swipeStartY = useRef(null);
  
  // Early return if ingredient is not available (after all hooks are called)
  if (!isOpen || !ingredient) {
    return null;
  }
  
  const currentCustomization = dish && ingredient ? getCustomization(dish.dishId, ingredient.id) : null;
  const hasSubstitution = currentCustomization?.substitution;
  const hasCustomization = !!currentCustomization;
  const baseQuantity = ingredient?.quantity || 1;
  const currentQuantity = currentCustomization?.quantity || baseQuantity;
  const quantityChanged = currentQuantity !== baseQuantity;

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

          {/* Customization Indicator */}
          {hasCustomization && (
            <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <h4 className="text-sm font-bold text-gray-900">Modifications Made</h4>
              </div>
              
              <div className="space-y-2">
                {/* Quantity Change */}
                {quantityChanged && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">
                      Quantity: <span className="font-semibold">{baseQuantity}</span> → <span className="font-semibold text-yellow-700">{currentQuantity}</span>
                    </span>
                  </div>
                )}
                
                {/* Substitution */}
                {hasSubstitution && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">
                      Substituted: <span className="font-semibold">{ingredient.name}</span> → <span className="font-semibold text-yellow-700">{hasSubstitution.name}</span>
                    </span>
                  </div>
                )}
                
                {/* Price Adjustment */}
                {currentCustomization?.priceChange !== undefined && currentCustomization.priceChange !== 0 && (
                  <div className="flex items-center justify-between pt-2 border-t border-yellow-200">
                    <span className="text-sm font-medium text-gray-900">Total Price Impact:</span>
                    <span className={`text-sm font-bold ${currentCustomization.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {currentCustomization.priceChange >= 0 ? '+' : ''}${currentCustomization.priceChange.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                setShowCustomizationPanel(true);
                onCustomize();
              }}
              className={`flex-1 font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg ${
                hasCustomization 
                  ? 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white' 
                  : 'bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white'
              }`}
            >
              {hasCustomization ? 'Change Customization' : 'Customize'}
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

      {/* Customization Panel */}
      {showCustomizationPanel && dish && ingredient && (
        <CustomizationPanel
          dish={dish}
          ingredient={ingredient}
          isOpen={showCustomizationPanel}
          onClose={() => {
            setShowCustomizationPanel(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default IngredientCard;

