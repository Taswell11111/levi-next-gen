import React from 'react';
import { CartItem } from '../types/store';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1000;
  const subtotalZAR = items.reduce((acc, item) => acc + item.product.priceZAR * item.quantity, 0);
  const qualifiesForFreeShipping = subtotalZAR >= FREE_SHIPPING_THRESHOLD;
  const shippingCostZAR = items.length === 0 ? 0 : qualifiesForFreeShipping ? 0 : 120;
  const totalZAR = subtotalZAR + shippingCostZAR;

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
            <ShoppingBag className="w-5 h-5 text-[#D81C2A]" />
            <h2 className="font-display uppercase text-lg sm:text-xl font-bold tracking-wide">
              Your Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors rounded-sm"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Status Bar */}
        <div className="bg-neutral-900 text-white px-5 py-3 text-xs">
          <div className="flex items-center gap-2 mb-1.5 font-medium">
            <Truck className="w-4 h-4 text-[#D81C2A] shrink-0" />
            <span>
              {qualifiesForFreeShipping
                ? 'FREE South Africa Nationwide Delivery Unlocked!'
                : `Add R ${(FREE_SHIPPING_THRESHOLD - subtotalZAR).toLocaleString('en-ZA')} more for Free SA Delivery`}
            </span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 overflow-hidden">
            <div
              className="bg-[#D81C2A] h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotalZAR / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
              <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4 stroke-[1.2]" />
              <p className="font-display uppercase text-lg font-bold text-neutral-800 mb-1">
                Your bag is empty
              </p>
              <p className="text-xs text-neutral-500 mb-6 max-w-xs">
                Explore our authentic Classics, Nano cross-trainers, and FloatZig collection.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-black text-white px-6 py-3 font-bold uppercase tracking-wider text-xs hover:bg-[#D81C2A] transition-colors reebok-cut"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 object-cover bg-neutral-100 reebok-cut shrink-0 mix-blend-multiply"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-sm text-neutral-900 leading-snug line-clamp-1">
                      {item.product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      className="text-neutral-400 hover:text-[#D81C2A] transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-500 mt-0.5">
                    Size: <span className="font-medium text-neutral-800">UK {item.size}</span>
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-neutral-300">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="px-2 py-1 text-neutral-600 hover:bg-neutral-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold tabular-nums">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="px-2 py-1 text-neutral-600 hover:bg-neutral-100"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-display font-bold text-sm tabular-nums text-neutral-900">
                      {(item.product.priceZAR * item.quantity).toLocaleString('en-ZA', {
                        style: 'currency',
                        currency: 'ZAR'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3 pb-safe">
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal (VAT Incl.)</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {subtotalZAR.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>South Africa Delivery</span>
                <span className="font-semibold text-neutral-900 tabular-nums">
                  {shippingCostZAR === 0 ? 'FREE' : `R ${shippingCostZAR}.00 ZAR`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200">
              <span className="font-display uppercase text-base font-bold text-neutral-900">Total</span>
              <span className="font-display font-bold text-2xl text-neutral-950 tabular-nums">
                {totalZAR.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-[#D81C2A] text-white py-4 font-bold uppercase tracking-wider text-xs hover:bg-black transition-colors reebok-cut flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
