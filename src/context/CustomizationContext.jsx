import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/localStorage';

const CustomizationContext = createContext();

const STORAGE_KEY = 'dishStory_customizations';

export const CustomizationProvider = ({ children }) => {
  const [customizations, setCustomizations] = useState(() => {
    // Load from localStorage on mount
    return getStorageItem(STORAGE_KEY, {});
  });

  // Save to localStorage whenever customizations change
  useEffect(() => {
    setStorageItem(STORAGE_KEY, customizations);
  }, [customizations]);

  // Get customization for a specific dish and ingredient
  const getCustomization = (dishId, ingredientId) => {
    const key = `${dishId}_${ingredientId}`;
    return customizations[key] || null;
  };

  // Check if an ingredient is customized (has a non-null substitution)
  const isIngredientCustomized = (dishId, ingredientId) => {
    const key = `${dishId}_${ingredientId}`;
    const customization = customizations[key];
    // Return true only if customization exists AND has a substitution
    return !!(customization && customization.substitution);
  };

  // Set customization for a dish ingredient
  const setCustomization = (dishId, ingredientId, customization) => {
    const key = `${dishId}_${ingredientId}`;
    setCustomizations(prev => ({
      ...prev,
      [key]: {
        ...customization,
        dishId,
        ingredientId
      }
    }));
  };

  // Remove customization
  const removeCustomization = (dishId, ingredientId) => {
    const key = `${dishId}_${ingredientId}`;
    setCustomizations(prev => {
      const newCustomizations = { ...prev };
      delete newCustomizations[key];
      return newCustomizations;
    });
  };

  // Get all customizations for a dish
  const getDishCustomizations = (dishId) => {
    return Object.values(customizations).filter(c => c.dishId === dishId);
  };

  // Clear all customizations for a specific dish
  const clearDishCustomizations = (dishId) => {
    setCustomizations(prev => {
      const newCustomizations = { ...prev };
      Object.keys(newCustomizations).forEach(key => {
        if (newCustomizations[key].dishId === dishId) {
          delete newCustomizations[key];
        }
      });
      return newCustomizations;
    });
  };

  return (
    <CustomizationContext.Provider value={{
      customizations,
      getCustomization,
      isIngredientCustomized,
      setCustomization,
      removeCustomization,
      getDishCustomizations,
      clearDishCustomizations
    }}>
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within CustomizationProvider');
  }
  return context;
};

