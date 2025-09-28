'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface RatingStarsProps {
  rating: number;
  variant?: 'editable' | 'display';
  onRatingChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function RatingStars({ 
  rating, 
  variant = 'display', 
  onRatingChange,
  size = 'md' 
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (value: number) => {
    if (variant === 'editable' && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (variant === 'editable') {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (variant === 'editable') {
      setHoverRating(0);
    }
  };

  const displayRating = variant === 'editable' && hoverRating > 0 ? hoverRating : rating;

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={`${sizeClasses[size]} ${
            value <= displayRating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-400'
          } ${
            variant === 'editable' 
              ? 'cursor-pointer hover:text-yellow-400 transition-colors duration-200' 
              : ''
          }`}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
      {variant === 'display' && (
        <span className="text-sm text-text-secondary ml-2">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
