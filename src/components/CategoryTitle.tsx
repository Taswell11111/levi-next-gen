import React, { useId } from 'react';

interface CategoryTitleProps {
  title: string;
  className?: string;
}

export const CategoryTitle: React.FC<CategoryTitleProps> = ({ title, className = '' }) => {
  const rawId = useId();
  const gradientId = `pearl-black-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <div className={`relative inline-flex items-end ${className}`}>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase font-bold tracking-tight">
        {title}
      </h2>
      {/* Reebok Chamfer Underline Accent */}
      <div className="flex items-center gap-1 mt-1.5">
        <div className="h-1 w-20 sm:w-28 bg-gradient-to-r from-[#111111] via-[#5c5f6e] to-[#c7ccd9] reebok-cut"></div>
        <div className="h-1 w-3 bg-[#D81C2A] transform -skew-x-[25deg]"></div>
      </div>
    </div>
  );
};
