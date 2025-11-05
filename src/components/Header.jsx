import React from 'react';
import CartIcon from './CartIcon';

const Header = ({ restaurantName }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-4 text-white bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold">Dish Story</h2>
        </div>
        <CartIcon />
      </div>
      <div className="flex items-center gap-2 px-10">
        <h3 className="text-sm font-medium text-white/90">{restaurantName}</h3>
      </div>
    </div>
  );
};

export default Header;

