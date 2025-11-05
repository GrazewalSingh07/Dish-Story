import React from 'react';
import { useCustomization } from '../context/CustomizationContext';

const Hotspots = ({ hotspots, onHotspotClick, dishId }) => {
  const { isIngredientCustomized } = useCustomization();

  if (!hotspots || hotspots.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hotspots.map((hotspot) => {
        const isCustomized = dishId ? isIngredientCustomized(dishId, hotspot.ingredientId) : false;
        
        return (
          <div
            key={hotspot.id}
            data-hotspot="true"
            className="absolute pointer-events-auto cursor-pointer z-20"
            style={{
              left: `${hotspot.x * 100}%`,
              top: `${hotspot.y * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
            }}
            onMouseUp={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              e.nativeEvent.stopImmediatePropagation();
              onHotspotClick(hotspot.ingredientId);
            }}
          >
            {/* Pulsing circle */}
            <div className="relative w-12 h-12">
              {/* Outer pulsing ring */}
              <div 
                className={`absolute inset-0 rounded-full animate-ping ${isCustomized ? 'bg-yellow-400/50' : 'bg-white/30'}`} 
                style={{ animationDuration: '2s' }} 
              />
              {/* Middle ring */}
              <div 
                className={`absolute inset-0 rounded-full animate-pulse ${isCustomized ? 'bg-yellow-400/70' : 'bg-white/50'}`} 
                style={{ animationDuration: '1.5s' }} 
              />
              {/* Inner dot */}
              <div className={`absolute inset-2 rounded-full shadow-lg ${isCustomized ? 'bg-yellow-400' : 'bg-white'}`} />
              {/* Customized badge */}
              {isCustomized && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Hotspots;

