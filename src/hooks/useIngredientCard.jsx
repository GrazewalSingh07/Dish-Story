import { useState } from 'react';

export const useIngredientCard = (currentMedia, videoRef, pauseProgress) => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isProgressPaused, setIsProgressPaused] = useState(false);

  const handleHotspotClick = (ingredient, currentProgress) => {
    if (ingredient) {
      setSelectedIngredient(ingredient);
      setIsCardOpen(true);
      setIsProgressPaused(true);
      pauseProgress(currentProgress);
      // Pause video if playing
      if (videoRef?.current && currentMedia?.type === 'video') {
        videoRef.current.pause();
      }
    }
  };

  const handleCloseCard = () => {
    setIsCardOpen(false);
    setSelectedIngredient(null);
    setIsProgressPaused(false);
    // Resume video if it was playing
    if (videoRef?.current && currentMedia?.type === 'video') {
      videoRef.current.play();
    }
  };

  return {
    selectedIngredient,
    isCardOpen,
    isProgressPaused,
    handleHotspotClick,
    handleCloseCard
  };
};

