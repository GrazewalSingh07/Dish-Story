import React from 'react';

const Hotspots = ({ hotspots, onHotspotClick }) => {
  if (!hotspots || hotspots.length === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${hotspot.x * 100}%`,
            top: `${hotspot.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onHotspotClick(hotspot.ingredientId);
          }}
        >
          {/* Pulsing circle */}
          <div className="relative w-12 h-12">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-white/30 animate-ping" style={{ animationDuration: '2s' }} />
            {/* Middle ring */}
            <div className="absolute inset-0 rounded-full bg-white/50 animate-pulse" style={{ animationDuration: '1.5s' }} />
            {/* Inner dot */}
            <div className="absolute inset-2 rounded-full bg-white shadow-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hotspots;

