import React, { useState } from 'react';
import { useCustomization } from '../context/CustomizationContext';

const CustomizationPanel = ({ 
  dish, 
  ingredient, 
  isOpen, 
  onClose 
}) => {
  const { getCustomization, setCustomization, removeCustomization } = useCustomization();
  const [selectedSubstitution, setSelectedSubstitution] = useState(null);
  
  if (!isOpen || !dish || !ingredient) {
    return null;
  }

  const currentCustomization = getCustomization(dish.dishId, ingredient.id);
  const initialSubstitution = currentCustomization?.substitution || null;

  const handleSubstitutionSelect = (substitution) => {
    setSelectedSubstitution(substitution);
  };

  const handleUpdate = () => {
    if (selectedSubstitution) {
      setCustomization(dish.dishId, ingredient.id, {
        ingredientId: ingredient.id,
        ingredientName: ingredient.name,
        substitution: selectedSubstitution,
        priceChange: selectedSubstitution.priceChange
      });
    }
    onClose();
  };

  const handleReset = () => {
    setSelectedSubstitution(null);
    // Remove customization completely instead of setting to null
    removeCustomization(dish.dishId, ingredient.id);
  };

  const selectedSub = selectedSubstitution || initialSubstitution;
  const priceAdjustment = selectedSub ? selectedSub.priceChange : 0;
  const finalPrice = dish.basePrice + priceAdjustment;

  return (
    <div 
      className="fixed inset-0 z-40 flex items-end"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Bottom Sheet */}
      <div
        className="relative bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Customize {ingredient.name}
          </h2>
          <p className="text-sm text-gray-600">
            Dish: {dish.dishName} — Base price ${dish.basePrice.toFixed(2)}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Ingredient */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Ingredient</h3>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {ingredient.image && (
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{ingredient.name}</p>
                <p className="text-sm text-gray-500">Default selection</p>
              </div>
            </div>
          </div>

          {/* Substitution Options */}
          {ingredient.substitutions && ingredient.substitutions.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Substitution Options</h3>
              <div className="space-y-2">
                {ingredient.substitutions.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubstitutionSelect(sub)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedSub?.id === sub.id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-semibold ${selectedSub?.id === sub.id ? 'text-white' : 'text-gray-900'}`}>
                          {sub.name}
                        </p>
                        <p className={`text-sm ${selectedSub?.id === sub.id ? 'text-white/80' : 'text-gray-500'}`}>
                          Replace {ingredient.name} with {sub.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${selectedSub?.id === sub.id ? 'text-white' : 'text-gray-900'}`}>
                          {sub.priceChange >= 0 ? '+' : ''}${sub.priceChange.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">No substitution options available for this ingredient.</p>
            </div>
          )}

          {/* Price Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Base Price</span>
              <span className="font-semibold text-gray-900">${dish.basePrice.toFixed(2)}</span>
            </div>
            {priceAdjustment !== 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Adjustment</span>
                <span className={`font-semibold ${priceAdjustment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {priceAdjustment >= 0 ? '+' : ''}${priceAdjustment.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Final Price</span>
              <span className="text-xl font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              Update & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;

