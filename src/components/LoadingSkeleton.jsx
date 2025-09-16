import React from 'react';

const LoadingSkeleton = ({ className = '', rounded = true, style = {}, bgClass = 'bg-gray-700/40', 'aria-label': ariaLabel = 'loading' }) => {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`loading-skeleton relative overflow-hidden ${bgClass} animate-pulse ${rounded ? 'rounded-lg' : ''} ${className}`}
      style={style}
    >
      {/* Decorative gradient shimmer (Tailwind classes) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default LoadingSkeleton;
