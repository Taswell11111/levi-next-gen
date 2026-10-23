import React, { useState, useRef } from 'react';
import { Product, PRODUCTS } from '../data/products';
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  Star,
  Ruler,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductReviews } from './ProductReviews';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizesUK.find(s => s.stock > 0)?.size || product.sizesUK[0]?.size || 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Ref for thumbnail carousel
  const thumbnailCarouselRef = useRef<HTMLDivElement>(null);

  // Product Query Form state
  const [queryText, setQueryText] = useState<string>('');
  const [queryEmail, setQueryEmail] = useState<string>('');
  const [queryStep, setQueryStep] = useState<'input' | 'email'>('input');
  const [querySubmitted, setQuerySubmitted] = useState<boolean>(false);

  const allImages = [product.image, ...(product.additionalImages || [])];

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
    setImgError(false);
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
    setImgError(false);
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailCarouselRef.current) {
      const scrollAmount = 180;
      thumbnailCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNextImage();
    } else if (diff < -40) {
      handlePrevImage();
    }
    setTouchStartX(null);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Cross sell items: accessories only, as in concept
  const accessoryCrossSells = PRODUCTS.filter(
    p => p.tags.includes('accessories') && p.id !== product.id
  ).slice(0, 3);

  // Recommendations
  const youMayAlsoLike = PRODUCTS.filter(
    p => !p.tags.includes('accessories') && p.id !== product.id
  ).slice(0, 5);

  const currentSizeObj = product.sizesUK.find(s => s.size === selectedSize);
  const isOutOfStock = currentSizeObj?.stock === 0;

  return (
    <div className="bg-white min-h-screen pb-28 lg:pb-24 pt-2 sm:pt-4">
      {/* Breadcrumb Navigation - Responsive with clickable HOME */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-neutral-100 gap-2">
        <div className="flex items-center text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider gap-1.5 sm:gap-2 truncate">
          <button
            type="button"
            onClick={onBack}
            className="text-neutral-900 font-bold hover:text-[#D81C2A] transition-colors uppercase shrink-0"
          >
            Home
          </button>
          <span aria-hidden="true">/</span>
          <span className="truncate">{product.category}</span>
          <span aria-hidden="true" className="hidden sm:inline">/</span>
          <span className="hidden sm:inline text-neutral-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1.5 border transition-colors shrink-0 ${
            isWishlisted
              ? 'border-[#D81C2A] bg-red-50 text-[#D81C2A]'
              : 'border-neutral-300 text-neutral-700 hover:border-black'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#D81C2A]' : ''}`} />
          <span className="hidden sm:inline">{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
          <span className="sm:hidden">{isWishlisted ? 'Saved' : 'Save'}</span>
        </button>
      </div>

      {/* Main PDP Grid: Gallery on Left, Purchase Module on Right */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-4 sm:pt-8 flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Gallery */}
        <div className="lg:w-2/3 flex flex-col gap-3 sm:gap-4">
          {/* Main Visual Display with signature Reebok Cut */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative bg-[#f6f7f9] aspect-[4/3] reebok-cut overflow-hidden border border-neutral-200 select-none"
          >
            {imgError ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neutral-100">
                <svg viewBox="0 0 70 34" className="w-16 h-8 sm:w-24 sm:h-12 fill-neutral-400 mb-3" aria-hidden="true">
                  <polygon points="8,28 28,4 38,4 20,28" />
                  <polygon points="26,28 64,4 72,4 36,28" />
                  <polygon points="2,21 48,11 45,16 6,24" fill="#D81C2A" />
                </svg>
                <h3 className="font-display text-lg sm:text-xl uppercase font-bold text-neutral-800">{product.name}</h3>
                <p className="text-xs text-neutral-500 mt-1">{product.colorway}</p>
              </div>
            ) : (
              <img
                src={allImages[activeImageIndex] || product.image}
                alt={product.name}
                onError={() => setImgError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover mix-blend-multiply cursor-crosshair hover:scale-105 transition-transform duration-700"
              />
            )}

            {/* Left and Right navigation arrows for wiping through carousel when more than 4 images showing */}
            {allImages.length > 4 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  aria-label="Previous product image"
                  className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-black hover:text-white text-neutral-900 rounded-full shadow-md border border-neutral-200 flex items-center justify-center transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  aria-label="Next product image"
                  className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-black hover:text-white text-neutral-900 rounded-full shadow-md border border-neutral-200 flex items-center justify-center transition-all active:scale-95 cursor-pointer backdrop-blur-sm"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/75 backdrop-blur-sm text-white px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono tracking-wider z-10 reebok-cut-sm">
                  {activeImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}

            {product.badge && (
              <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black text-white px-2.5 sm:px-3.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest z-10">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnail Angles Carousel with Left & Right Arrows when > 4 images */}
          {allImages.length > 1 && (
            <div className="relative group/carousel flex items-center">
              {allImages.length > 4 && (
                <button
                  type="button"
                  onClick={() => scrollThumbnails('left')}
                  aria-label="Scroll images left"
                  className="absolute -left-1 sm:-left-3 z-20 w-7 h-7 sm:w-8 sm:h-8 bg-white/95 text-neutral-900 border border-neutral-300 hover:bg-black hover:text-white hover:border-black rounded-full shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <div
                ref={thumbnailCarouselRef}
                className={`flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scroll-smooth hide-scroll w-full ${
                  allImages.length > 4 ? 'px-6 sm:px-8' : ''
                }`}
              >
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setImgError(false);
                    }}
                    className={`w-18 h-18 sm:w-24 sm:h-24 bg-[#f6f7f9] reebok-cut-sm overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-black ring-1 ring-black' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>

              {allImages.length > 4 && (
                <button
                  type="button"
                  onClick={() => scrollThumbnails('right')}
                  aria-label="Scroll images right"
                  className="absolute -right-1 sm:-right-3 z-20 w-7 h-7 sm:w-8 sm:h-8 bg-white/95 text-neutral-900 border border-neutral-300 hover:bg-black hover:text-white hover:border-black rounded-full shadow-md flex items-center justify-center transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Product Specifications & Technology - Fits underneath product images on web (desktop) */}
          <div className="hidden lg:block pt-6 mt-2 border-t border-neutral-200">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider mb-4 text-neutral-900 font-bold">
              Product Specifications & Technology
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-5 sm:p-6 reebok-cut border border-neutral-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  Upper Engineering
                </span>
                <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.upper}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  Midsole Cushioning
                </span>
                <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.midsole}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  Outsole Traction
                </span>
                <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.outsole}</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                  Fit & Lacing
                </span>
                <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.closure}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchasing Module (Right on desktop, immediately after images on mobile!) */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-24 flex flex-col">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 uppercase tracking-wider">
              <span>{product.category}</span>
              <span className="font-mono text-[11px]">SKU: {product.sku}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase leading-none mb-2 text-neutral-950 font-bold">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 mb-2 font-medium">
              Color: <span className="text-neutral-900 font-semibold">{product.colorway}</span>
            </p>

            {/* Quick Star Rating snippet */}
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-3.5 h-3.5 fill-[#D81C2A] text-[#D81C2A]" />
                ))}
              </div>
              <a
                href="#reviews-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-neutral-700 underline hover:text-[#D81C2A] transition-colors"
              >
                4.8 / 5 (Verified Reviews)
              </a>
            </div>

            {/* Signature DOUBLE BORDER PRICE BOX from the concept (Full width, Right Aligned) */}
            <div className="w-full reebok-double-box p-4 sm:p-5 mb-4 text-right bg-white shadow-sm">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-500 block mb-0.5">
                South African Retail Price (VAT Incl.)
              </span>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-950 tracking-tight tabular-nums">
                {product.formattedPrice}
              </p>
            </div>

            {/* Description Copy */}
            <div className="mb-5 pb-5 border-b border-neutral-200">
              <h4 className="font-bold text-xs uppercase tracking-wider mb-1.5 text-neutral-900">Description</h4>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selector with Live Stock Availability Box (Hover tooltips removed, available box retained) */}
            <div className="mb-5 sm:mb-6">
              <div className="flex justify-between items-baseline mb-2.5 sm:mb-3">
                <span className="font-bold uppercase tracking-wider text-xs text-neutral-900">
                  Select Size (UK Standard)
                </span>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-800 underline hover:text-[#D81C2A] font-semibold transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5 text-[#D81C2A]" />
                  <span>View Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-2.5 pt-2">
                {product.sizesUK.map((s) => {
                  const isSelected = selectedSize === s.size;
                  const isSoldOut = s.stock === 0;

                  return (
                    <button
                      key={s.size}
                      type="button"
                      disabled={isSoldOut}
                      onClick={() => setSelectedSize(s.size)}
                      className={`w-full min-h-[44px] py-2.5 sm:py-3 text-center text-xs sm:text-sm font-semibold transition-colors border ${
                        isSoldOut
                          ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-black text-white border-black shadow-sm ring-1 ring-black'
                          : 'border-neutral-300 text-neutral-800 bg-white'
                      }`}
                    >
                      {s.size}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Size Availability Box: Appears whenever a size is selected (touch/mobile friendly gesture & desktop confirmation) */}
              {currentSizeObj && (
                <div className="mt-3.5 p-3 bg-neutral-900 text-white flex items-center justify-between border-l-4 border-[#D81C2A] transition-all shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        currentSizeObj.stock === 0
                          ? 'bg-neutral-500'
                          : currentSizeObj.stock <= 3
                          ? 'bg-[#D81C2A] animate-pulse'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block">
                        UK {currentSizeObj.size} Available
                      </span>
                      <span className="text-[11px] text-neutral-300 block">
                        {currentSizeObj.stock === 0
                          ? 'Currently out of stock in SA warehouse'
                          : currentSizeObj.stock <= 3
                          ? 'Fast-selling size · Reserve before stock runs out'
                          : 'In stock · Dispatches from SA within 24-48 hours'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider ${
                        currentSizeObj.stock === 0
                          ? 'bg-neutral-800 text-neutral-400'
                          : currentSizeObj.stock <= 3
                          ? 'bg-[#D81C2A] text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      {currentSizeObj.stock === 0
                        ? 'Sold Out'
                        : currentSizeObj.stock <= 3
                        ? `Only ${currentSizeObj.stock} left in SA!`
                        : `${currentSizeObj.stock} in stock`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Quantity</span>
              <div className="flex items-center border border-neutral-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center hover:bg-neutral-100 text-neutral-700 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 sm:w-12 text-center text-sm font-bold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(currentSizeObj?.stock || 5, quantity + 1))}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center hover:bg-neutral-100 text-neutral-700 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Add to Cart CTA with Signature Reebok Cut */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`w-full min-h-[50px] py-3.5 sm:py-4 text-center font-bold uppercase tracking-widest text-xs sm:text-sm transition-all duration-200 mb-4 reebok-cut flex items-center justify-center gap-2 shadow-sm ${
                isOutOfStock
                  ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  : isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#D81C2A] text-white hover:bg-black active:scale-[0.99]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" /> Added to Shopping Bag
                </>
              ) : isOutOfStock ? (
                'Sold Out in This Size'
              ) : (
                `Add to Cart · ${(product.priceZAR * quantity).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}`
              )}
            </button>

            {/* Authentic Trust Markers for South Africa */}
            <div className="space-y-2.5 sm:space-y-3 pt-4 border-t border-neutral-200 text-xs text-neutral-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#D81C2A] shrink-0" />
                <span>
                  <strong>Free Express Delivery</strong> on orders over R1,000 across SA
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>
                  <strong>Hassle-Free 30-Day Returns</strong> & size exchanges nationwide
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>
                  <strong>100% Guaranteed Authentic</strong> Reebok South Africa merchandise
                </span>
              </div>
            </div>

            {/* Interactive Product Query Section */}
            <div className="mt-6 pt-6 border-t border-neutral-200 bg-neutral-50 p-4 sm:p-6 reebok-cut border border-neutral-200">
              <h4 className="font-display uppercase text-base sm:text-lg font-bold text-neutral-900 mb-1.5">
                Have a question about this product?
              </h4>
              <p className="text-xs text-neutral-600 mb-3.5 leading-relaxed">
                Our Reebok SA product team will get back to you with sizing, stock, or technical advice.
              </p>

              {querySubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 text-xs font-medium reebok-cut">
                  ✓ Question received! We will email your answer shortly to <span className="font-bold">{queryEmail}</span>.
                </div>
              ) : queryStep === 'input' ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!queryText.trim()) return;
                    setQueryStep('email');
                  }}
                  className="space-y-3"
                >
                  <textarea
                    rows={3}
                    required
                    placeholder="Ask about sizing, fit, colorways, or performance..."
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    className="w-full text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black resize-none"
                  />
                  <button
                    type="submit"
                    className="min-h-[44px] bg-black text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#D81C2A] transition-colors reebok-cut"
                  >
                    Next: Enter Email
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!queryEmail.trim()) return;
                    setQuerySubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <div className="bg-white p-3 border border-neutral-300 text-xs text-neutral-700">
                    <span className="font-bold block mb-1">Your Question:</span>
                    <p className="italic text-neutral-900">"{queryText}"</p>
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address to receive answer..."
                    value={queryEmail}
                    onChange={(e) => setQueryEmail(e.target.value)}
                    className="w-full min-h-[44px] text-xs p-3 border border-neutral-300 bg-white outline-none focus:border-black"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="min-h-[44px] bg-[#D81C2A] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors reebok-cut"
                    >
                      Submit Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setQueryStep('input')}
                      className="min-h-[44px] bg-neutral-200 text-neutral-800 px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-neutral-300 transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications & Technology (Mobile view below purchasing container) */}
      <section className="lg:hidden max-w-[1400px] mx-auto px-4 sm:px-6 pt-8 border-t border-neutral-200 mt-8">
        <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wider mb-4 text-neutral-900 font-bold">
          Product Specifications & Technology
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-neutral-50 p-5 sm:p-8 reebok-cut border border-neutral-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Upper Engineering
            </span>
            <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.upper}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Midsole Cushioning
            </span>
            <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.midsole}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Outsole Traction
            </span>
            <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.outsole}</p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-1">
              Fit & Lacing
            </span>
            <p className="text-xs sm:text-sm text-neutral-800">{product.techSpecs.closure}</p>
          </div>
        </div>
      </section>

      {/* Verified Product Reviews Section (Available on both desktop & mobile) */}
      <div id="reviews-section">
        <ProductReviews product={product} />
      </div>

      {/* Cross-Sells Section: "This Goes Well With" (Accessories) */}
      {accessoryCrossSells.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 border-t border-neutral-200 mt-12 sm:mt-16">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Sparkles className="w-5 h-5 text-[#D81C2A]" />
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider font-bold text-neutral-900">
              This Goes Well With
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {accessoryCrossSells.map(acc => (
              <div
                key={acc.id}
                onClick={() => onSelectProduct(acc)}
                className="flex items-center gap-3 sm:gap-4 bg-neutral-50 p-3 sm:p-4 border border-neutral-200 hover:border-black transition-all cursor-pointer reebok-cut group"
              >
                <img
                  src={acc.image}
                  alt={acc.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover mix-blend-multiply bg-neutral-200 reebok-cut shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Accessory</span>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-[#D81C2A] transition-colors truncate">
                    {acc.name}
                  </h4>
                  <span className="text-xs sm:text-sm font-semibold text-neutral-800 tabular-nums">{acc.formattedPrice}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(acc, 'One Size', 1);
                  }}
                  title="Add to cart"
                  className="bg-black text-white w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-[#D81C2A] transition-colors reebok-cut shrink-0 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recommendations Carousel: "You May Also Like" */}
      {youMayAlsoLike.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 border-t border-neutral-200 mt-12 sm:mt-16">
          <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wider font-bold text-neutral-900 mb-6 sm:mb-8">
            You May Also Like
          </h3>
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 hide-scroll">
            {youMayAlsoLike.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="min-w-[180px] sm:min-w-[260px] max-w-[200px] sm:max-w-[280px] group cursor-pointer flex flex-col shrink-0"
              >
                <div className="relative bg-[#f5f6f8] aspect-square overflow-hidden mb-2.5 sm:mb-3 reebok-cut border border-neutral-200 group-hover:border-black transition-colors">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="product-img w-full h-full object-cover mix-blend-multiply"
                  />
                  {p.badge && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5">
                      {p.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-wider truncate">{p.category}</span>
                <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-[#D81C2A] transition-colors line-clamp-1 mb-1">
                  {p.name}
                </h4>
                <span className="text-xs sm:text-sm font-bold text-neutral-900 tabular-nums">{p.formattedPrice}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Buy Bar - Pattern C (Visible only on mobile screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] text-neutral-500 uppercase font-medium">
            UK Size {selectedSize}
          </span>
          <span className="font-display font-bold text-lg text-neutral-950 tabular-nums">
            {product.formattedPrice}
          </span>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`px-5 py-3 text-center font-bold uppercase tracking-wider text-xs transition-all reebok-cut flex items-center gap-2 shrink-0 ${
            isOutOfStock
              ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
              : isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#D81C2A] text-white active:scale-95'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Sizing Standards Modal (UK vs SA Explanations & Conversion Chart) */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        productName={product.name}
        category={product.category}
      />
    </div>
  );
};
