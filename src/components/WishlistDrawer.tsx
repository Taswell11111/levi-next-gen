import React from 'react';
import { Product, PRODUCTS } from '../data/products';
import { X, Heart, Plus, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-neutral-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Heart className="w-5 h-5 text-[#D81C2A] fill-[#D81C2A]" />
            <h2 className="font-display uppercase text-lg sm:text-xl font-bold tracking-wide">
              Saved Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <Heart className="w-16 h-16 text-neutral-300 mb-4 stroke-[1.2]" />
              <p className="font-display uppercase text-lg font-bold text-neutral-800 mb-1">
                Your wishlist is empty
              </p>
              <p className="text-xs text-neutral-500 mb-6 max-w-xs">
                Click the heart icon on any Reebok product to save it for later.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider text-xs hover:bg-[#D81C2A] transition-colors reebok-cut"
              >
                Browse Products
              </button>
            </div>
          ) : (
            wishlistedProducts.map(p => (
              <div key={p.id} className="py-4 flex gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="w-20 h-20 object-cover bg-neutral-100 reebok-cut shrink-0 mix-blend-multiply cursor-pointer"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                      className="font-semibold text-sm text-neutral-900 leading-snug line-clamp-1 cursor-pointer hover:text-[#D81C2A] transition-colors"
                    >
                      {p.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(p.id)}
                      className="text-neutral-400 hover:text-[#D81C2A] transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-500 mt-0.5">{p.category}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-display font-bold text-sm tabular-nums text-neutral-900">
                      {p.formattedPrice}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        const size = p.sizesUK.find(s => s.stock > 0)?.size || p.sizesUK[0]?.size || 'Standard';
                        onAddToCart(p, size, 1);
                      }}
                      className="bg-neutral-900 hover:bg-[#D81C2A] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors reebok-cut-sm flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
