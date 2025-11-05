import { useRef } from 'react';

export const useMediaNavigation = (onNavigate) => {
  const containerRef = useRef(null);
  const clickStartRef = useRef(null);

  const handleMediaClick = (e) => {
    const container = containerRef.current;
    if (!container) return;

    // Check if this was a drag (not a click)
    if (clickStartRef.current) {
      const moveDistance = Math.abs(
        Math.sqrt(
          Math.pow(e.clientX - clickStartRef.current.x, 2) +
          Math.pow(e.clientY - clickStartRef.current.y, 2)
        )
      );
      // If moved more than 10px, treat as drag, not click
      if (moveDistance > 10) {
        clickStartRef.current = null;
        return;
      }
    }

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // Check if click is in left 30% or right 30% of screen
    const leftZone = clickX < width * 0.3;
    const rightZone = clickX > width * 0.7;

    // Don't navigate if clicking in center 40%
    if (leftZone || rightZone) {
      onNavigate(leftZone ? 'prev' : 'next');
    }
    
    clickStartRef.current = null;
  };

  const handleMouseDown = (e) => {
    // Only handle horizontal clicks, let vertical swipes pass through
    clickStartRef.current = { x: e.clientX, y: e.clientY };
    // Don't stop propagation - let vertical swipes bubble up to StoryFeed
  };

  const handleMouseMove = (e) => {
    // Track movement to detect if it's a vertical swipe (should pass through)
    if (clickStartRef.current) {
      const deltaX = Math.abs(e.clientX - clickStartRef.current.x);
      const deltaY = Math.abs(e.clientY - clickStartRef.current.y);
      // If vertical movement is greater, it's a vertical swipe - clear click tracking
      if (deltaY > deltaX && deltaY > 10) {
        clickStartRef.current = null;
      }
    }
  };

  const handleMouseUp = (e) => {
    if (clickStartRef.current) {
      // Only handle if it's still a click (not a vertical swipe)
      handleMediaClick(e);
    }
    clickStartRef.current = null;
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    clickStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    // Track movement to detect if it's a vertical swipe (should pass through)
    if (clickStartRef.current && e.touches.length > 0) {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - clickStartRef.current.x);
      const deltaY = Math.abs(touch.clientY - clickStartRef.current.y);
      // If vertical movement is greater, it's a vertical swipe - clear click tracking
      if (deltaY > deltaX && deltaY > 10) {
        clickStartRef.current = null;
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (clickStartRef.current) {
      const touch = e.changedTouches[0];
      const syntheticEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY
      };
      handleMediaClick(syntheticEvent);
    }
    clickStartRef.current = null;
  };

  return {
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMediaClick
  };
};

