import React from 'react';

const ProgressBars = ({ dishes, currentDishIndex, progress }) => {
  if (!dishes || dishes.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-24 left-0 right-0 z-20 px-4">
      <div className="flex gap-1">
        {dishes.map((dish, dishIndex) => {
          // Calculate progress for current dish
          let dishProgress = 0;
          
          if (dishIndex < currentDishIndex) {
            // Completed dishes are 100%
            dishProgress = 100;
          } else if (dishIndex === currentDishIndex) {
            // Current dish: show progress of the single media item
            dishProgress = progress;
          }
          
          return (
            <div key={dishIndex} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden min-w-0">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{
                  width: `${Math.min(dishProgress, 100)}%`
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBars;

