import React, { useState, useEffect } from 'react';
import { useCustomization } from '../context/CustomizationContext';

const DishCustomizationPanel = ({ dish, isOpen, onClose }) => {
  const { getCustomization, setCustomization, removeCustomization, clearDishCustomizations } = useCustomization();
  const [ingredientStates, setIngredientStates] = useState({});
  const [expandedSubstitution, setExpandedSubstitution] = useState(null);

  useEffect(() => {
    if (isOpen && dish) {
      // Initialize ingredient states from existing customizations
      const states = {};
      dish.ingredients.forEach(ingredient => {
        const customization = getCustomization(dish.dishId, ingredient.id);
        states[ingredient.id] = {
          quantity: customization?.quantity || ingredient.quantity || 1,
          substitution: customization?.substitution || null,
          removed: customization?.removed || false
        };
      });
      setIngredientStates(states);
    }
  }, [isOpen, dish, getCustomization]);

  const updateIngredientState = (ingredientId, updates) => {
    setIngredientStates(prev => ({
      ...prev,
      [ingredientId]: {
        ...prev[ingredientId],
        ...updates
      }
    }));
  };

  const handleQuantityChange = (ingredientId, delta) => {
    const ingredient = dish.ingredients.find(ing => ing.id === ingredientId);
    if (!ingredient) return;

    const currentState = ingredientStates[ingredientId] || { 
      quantity: ingredient.quantity || 1, 
      substitution: null,
      removed: false
    };
    const baseQuantity = ingredient.quantity || 1;
    const newQuantity = Math.max(0, (currentState.quantity || baseQuantity) + delta);

    if (newQuantity === 0) {
      // Remove ingredient if quantity reaches 0
      updateIngredientState(ingredientId, { quantity: 0, removed: true });
      removeCustomization(dish.dishId, ingredientId);
    } else {
      // Restore if was removed
      const wasRemoved = currentState.removed;
      updateIngredientState(ingredientId, { quantity: newQuantity, removed: false });
      
      const substitution = currentState.substitution;
      // Calculate price: base price impact + substitution price impact
      const basePriceChange = (newQuantity - baseQuantity) * (ingredient.priceImpact || 0);
      const substitutionPriceChange = substitution ? substitution.priceChange * newQuantity : 0;
      
      setCustomization(dish.dishId, ingredientId, {
        ingredientId: ingredient.id,
        ingredientName: ingredient.name,
        quantity: newQuantity,
        substitution: substitution,
        removed: false,
        priceChange: basePriceChange + substitutionPriceChange
      });
    }
  };

  const handleRemove = (ingredientId) => {
    const ingredient = dish.ingredients.find(ing => ing.id === ingredientId);
    if (!ingredient) return;

    updateIngredientState(ingredientId, { removed: true, quantity: 0 });
    // Remove customization completely when ingredient is removed
    removeCustomization(dish.dishId, ingredientId);
  };

  const handleRestore = (ingredientId) => {
    const ingredient = dish.ingredients.find(ing => ing.id === ingredientId);
    if (!ingredient) return;

    const baseQuantity = ingredient.quantity || 1;
    updateIngredientState(ingredientId, { 
      removed: false, 
      quantity: baseQuantity,
      substitution: null
    });
    // Remove customization to restore to default
    removeCustomization(dish.dishId, ingredientId);
  };

  const handleReplace = (ingredientId, substitution) => {
    const ingredient = dish.ingredients.find(ing => ing.id === ingredientId);
    if (!ingredient) return;

    const currentState = ingredientStates[ingredientId] || { quantity: ingredient.quantity || 1 };
    const quantity = currentState.quantity || 1;
    const priceChange = substitution.priceChange * quantity;

    updateIngredientState(ingredientId, { substitution });
    setCustomization(dish.dishId, ingredientId, {
      ingredientId: ingredient.id,
      ingredientName: ingredient.name,
      quantity: quantity,
      substitution: substitution,
      removed: false,
      priceChange: priceChange
    });
  };

  const handleReset = () => {
    clearDishCustomizations(dish.dishId);
    // Reset local states
    const states = {};
    dish.ingredients.forEach(ingredient => {
      states[ingredient.id] = {
        quantity: ingredient.quantity || 1,
        substitution: null,
        removed: false
      };
    });
    setIngredientStates(states);
  };

  const calculateRunningAdjustments = () => {
    let total = 0;
    dish.ingredients.forEach(ingredient => {
      const customization = getCustomization(dish.dishId, ingredient.id);
      if (customization) {
        total += customization.priceChange || 0;
      }
    });
    return total;
  };

  const runningAdjustments = calculateRunningAdjustments();
  const finalPrice = dish.basePrice + runningAdjustments;

  if (!isOpen || !dish) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-40 flex items-end"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Bottom Sheet */}
      <div
        className="relative bg-white rounded-t-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Customize Dish
          </h2>
          <p className="text-sm text-gray-600">
            Dish: {dish.dishName} – Base price ${dish.basePrice.toFixed(2)}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Ingredient List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredient list:</h3>
            <div className="space-y-3">
              {dish.ingredients.map((ingredient) => {
                const state = ingredientStates[ingredient.id] || { 
                  quantity: ingredient.quantity || 1, 
                  substitution: null, 
                  removed: false 
                };
                const customization = getCustomization(dish.dishId, ingredient.id);
                const isRemoved = state.removed || customization?.removed;
                const currentSubstitution = state.substitution || customization?.substitution;

                return (
                  <div
                    key={ingredient.id}
                    className={`p-4 rounded-lg border-2 ${
                      isRemoved 
                        ? 'bg-gray-50 border-gray-200 opacity-50' 
                        : currentSubstitution
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {ingredient.image && (
                          <img
                            src={ingredient.image}
                            alt={ingredient.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/200/333333/ffffff?text=Image';
                            }}
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{ingredient.name}</p>
                          {currentSubstitution && (
                            <p className="text-xs text-blue-600">
                              Replaced with: {currentSubstitution.name}
                            </p>
                          )}
                          {isRemoved && (
                            <p className="text-xs text-red-600">Removed</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      {isRemoved ? (
                        /* Restore Button when removed */
                        <button
                          onClick={() => handleRestore(ingredient.id)}
                          className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          Restore
                        </button>
                      ) : (
                        <>
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Qty</span>
                            <span className="text-sm font-medium text-gray-900 w-8 text-center">{state.quantity || 1}</span>
                            <button
                              onClick={() => handleQuantityChange(ingredient.id, -1)}
                              disabled={(state.quantity || 1) <= 1}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-700 font-bold transition-colors"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleQuantityChange(ingredient.id, 1)}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove Button */}
                          {ingredient.customizable && (
                            <button
                              onClick={() => handleRemove(ingredient.id)}
                              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              (remove)
                            </button>
                          )}
                        </>
                      )}

                      {/* Replace Button */}
                      {ingredient.customizable && ingredient.substitutions && ingredient.substitutions.length > 0 && !isRemoved && (
                        <button
                          onClick={() => {
                            setExpandedSubstitution(expandedSubstitution === ingredient.id ? null : ingredient.id);
                          }}
                          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ml-auto"
                        >
                          {currentSubstitution ? 'Replace →' : '[Replace →]'}
                        </button>
                      )}
                    </div>

                    {/* Substitution Suggestions (Inline) - Expanded */}
                    {ingredient.customizable && 
                     ingredient.substitutions && 
                     ingredient.substitutions.length > 0 && 
                     !isRemoved && 
                     expandedSubstitution === ingredient.id && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Substitution suggestions (inline):</p>
                        <div className="space-y-2">
                          {/* Option to keep original */}
                          <button
                            onClick={() => {
                              handleReplace(ingredient.id, null);
                              setExpandedSubstitution(null);
                            }}
                            className={`w-full p-2 text-left rounded-lg border-2 transition-all ${
                              !currentSubstitution
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{ingredient.name}</span>
                              <span className="text-sm text-gray-500">Default</span>
                            </div>
                          </button>
                          {/* Substitution options */}
                          {ingredient.substitutions.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                handleReplace(ingredient.id, sub);
                                setExpandedSubstitution(null);
                              }}
                              className={`w-full p-2 text-left rounded-lg border-2 transition-all ${
                                currentSubstitution?.id === sub.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium text-gray-900">{sub.name}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    Replace {ingredient.name} with {sub.name}
                                  </span>
                                </div>
                                <span className={`text-sm font-semibold ${sub.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {sub.priceChange >= 0 ? '+' : ''}${sub.priceChange.toFixed(2)}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Running Adjustments */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Running adjustments:</span>
              <span className={`text-lg font-bold ${runningAdjustments >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {runningAdjustments >= 0 ? '+' : ''}${runningAdjustments.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Final Price:</span>
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
              onClick={onClose}
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

export default DishCustomizationPanel;

