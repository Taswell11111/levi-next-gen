import React, { useState, useRef } from 'react';
import { CartItem } from '../types/store';
import { Product } from '../data/products';
import { X, Move, Trash2, Plus, RotateCw, Sparkles, ShoppingBag } from 'lucide-react';

interface InteractiveStylingBoardProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSelectProduct: (product: Product) => void;
}

interface PlacedBoardItem {
  instanceId: string;
  product: Product;
  size: string;
  x: number;
  y: number;
  zIndex: number;
}

export const InteractiveStylingBoard: React.FC<InteractiveStylingBoardProps> = ({
  isOpen,
  onClose,
  cartItems,
  onSelectProduct
}) => {
  const [placedItems, setPlacedItems] = useState<PlacedBoardItem[]>(() => {
    // Initial default layout placing first cart item if available
    return cartItems.slice(0, 2).map((item, index) => ({
      instanceId: `${item.product.id}-${index}-${Date.now()}`,
      product: item.product,
      size: item.size,
      x: 100 + index * 220,
      y: 120 + (index % 2) * 80,
      zIndex: index + 1
    }));
  });

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [maxZIndex, setMaxZIndex] = useState<number>(cartItems.length + 1);

  const boardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleAddItemToBoard = (cartItem: CartItem) => {
    const newItem: PlacedBoardItem = {
      instanceId: `${cartItem.product.id}-${Date.now()}`,
      product: cartItem.product,
      size: cartItem.size,
      x: 150 + Math.random() * 100,
      y: 150 + Math.random() * 100,
      zIndex: maxZIndex + 1
    };
    setMaxZIndex(prev => prev + 1);
    setPlacedItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (instanceId: string) => {
    setPlacedItems(prev => prev.filter(item => item.instanceId !== instanceId));
  };

  const handleClearBoard = () => {
    setPlacedItems([]);
  };

  const handleMouseDown = (e: React.MouseEvent, instanceId: string) => {
    e.stopPropagation();
    const item = placedItems.find(i => i.instanceId === instanceId);
    if (!item || !boardRef.current) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const offsetX = (e.clientX - boardRect.left) - item.x;
    const offsetY = (e.clientY - boardRect.top) - item.y;

    setDraggingId(instanceId);
    setDragOffset({ x: offsetX, y: offsetY });

    // Bring to front
    setMaxZIndex(prev => prev + 1);
    setPlacedItems(prev =>
      prev.map(i => (i.instanceId === instanceId ? { ...i, zIndex: maxZIndex + 1 } : i))
    );
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId || !boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();

    const newX = Math.max(0, Math.min(boardRect.width - 200, (e.clientX - boardRect.left) - dragOffset.x));
    const newY = Math.max(0, Math.min(boardRect.height - 240, (e.clientY - boardRect.top) - dragOffset.y));

    setPlacedItems(prev =>
      prev.map(item => (item.instanceId === draggingId ? { ...item, x: newX, y: newY } : item))
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white w-full max-w-[1500px] h-[92vh] flex flex-col reebok-cut shadow-2xl overflow-hidden border-2 border-black"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#D81C2A] p-2 text-white reebok-cut-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block">
                Reebok South Africa · Interactive Style & Moodboard
              </span>
              <h2 className="font-display text-xl sm:text-2xl uppercase tracking-wider font-bold">
                Interactive Cart Products Styling Board
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleClearBoard}
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors reebok-cut-sm cursor-pointer"
            >
              Clear Board
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 bg-neutral-900 hover:bg-[#D81C2A] text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close interactive board"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Split Layout: Left Sidebar (Cart Items) + Right Canvas Board */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-neutral-100">
          
          {/* Left Sidebar: Cart Products */}
          <div className="w-full lg:w-80 bg-white border-r border-neutral-200 flex flex-col shrink-0">
            <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <h3 className="font-display uppercase text-sm font-bold text-neutral-900">
                Cart Items ({cartItems.length})
              </h3>
              <span className="text-[11px] text-neutral-500 font-mono">Click to Add</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-neutral-100">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-neutral-300 stroke-[1.2]" />
                  <p className="text-xs uppercase font-bold text-neutral-700">No items in cart</p>
                  <p className="text-[11px] text-neutral-500 mt-1">Add items to bag to style them on the board.</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.product.id}-${item.size}-${idx}`} className="pt-3 first:pt-0 flex items-center gap-3 group">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover bg-neutral-100 reebok-cut shrink-0 mix-blend-multiply border border-neutral-200"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-neutral-900 truncate group-hover:text-[#D81C2A] transition-colors">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-neutral-500">Size: UK {item.size}</p>
                      <p className="text-xs font-semibold text-neutral-900 tabular-nums">{item.product.formattedPrice}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddItemToBoard(item)}
                      title="Add to board"
                      className="bg-black text-white w-9 h-9 flex items-center justify-center hover:bg-[#D81C2A] transition-colors reebok-cut-sm shrink-0 cursor-pointer active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-[11px] text-neutral-600 leading-relaxed">
              💡 <strong>Tip:</strong> Click and hold onto any image frame on the right to drag it freely in any direction across the styling board.
            </div>
          </div>

          {/* Right Main Screen / Styling Board */}
          <div 
            ref={boardRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex-1 relative overflow-hidden bg-[#f4f5f7] cursor-crosshair select-none flex items-center justify-center"
          >
            {/* Subtle Grid Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

            {/* Empty state hint */}
            {placedItems.length === 0 && (
              <div className="absolute z-0 text-center p-8 max-w-md pointer-events-none">
                <div className="w-16 h-16 bg-white border border-neutral-300 reebok-cut flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Move className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-display uppercase text-lg font-bold text-neutral-700 mb-1">
                  Styling Board is Empty
                </h3>
                <p className="text-xs text-neutral-500">
                  Select items from your cart on the left sidebar using the <strong className="text-black">+</strong> button to place them onto the interactive board.
                </p>
              </div>
            )}

            {/* Draggable Placed Product Image Frames */}
            {placedItems.map(item => (
              <div
                key={item.instanceId}
                onMouseDown={(e) => handleMouseDown(e, item.instanceId)}
                style={{
                  transform: `translate(${item.x}px, ${item.y}px)`,
                  zIndex: item.zIndex
                }}
                className="absolute top-0 left-0 w-56 bg-white border-2 border-black shadow-2xl reebok-cut cursor-grab active:cursor-grabbing group transition-shadow duration-150"
              >
                {/* Frame Header Toolbar */}
                <div className="bg-neutral-950 text-white px-3 py-1.5 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 truncate">
                    <Move className="w-3.5 h-3.5 text-[#D81C2A] shrink-0" />
                    <span className="truncate uppercase font-bold">{item.product.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveItem(item.instanceId);
                    }}
                    title="Remove from board"
                    className="text-neutral-400 hover:text-[#D81C2A] transition-colors ml-2 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Product Image Display */}
                <div className="bg-[#f8f9fb] aspect-square p-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover mix-blend-multiply pointer-events-none group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Frame Footer Details */}
                <div className="p-3 bg-white border-t border-neutral-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Size: UK {item.size}</span>
                    <span className="font-display font-bold text-xs text-neutral-900 tabular-nums">
                      {item.product.formattedPrice}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(item.product);
                    }}
                    className="text-[10px] uppercase font-bold text-[#D81C2A] underline hover:text-black transition-colors"
                  >
                    View PDP
                  </button>
                </div>
              </div>
            ))}

            {/* Board Watermark */}
            <div className="absolute bottom-4 right-4 pointer-events-none text-neutral-400 font-display font-bold uppercase text-xs tracking-widest opacity-40">
              Reebok SA Style Board · Drag & Drop Canvas
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
