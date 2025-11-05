import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useCustomization } from '../context/CustomizationContext';
import { useToast } from '../context/ToastContext';
import {useNetworkStatus} from '../hooks/useNetworkStatus';
import { useProgress } from '../hooks/useProgress';
import { useMediaNavigation } from '../hooks/useMediaNavigation';
import { useIngredientCard } from '../hooks/useIngredientCard';
import Header from './Header';
import ProgressBars from './ProgressBars';
import Hotspots from './Hotspots';
import IngredientCard from './IngredientCard';
import ActionButtons from './ActionButtons';
import VideoControls from './VideoControls';
import DishCustomizationPanel from './DishCustomizationPanel';

const RestaurantStory = ({ restaurant }) => {
  const { addToCart, removeCartItemById } = useCart();
  const { showToast } = useToast();
  const isOnline = useNetworkStatus();
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [isCustomizationPanelOpen, setIsCustomizationPanelOpen] = useState(false);
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

  // Reset media loaded state when dish changes
  useEffect(() => {
    setIsMediaLoaded(false);
  }, [currentDishIndex]);

  // Auto-advance when progress completes
  useEffect(() => {
    if (progress >= 100 && !isProgressPaused) {
      if (currentDishIndex < restaurant.stories.length - 1) {
        setCurrentDishIndex(prev => prev + 1);
      }
    }
  }, [progress, currentDishIndex, restaurant.stories.length, isProgressPaused]);

  const { getDishCustomizations, clearDishCustomizations } = useCustomization();

  // Calculate customization count and final price
  const calculateDishPrice = () => {
    if (!currentDish) return { count: 0, finalPrice: 0 };
    
    const customizations = getDishCustomizations(currentDish.dishId);
    const count = customizations.length;
    const totalAdjustments = customizations.reduce((sum, c) => sum + (c.priceChange || 0), 0);
    const finalPrice = currentDish.basePrice + totalAdjustments;
    
    return { count, finalPrice };
  };

  const { count: customizationCount, finalPrice } = calculateDishPrice();

  // Handler for Customize button
  const handleCustomize = () => {
    if (currentDish) {
      setIsCustomizationPanelOpen(true);
    }
  };

  // Handler for Add to Cart button
  const handleAddToCart = () => {
    if (currentDish && isOnline) {
      // Get customizations for this dish
      const customizations = getDishCustomizations(currentDish.dishId);
      
      const cartItemId = addToCart({
        dishId: currentDish.dishId,
        dishName: currentDish.dishName,
        basePrice: currentDish.basePrice,
        finalPrice: finalPrice,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        customizations: customizations
      });
      
      // Clear customizations for this dish after adding to cart
      clearDishCustomizations(currentDish.dishId);
      
      // Show toast with undo option
      showToast(
        `${currentDish.dishName} added to cart!`,
        'success',
        5000,
        () => {
          // Undo function
          removeCartItemById(cartItemId);
          showToast('Item removed from cart', 'info', 2000);
        }
      );
    }
  };

  // Check if buttons should be disabled
  const isDisabled = !currentDish || !currentMedia || !isOnline;

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
                onLoad={() => setIsMediaLoaded(true)}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x1200/333333/ffffff?text=Image+Not+Found';
                  setIsMediaLoaded(true); // Set loaded even on error so UI doesn't hang
                }}
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={currentMedia.url}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop={false}
                  onLoadedData={() => setIsMediaLoaded(true)}
                  onCanPlay={() => setIsMediaLoaded(true)}
                  onError={(e) => {
                    console.error('Video error:', e);
                    setIsMediaLoaded(true); // Set loaded even on error so UI doesn't hang
                  }}
                />
                {/* Video Controls */}
                <VideoControls videoRef={videoRef} isCardOpen={isCardOpen} />
              </>
            )}
            
            {/* Hotspots - only render after media is loaded */}
            {isMediaLoaded && (
              <Hotspots 
                hotspots={currentMedia.hotspots} 
                onHotspotClick={handleHotspotClick}
                dishId={currentDish.dishId}
              />
            )}
            
            {/* Dish Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0  text-white z-10">
              <div className="bg-gradient-to-t from-black/50 via-black/40 to-white/20 rounded-t-2xl p-5 backdrop-blur-sm pb-6">
                <h3 className="text-3xl font-bold mb-2">{currentDish.dishName}</h3>
                {currentDish.description && (
                  <p className="text-sm text-white/90 mb-3 leading-relaxed line-clamp-2">
                    {currentDish.description}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  {customizationCount > 0 ? (
                    <>
                      <span className="text-lg line-through text-white/60">${currentDish.basePrice.toFixed(2)}</span>
                      <span className="text-2xl font-bold">${finalPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">${currentDish.basePrice.toFixed(2)}</span>
                  )}
                  <span className="text-sm text-white/70">per serving</span>
                </div>
                 {/* Action Buttons */}
                <ActionButtons 
                  onCustomize={handleCustomize}
                  onAddToCart={handleAddToCart}
                  disabled={isDisabled}
                  customizationCount={customizationCount}
                  finalPrice={finalPrice}
                />
              </div>
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
        dish={currentDish}
        isOpen={isCardOpen}
        onClose={handleCloseCard}
        onCustomize={handleCustomize}
        onAddExtra={handleAddExtra}
      />

      {/* Dish Customization Panel */}
      <DishCustomizationPanel
        dish={currentDish}
        isOpen={isCustomizationPanelOpen}
        onClose={() => setIsCustomizationPanelOpen(false)}
      />
     
    </div>
  );
};

export default RestaurantStory;
