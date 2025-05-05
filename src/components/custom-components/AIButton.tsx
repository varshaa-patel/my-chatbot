
import React from 'react';
import { cn } from '@/lib/utils';

type AIButtonProps = {
  onClick?: () => void;
  active?: boolean;
  className?: string;
};

const AIButton: React.FC<AIButtonProps> = ({ onClick, active = false, className }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <p className="text-xs text-gray-500 mb-2">
        Press and hold on AI to start speaking
      </p>
      <button
        onClick={onClick}
        className={cn(
          "relative w-14 h-14 rounded-full bg-white flex items-center justify-center",
          "focus:outline-none",
          { "shadow-lg": active }
        )}
      >
        {/* Pulsing effect */}
        {active && (
          <span className="absolute w-20 h-20 rounded-full bg-white opacity-50 animate-pulse-ring"></span>
        )}
        
        <span className="absolute inset-1 rounded-full bg-gradient-to-b from-teal-200 to-firnas-teal"></span>
        
        <div className="absolute inset-0 m-4 rounded bg-white flex justify-center items-center space-x-1">
          <div className={cn(
            "w-2 h-5 rounded bg-firnas-teal",
            { "animate-pulse": active }
          )}></div>
          <div className={cn(
            "w-2 h-5 rounded bg-firnas-teal",
            { "animate-pulse": active }
          )}></div>
        </div>
      </button>
    </div>
  );
};

export default AIButton;
