 import React from 'react'
import { useState, useEffect, useRef } from 'react';
import RestaurantStory from './RestaurantStory';
import { mockData } from '../data/mockData';

const StoryFeed = () => {
  const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const isDragging = useRef(false);
  const containerRef = useRef(null);
  const currentIndexRef = useRef(0);

  const restaurants = mockData.restaurants;
  const minSwipeDistance = 50;

  useEffect(() => {
    currentIndexRef.current = currentRestaurantIndex;
  }, [currentRestaurantIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleSwipe = (startY, endY, startX, endX) => {
      if (!startY || !endY || !startX || !endX) return;
      
      const verticalDistance = Math.abs(startY - endY);
      const horizontalDistance = Math.abs(startX - endX);
      
      // Only process vertical swipes if vertical movement is greater than horizontal
      if (verticalDistance <= horizontalDistance) {
        touchStartY.current = null;
        touchEndY.current = null;
        touchStartX.current = null;
        touchEndX.current = null;
        isDragging.current = false;
        return;
      }

      const distance = startY - endY;
      const isUpSwipe = distance > minSwipeDistance;
      const isDownSwipe = distance < -minSwipeDistance;

      if (isUpSwipe && currentIndexRef.current < restaurants.length - 1) {
        setCurrentRestaurantIndex(prev => prev + 1);
      }
      if (isDownSwipe && currentIndexRef.current > 0) {
        setCurrentRestaurantIndex(prev => prev - 1);
      }

      // Reset after swipe
      touchStartY.current = null;
      touchEndY.current = null;
      touchStartX.current = null;
      touchEndX.current = null;
      isDragging.current = false;
    };

    // Touch event handlers
    const onTouchStart = (e) => {
      touchEndY.current = null;
      touchEndX.current = null;
      touchStartY.current = e.targetTouches[0].clientY;
      touchStartX.current = e.targetTouches[0].clientX;
      isDragging.current = true;
    };

    const onTouchMove = (e) => {
      if (isDragging.current) {
        touchEndY.current = e.targetTouches[0].clientY;
        touchEndX.current = e.targetTouches[0].clientX;
      }
    };

    const onTouchEnd = () => {
      handleSwipe(touchStartY.current, touchEndY.current, touchStartX.current, touchEndX.current);
    };

    // Mouse event handlers for desktop - only for vertical drag
    const onMouseDown = (e) => {
      // Only handle vertical drags, let clicks pass through to RestaurantStory
      touchEndY.current = null;
      touchEndX.current = null;
      touchStartY.current = e.clientY;
      touchStartX.current = e.clientX;
      isDragging.current = true;
      // Prevent default to stop macOS gestures (like double-click drag)
      if (e.detail > 1) {
        e.preventDefault();
      }
    };

    const onMouseMove = (e) => {
      if (isDragging.current) {
        touchEndY.current = e.clientY;
        touchEndX.current = e.clientX;
        // Prevent default on drag to stop macOS gestures
        if (touchStartY.current && Math.abs(e.clientY - touchStartY.current) > 5) {
          e.preventDefault();
        }
      }
    };

    const onMouseUp = () => {
      handleSwipe(touchStartY.current, touchEndY.current, touchStartX.current, touchEndX.current);
    };

    // Add touch event listeners
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('touchcancel', onTouchEnd, { passive: true });

    // Add mouse event listeners
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseUp); // Handle when mouse leaves container

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', onMouseUp);
    };
  }, [restaurants.length]);

  const currentRestaurant = restaurants[currentRestaurantIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-black touch-none select-none cursor-grab active:cursor-grabbing"
    >
      <RestaurantStory 
        key={currentRestaurantIndex} 
        restaurant={currentRestaurant} 
      />
    </div>
  );
};

export default StoryFeed;

