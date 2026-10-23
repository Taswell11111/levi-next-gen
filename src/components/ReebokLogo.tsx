import React from 'react';

interface ReebokLogoProps {
  className?: string;
  variant?: 'full' | 'vector-only' | 'wordmark-only';
  color?: string;
}

export const ReebokLogo: React.FC<ReebokLogoProps> = ({
  className = 'h-7 w-auto',
  variant = 'full',
  color = 'currentColor'
}) => {
  if (variant === 'vector-only') {
    return (
      <svg
        viewBox="0 0 100 40"
        className={className}
        fill={color}
        aria-label="Reebok Vector"
      >
        {/* Iconic Reebok Vector symbol */}
        <polygon points="12,32 38,4 52,4 28,32" />
        <polygon points="36,32 88,4 98,4 48,32" />
        <polygon points="4,24 64,12 60,18 8,28" fill="#D81C2A" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Vector Chevron Mark */}
      <svg
        viewBox="0 0 70 34"
        className="h-6 w-auto shrink-0"
        fill={color}
        aria-hidden="true"
      >
        <polygon points="8,28 28,4 38,4 20,28" />
        <polygon points="26,28 64,4 72,4 36,28" />
        <polygon points="2,21 48,11 45,16 6,24" fill="#D81C2A" />
      </svg>

      <div className="flex flex-col">
        {/* Reebok Wordmark without period */}
        <span className="font-display font-bold text-xl tracking-wider uppercase text-neutral-900 group-hover:text-[#D81C2A] transition-colors leading-none">
          REEBOK<span className="text-[#D81C2A] font-mono ml-0.5 text-sm">ZA</span>
        </span>
        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mt-0.5">
          Official Reebok South Africa
        </span>
      </div>
    </div>
  );
};
