import { useState, useEffect, useRef } from 'react';

export const useProgress = (currentMedia, currentDishIndex, totalDishes, isProgressPaused, videoRef, savedProgressRef) => {
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef(null);

  // Progress tracking for images and videos
  useEffect(() => {
    if (!currentMedia) {
      setProgress(0);
      if (savedProgressRef) savedProgressRef.current = 0;
      return;
    }

    if (isProgressPaused) {
      return; // Don't update progress when paused
    }

    // Restore progress if resuming, otherwise start from 0
    if (savedProgressRef && savedProgressRef.current > 0) {
      setProgress(savedProgressRef.current);
      savedProgressRef.current = 0; // Clear after restoring
    } else {
      setProgress(0);
    }

    if (currentMedia.type === 'image') {
      // For images: 5 second timer
      const duration = currentMedia.duration || 5000;
      const interval = 50; // Update every 50ms for smooth animation
      const increment = (100 / duration) * interval;

      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressIntervalRef.current);
            savedProgressRef.current = 0;
            return 100; // Signal completion
          }
          return Math.min(prev + increment, 100);
        });
      }, interval);

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else if (currentMedia.type === 'video') {
      // For videos: wait for video to load, then track progress
      const video = videoRef.current;
      
      if (!video) {
        // Video element not ready yet, will be handled in next render
        return;
      }

      const updateProgress = () => {
        if (video.duration && video.duration > 0) {
          const videoProgress = (video.currentTime / video.duration) * 100;
          setProgress(videoProgress);
        }
      };

      const handleVideoEnd = () => {
        setProgress(100); // Signal completion
      };

      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('ended', handleVideoEnd);

      // Update progress immediately if video is already loaded
      if (video.readyState >= 2) {
        updateProgress();
      }

      return () => {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [currentMedia, isProgressPaused, videoRef]);

  // Reset progress when dish changes
  useEffect(() => {
    setProgress(0);
    if (savedProgressRef) savedProgressRef.current = 0;
  }, [currentDishIndex, savedProgressRef]);

  const pauseProgress = (currentProgress) => {
    if (savedProgressRef) {
      savedProgressRef.current = currentProgress;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  return { progress, pauseProgress };
};

