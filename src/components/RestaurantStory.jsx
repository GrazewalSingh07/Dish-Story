import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
 
import { useProgress } from '../hooks/useProgress';
import { useMediaNavigation } from '../hooks/useMediaNavigation';
import { useIngredientCard } from '../hooks/useIngredientCard';
import Header from './Header';
import ProgressBars from './ProgressBars';
import Hotspots from './Hotspots';
import IngredientCard from './IngredientCard';
import ActionButtons from './ActionButtons';

const RestaurantStory = ({ restaurant }) => {
  const { addToCart } = useCart();
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const videoRef = useRef(null);
  const savedProgressRef = useRef(0);

  if (!restaurant || !restaurant.stories || restaurant.stories.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <p>No stories available</p>
      </div>
    );
  }

  // Safety check - ensure we have valid dish index
  const validDishIndex = Math.max(0, Math.min(currentDishIndex, restaurant.stories.length - 1));
  const currentDish = restaurant.stories?.[validDishIndex];
  // Each dish has exactly one media item
  const currentMedia = currentDish?.media?.[0];
  
  // Safety check - if no dish or media, show error
  if (!currentDish || !currentMedia) {
    // Reset to first dish if current index is invalid
    if (currentDishIndex !== 0) {
      setCurrentDishIndex(0);
    }
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Navigation handler
  const handleNavigate = (direction) => {
    if (direction === 'prev' && currentDishIndex > 0) {
      setCurrentDishIndex(prev => prev - 1);
    } else if (direction === 'next' && currentDishIndex < restaurant.stories.length - 1) {
      setCurrentDishIndex(prev => prev + 1);
    }
  };

  // Media navigation hook
  const {
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMediaClick
  } = useMediaNavigation(handleNavigate);

  // Progress management - need to create this first
  const pauseProgressRef = useRef(null);
  
  // Ingredient card hook (needs pauseProgress function)
  const {
    selectedIngredient,
    isCardOpen,
    isProgressPaused,
    handleHotspotClick: handleHotspotClickHook,
    handleCloseCard
  } = useIngredientCard(currentMedia, videoRef, (progress) => {
    if (pauseProgressRef.current) {
      pauseProgressRef.current(progress);
    }
  });

  // Progress hook (now can use isProgressPaused from ingredient card hook)
  const { progress, pauseProgress: pauseProgressHook } = useProgress(
    currentMedia,
    currentDishIndex,
    restaurant.stories.length,
    isProgressPaused,
    videoRef,
    savedProgressRef
  );

  // Store pauseProgress function in ref so ingredient card can use it
  pauseProgressRef.current = pauseProgressHook;

  // Auto-advance when progress completes
  useEffect(() => {
    if (progress >= 100 && !isProgressPaused) {
      if (currentDishIndex < restaurant.stories.length - 1) {
        setCurrentDishIndex(prev => prev + 1);
      }
    }
  }, [progress, currentDishIndex, restaurant.stories.length, isProgressPaused]);

  // Handler for Customize button
  const handleCustomize = () => {
    // TODO: Open customization panel
    console.log('Customize dish:', currentDish.dishName);
    // This will be implemented later with the customization bottom sheet
  };

  // Handler for Add to Cart button
  const handleAddToCart = () => {
    if (currentDish) {
      addToCart({
        dishId: currentDish.dishId,
        dishName: currentDish.dishName,
        basePrice: currentDish.basePrice,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name
      });
    }
  };

  // Handler for hotspot click
  const handleHotspotClick = (ingredientId) => {
    const ingredient = currentDish.ingredients.find(ing => ing.id === ingredientId);
    if (ingredient) {
      handleHotspotClickHook(ingredient, progress);
    }
  };

  // Handle "Add Extra" button in ingredient card
  const handleAddExtra = () => {
    // TODO: Implement add extra ingredient functionality
    console.log('Add extra:', selectedIngredient?.name);
    handleCloseCard();
  };

  return (
    <div className="relative w-full h-full">
      {/* Header */}
      <Header restaurantName={restaurant.name} />

      {/* Progress bars for DISHES at the top */}
      <ProgressBars 
        dishes={restaurant.stories} 
        currentDishIndex={currentDishIndex} 
        progress={progress} 
      />

      {/* Media Display */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center bg-black relative cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // Only handle click if no drag occurred
          handleMediaClick(e);
        }}
      >
        {currentMedia ? (
          <div className={`relative w-full h-full transition-opacity duration-300 ${isCardOpen ? 'opacity-50' : 'opacity-100'}`}>
            {currentMedia.type === 'image' ? (
              <img
                src={currentMedia.url}
                alt={currentDish.dishName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x1200/333333/ffffff?text=Image+Not+Found';
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={currentMedia.url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop={false}
                onError={(e) => {
                  console.error('Video error:', e);
                }}
              />
            )}
            
            {/* Hotspots */}
            <Hotspots 
              hotspots={currentMedia.hotspots} 
              onHotspotClick={handleHotspotClick} 
            />
            
            {/* Dish Info Overlay */}
            <div className="absolute bottom-32 left-0 right-0 px-4 text-white">
              <h3 className="text-2xl font-bold mb-1">{currentDish.dishName}</h3>
              <p className="text-lg">${currentDish.basePrice.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-white">
            <p>No media available</p>
          </div>
        )}
      </div>

      {/* Ingredient Card Overlay */}
      <IngredientCard
        ingredient={selectedIngredient}
        isOpen={isCardOpen}
        onClose={handleCloseCard}
        onCustomize={handleCustomize}
        onAddExtra={handleAddExtra}
      />

      {/* Action Buttons */}
      <ActionButtons 
        onCustomize={handleCustomize}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default RestaurantStory;
