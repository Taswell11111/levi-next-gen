import React, { useState } from 'react';
import { Product } from '../data/products';
import { Heart, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onQuickAdd?: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onToggleWishlist,
  isWishlisted,
  onQuickAdd
}) => {
  const [imgError, setImgError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first available in-stock size
    const availableSize = product.sizesUK.find(s => s.stock > 0)?.size || product.sizesUK[0]?.size || 'Standard';
    if (onQuickAdd) {
      onQuickAdd(product, availableSize);
      setAddedAnimation(true);
      setTimeout(() => setAddedAnimation(false), 1500);
    }
  };

  const hasBlur =
    product.name.includes('Club C 85 Vintage') ||
    product.name.includes('Classic Leather SP Extra Platform') ||
    product.name.includes('Nano X4') ||
    product.name.includes('FloatZig 1') ||
    product.name.includes('Zig Kinetica 2.5 Edge');

  return (
    <div
      onClick={() => onSelect(product)}
      className="product-card group cursor-pointer flex flex-col h-full bg-white transition-all duration-300"
    >
      {/* Product Image Frame with signature Reebok Cut */}
      <div className="relative bg-[#f5f6f8] aspect-square overflow-hidden mb-2.5 sm:mb-3 reebok-cut border border-neutral-100 group-hover:border-neutral-300 transition-colors">
        {/* Subtle Text Kicker (No Pill Badges) */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 bg-black text-white text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 sm:px-2.5 sm:py-1">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button - Min 40px hitbox for mobile touch ergonomics */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2 right-2 sm:top-3.5 sm:right-3.5 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-[#D81C2A] text-white shadow-sm'
              : 'bg-white/85 backdrop-blur-sm text-neutral-400 hover:text-[#D81C2A] hover:bg-white'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
        </button>

        {/* Image / Fallback Container */}
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 text-center bg-neutral-100 text-neutral-500">
            <svg viewBox="0 0 70 34" className="w-12 h-6 sm:w-16 sm:h-8 fill-neutral-400 mb-2" aria-hidden="true">
              <polygon points="8,28 28,4 38,4 20,28" />
              <polygon points="26,28 64,4 72,4 36,28" />
              <polygon points="2,21 48,11 45,16 6,24" fill="#D81C2A" />
            </svg>
            <span className="font-display uppercase text-[10px] sm:text-xs tracking-wider text-neutral-800 font-bold">{product.franchise}</span>
            <span className="text-[10px] sm:text-[11px] text-neutral-500 mt-0.5">{product.colorway}</span>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="product-img w-full h-full object-cover mix-blend-multiply"
            />
            {/* Center logo blur overlay for specified products - scaled responsively */}
            {hasBlur && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-10 sm:w-24 sm:h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-md" />
              </div>
            )}
          </div>
        )}

        {/* Mobile Quick Add Button (Visible on mobile touch screens where hover isn't natural) */}
        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label="Quick add to cart"
          className="sm:hidden absolute bottom-2 right-2 z-10 w-8 h-8 bg-black/90 text-white rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform"
        >
          {addedAnimation ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>

        {/* Desktop Quick Add Overlay on Hover */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity items-center justify-between">
          <span className="text-white text-xs font-medium tracking-wide">
            {product.sizesUK.length > 1 ? `${product.sizesUK.length} UK Sizes` : 'In Stock'}
          </span>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="bg-white text-black hover:bg-[#D81C2A] hover:text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors reebok-cut-sm flex items-center gap-1.5"
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Added
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Metadata & Pricing */}
      <div className="flex flex-col flex-1 text-left px-0.5">
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider mb-0.5 truncate">
          <span className="truncate">{product.category}</span>
        </div>

        <h3 className="font-sans font-semibold text-xs sm:text-sm text-neutral-900 group-hover:text-[#D81C2A] transition-colors line-clamp-1 sm:line-clamp-2 mb-1">
          {product.name}
        </h3>

        <div className="mt-auto pt-1 sm:pt-2 flex items-baseline justify-between">
          <span className="font-display font-bold text-sm sm:text-base text-neutral-900 tracking-tight tabular-nums">
            {product.formattedPrice}
          </span>
          <span className="hidden sm:inline text-[11px] font-mono text-neutral-400">
            SKU {product.sku.slice(-4)}
          </span>
        </div>
      </div>
    </div>
  );
};
