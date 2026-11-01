import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, CATEGORIES, Product } from './data/products';
import { CartItem } from './types/store';
import { ReebokLogo } from './components/ReebokLogo';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { PersonalShopper } from './components/PersonalShopper';
import { CategoryTitle } from './components/CategoryTitle';
import { CheckoutModal } from './components/CheckoutModal';
import { SmollanAuditModal } from './components/SmollanAuditModal';
import { InteractiveStylingBoard } from './components/InteractiveStylingBoard';
import {
  Search,
  Heart,
  ShoppingBag,
  Bot,
  Truck,
  RotateCcw,
  ShieldCheck,
  Home,
  Award
} from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState<'home' | 'pdp'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial demo item matching concept
    const initialProd = PRODUCTS[0];
    return [
      { product: initialProd, size: '8', quantity: 1 }
    ];
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(['rbk-club-c-85-vintage', 'rbk-nano-x4-training']);

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [shopperOpen, setShopperOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [smollanAuditOpen, setSmollanAuditOpen] = useState<boolean>(false);
  const [interactiveBoardOpen, setInteractiveBoardOpen] = useState<boolean>(false);

  // Newsletter feedback state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Instant view alignment with horizontal slide transition
  const navigateToHome = (categoryFilter = 'all') => {
    setSlideDirection('left');
    setSelectedCategory(categoryFilter);
    setCurrentView('home');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (product: Product) => {
    setSlideDirection('right');
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo(0, 0);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, size);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
  };

  const handleClearCartOnOrder = () => {
    setCartItems([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Filtered products for home view
  const displayProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.tags.includes(selectedCategory));

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans">
      {/* Top Promotional Announcement Strip for South Africa - Responsive */}
      <div className="bg-[#111111] text-white py-1.5 sm:py-2 px-3 sm:px-4 text-center text-[10px] sm:text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-1.5 border-b border-neutral-800">
        <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D81C2A] shrink-0" />
        <span className="hidden sm:inline">
          FREE NATIONWIDE DELIVERY IN SOUTH AFRICA ON ORDERS OVER R1,000 ZAR · 30-DAY HASSLE-FREE RETURNS
        </span>
        <span className="sm:hidden">
          FREE SA DELIVERY OVER R1,000 · 30-DAY RETURNS
        </span>
      </div>

      {/* Main Navbar adhering strictly to Top Bar Contract */}
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark (One element, links to Home) */}
          <div
            onClick={() => navigateToHome('all')}
            className="cursor-pointer group flex items-center gap-2 sm:gap-3 shrink-0"
          >
            <ReebokLogo />
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-base tracking-wide uppercase text-neutral-900 shrink-0">
            <button
              type="button"
              onClick={() => navigateToHome('all')}
              className={`hover:text-[#D81C2A] transition-colors whitespace-nowrap ${
                currentView === 'home' && selectedCategory === 'all' ? 'text-[#D81C2A] font-bold border-b-2 border-[#D81C2A] pb-1' : ''
              }`}
            >
              Home Page
            </button>
            <button
              type="button"
              onClick={() => navigateToHome('men')}
              className={`hover:text-[#D81C2A] transition-colors whitespace-nowrap ${
                selectedCategory === 'men' && currentView === 'home' ? 'text-[#D81C2A] font-bold border-b-2 border-[#D81C2A] pb-1' : ''
              }`}
            >
              Men
            </button>
            <button
              type="button"
              onClick={() => navigateToHome('women')}
              className={`hover:text-[#D81C2A] transition-colors whitespace-nowrap ${
                selectedCategory === 'women' && currentView === 'home' ? 'text-[#D81C2A] font-bold border-b-2 border-[#D81C2A] pb-1' : ''
              }`}
            >
              Women
            </button>
            <button
              type="button"
              onClick={() => navigateToHome('classics')}
              className={`hover:text-[#D81C2A] transition-colors whitespace-nowrap ${
                selectedCategory === 'classics' && currentView === 'home' ? 'text-[#D81C2A] font-bold border-b-2 border-[#D81C2A] pb-1' : ''
              }`}
            >
              Classics
            </button>
            <button
              type="button"
              onClick={() => navigateToHome('sports')}
              className={`hover:text-[#D81C2A] transition-colors whitespace-nowrap ${
                selectedCategory === 'sports' && currentView === 'home' ? 'text-[#D81C2A] font-bold border-b-2 border-[#D81C2A] pb-1' : ''
              }`}
            >
              Sports & Training
            </button>
            <button
              type="button"
              onClick={() => navigateToHome('accessories')}
              className={`hover:text-[#D81C2A] transition-colors whitespace-nowrap ${
                selectedCategory === 'accessories' && currentView === 'home' ? 'text-[#D81C2A] font-bold border-b-2 border-[#D81C2A] pb-1' : ''
              }`}
            >
              Accessories
            </button>
          </nav>

          {/* Zone 3: Actions (Desktop & Mobile Touch Targets >= 44px) */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Smollan Audit Comparison Trigger */}
            <button
              type="button"
              onClick={() => setSmollanAuditOpen(true)}
              className="flex items-center gap-1.5 bg-[#D81C2A] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider reebok-cut-sm hover:bg-black transition-colors shrink-0 shadow-sm"
              title="View Smollan Audit Report Comparison"
            >
              <Award className="w-4 h-4 text-red-200" />
              <span className="hidden sm:inline">Smollan Audit: 66 → 96/100</span>
              <span className="sm:hidden">Audit</span>
            </button>

            {/* Signature Personal Shopper Trigger on Desktop */}
            <button
              type="button"
              onClick={() => setShopperOpen(prev => !prev)}
              className="hidden md:flex items-center gap-2 cursor-pointer group text-neutral-800 hover:text-[#D81C2A] transition-colors px-3 py-1.5 border border-neutral-300 hover:border-black reebok-cut-sm bg-neutral-50"
              title="Personal Shopper AI"
            >
              <Bot className="w-4 h-4 text-[#D81C2A]" />
              <span className="font-display uppercase text-xs tracking-wider font-bold">
                How Can I Help You Shop?
              </span>
            </button>

            {/* Search Trigger (Desktop only; on mobile search is accessible via bottom navigation bar) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex min-h-[44px] min-w-[44px] items-center justify-center text-neutral-800 hover:text-[#D81C2A] transition-colors"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger (Desktop only; on mobile wishlist is accessible via bottom navigation bar) */}
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className="hidden lg:flex min-h-[44px] min-w-[44px] items-center justify-center text-neutral-800 hover:text-[#D81C2A] transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-2 right-2 bg-[#D81C2A] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Cart Trigger (Desktop only; on mobile cart is accessible via bottom navigation bar) */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="hidden lg:flex min-h-[44px] min-w-[44px] items-center justify-center text-neutral-800 hover:text-[#D81C2A] transition-colors relative"
              aria-label="View cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-2 right-2 bg-[#D81C2A] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center tabular-nums">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Smooth Left/Right Horizontal Page Slide Transition */}
      <main className="flex-1 pb-20 lg:pb-0 overflow-x-hidden relative">
        <AnimatePresence mode="wait" initial={false}>
          {currentView === 'pdp' && selectedProduct ? (
            <motion.div
              key={`pdp-${selectedProduct.id}`}
              initial={{ x: slideDirection === 'right' ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection === 'right' ? '-100%' : '100%', opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <ProductDetail
                product={selectedProduct}
                onBack={() => navigateToHome('all')}
                onSelectProduct={navigateToProduct}
                onAddToCart={handleAddToCart}
                isWishlisted={wishlistIds.includes(selectedProduct.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home-view"
              initial={{ x: slideDirection === 'left' ? '-100%' : '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: slideDirection === 'left' ? '100%' : '-100%', opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* HOME VIEW */}
              <div className="space-y-12 sm:space-y-20">
            {/* Storefront Hero with Responsive Typography and Viewport Presence */}
            <section className="relative h-[65vh] sm:h-[75vh] min-h-[460px] sm:min-h-[550px] w-full bg-neutral-950 overflow-hidden flex items-end">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=2000&q=80"
                alt="Reebok South Africa Heritage & Training Campaign"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity filter contrast-125"
              />
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 pb-8 sm:pb-16 md:pb-24 w-full z-10">
                <span className="text-[#D81C2A] font-display font-bold uppercase tracking-widest text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2 block">
                  Official Reebok South Africa
                </span>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase leading-[0.92] max-w-4xl tracking-tight mb-3 sm:mb-4 text-balance">
                  A Legend Returning <br />To The Game
                </h1>
                <p className="font-display text-base sm:text-xl md:text-2xl text-neutral-300 uppercase tracking-wide mb-6 sm:mb-8">
                  Garment Leather · Built To Last A Lifetime
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => navigateToHome('classics')}
                    className="w-full sm:w-auto bg-white text-black px-6 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-[#D81C2A] hover:text-white transition-colors reebok-cut text-center"
                  >
                    Shop Classics Collection
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateToHome('sports')}
                    className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-white hover:text-black transition-colors reebok-cut text-center"
                  >
                    Explore Nano X4 Training
                  </button>
                </div>
              </div>
            </section>

            {/* Category / Interactive Filter Tabs with Smooth Mobile Touch Scroll */}
            <section className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-2">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 sm:pb-4 flex-wrap gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scroll pb-1 w-full sm:w-auto">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`min-h-[40px] px-3.5 sm:px-4 py-2 text-xs uppercase font-bold tracking-wider transition-all whitespace-nowrap reebok-cut-sm shrink-0 ${
                        selectedCategory === cat.id
                          ? 'bg-black text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <span className="hidden sm:inline text-xs font-mono text-neutral-500 uppercase">
                  Showing {selectedCategory === 'all' ? PRODUCTS.length : displayProducts.length} authentic Reebok items
                </span>
              </div>
            </section>

            {/* If 'all' category is selected, show distinct sections with 2-column mobile layout and clear spacing */}
            {selectedCategory === 'all' ? (
              <div className="space-y-16 sm:space-y-24">
                {/* 1. Trending Now */}
                <motion.section 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1600px] mx-auto px-4 sm:px-6"
                >
                  <div className="flex justify-between items-end mb-4 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4">
                    <CategoryTitle title="Trending Now" />
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('trending')}
                      className="uppercase font-bold tracking-wide text-xs hover:text-[#D81C2A] transition-colors"
                    >
                      Shop All
                    </button>
                  </div>
                  {/* 2 columns on mobile, 4 on desktop */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                    {PRODUCTS.filter(p => p.tags.includes('trending')).slice(0, 4).map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={navigateToProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
                      />
                    ))}
                  </div>
                </motion.section>

                {/* 2. Classics */}
                <motion.section 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1600px] mx-auto px-4 sm:px-6"
                >
                  <div className="flex justify-between items-end mb-4 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4">
                    <CategoryTitle title="Classics" />
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('classics')}
                      className="uppercase font-bold tracking-wide text-xs hover:text-[#D81C2A] transition-colors"
                    >
                      Shop All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                    {PRODUCTS.filter(p => p.tags.includes('classics')).slice(0, 4).map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={navigateToProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
                      />
                    ))}
                  </div>
                </motion.section>

                {/* 3. Sports & Training */}
                <motion.section 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1600px] mx-auto px-4 sm:px-6"
                >
                  <div className="flex justify-between items-end mb-4 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4">
                    <CategoryTitle title="Sports & Training" />
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('sports')}
                      className="uppercase font-bold tracking-wide text-xs hover:text-[#D81C2A] transition-colors"
                    >
                      Shop All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                    {PRODUCTS.filter(p => p.tags.includes('sports')).slice(0, 4).map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={navigateToProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
                      />
                    ))}
                  </div>
                </motion.section>

                {/* 4. Men's */}
                <motion.section 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1600px] mx-auto px-4 sm:px-6"
                >
                  <div className="flex justify-between items-end mb-4 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4">
                    <CategoryTitle title="Men's" />
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('men')}
                      className="uppercase font-bold tracking-wide text-xs hover:text-[#D81C2A] transition-colors"
                    >
                      Shop All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                    {PRODUCTS.filter(p => p.tags.includes('men')).slice(0, 4).map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={navigateToProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
                      />
                    ))}
                  </div>
                </motion.section>

                {/* 5. Women's */}
                <motion.section 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1600px] mx-auto px-4 sm:px-6"
                >
                  <div className="flex justify-between items-end mb-4 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4">
                    <CategoryTitle title="Women's" />
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('women')}
                      className="uppercase font-bold tracking-wide text-xs hover:text-[#D81C2A] transition-colors"
                    >
                      Shop All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                    {PRODUCTS.filter(p => p.tags.includes('women')).slice(0, 4).map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={navigateToProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
                      />
                    ))}
                  </div>
                </motion.section>

                {/* 6. Accessories */}
                <motion.section 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[1600px] mx-auto px-4 sm:px-6"
                >
                  <div className="flex justify-between items-end mb-4 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4">
                    <CategoryTitle title="Accessories" />
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('accessories')}
                      className="uppercase font-bold tracking-wide text-xs hover:text-[#D81C2A] transition-colors"
                    >
                      Shop All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                    {PRODUCTS.filter(p => p.tags.includes('accessories')).slice(0, 4).map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={navigateToProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
                      />
                    ))}
                  </div>
                </motion.section>
              </div>
            ) : (
              /* Filtered single category view */
              <motion.section 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-8"
              >
                <div className="mb-4 sm:mb-8 border-b border-neutral-200 pb-3 sm:pb-4">
                  <CategoryTitle title={CATEGORIES.find(c => c.id === selectedCategory)?.label || selectedCategory} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
                  {displayProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={navigateToProduct}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlistIds.includes(product.id)}
                      onQuickAdd={(prod, size) => handleAddToCart(prod, size, 1)}
                    />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Campaign Banner: Nano X4 Benchmark Spotlight */}
            <section className="max-w-[1600px] mx-auto px-4 sm:px-6">
              <div className="bg-neutral-900 text-white reebok-cut overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-neutral-800">
                <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center">
                  <span className="text-[#D81C2A] text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2">
                    Performance Benchmark
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-none mb-3 sm:mb-4 text-balance">
                    Engineered for CrossFit & High-Intensity Lifts
                  </h2>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">
                    The Nano series has dominated training floors for over a decade. The new Nano X4 features the Lift and Run (L.A.R.) Chassis plate system for solid barbell stability and soft cushioning for sprint intervals.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        const nanoProd = PRODUCTS.find(p => p.franchise === 'Nano');
                        if (nanoProd) navigateToProduct(nanoProd);
                      }}
                      className="w-full sm:w-auto bg-[#D81C2A] text-white px-6 sm:px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-white hover:text-black transition-colors reebok-cut text-center"
                    >
                      Discover Nano X4
                    </button>
                    <span className="text-xs text-neutral-400 font-mono">From R 2,499.00 ZAR</span>
                  </div>
                </div>

                <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-full">
                  <img
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80"
                    alt="Nano Training Performance"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80"
                  />
                  {/* Center blur overlay (scaled responsively) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-40 h-28 sm:w-64 sm:h-40 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl" />
                  </div>
                </div>
              </div>
            </section>

            {/* South African Trust Pillars */}
            <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8 sm:py-10 border-y border-neutral-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-neutral-100 reebok-cut shrink-0">
                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#D81C2A]" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-base sm:text-lg font-bold text-neutral-900 mb-0.5 sm:mb-1">
                      Nationwide Delivery
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Free shipping on all South Africa orders over R1,000 ZAR. Dispatched directly to JHB, CPT, Durban, and all regional centres.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-neutral-100 reebok-cut shrink-0">
                    <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-[#D81C2A]" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-base sm:text-lg font-bold text-neutral-900 mb-0.5 sm:mb-1">
                      30-Day Easy Returns
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Need a different UK size? Convenient courier collection and exchanges available nationwide without stress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-neutral-100 reebok-cut shrink-0">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#D81C2A]" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-base sm:text-lg font-bold text-neutral-900 mb-0.5 sm:mb-1">
                      Authentic Reebok Gear
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Direct from Reebok South Africa with full manufacturer warranty and secure payment processing via Ozow and PayFast.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </main>

      {/* Footer strictly adhering to the concept & anti-slop rules */}
      <footer className="bg-[#111111] text-white pt-12 sm:pt-16 pb-24 lg:pb-12 mt-12 sm:mt-16 border-t border-neutral-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24">
          {/* Products Column */}
          <div>
            <h4 className="font-display uppercase text-lg sm:text-xl mb-4 sm:mb-6 tracking-wide font-bold">PRODUCTS</h4>
            <ul className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm text-neutral-300 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => navigateToHome('classics')}
                  className="hover:text-white transition-colors"
                >
                  Classics & Club C 85
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToHome('sports')}
                  className="hover:text-white transition-colors"
                >
                  Nano Training Shoes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToHome('sports')}
                  className="hover:text-white transition-colors"
                >
                  FloatZig & Running
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateToHome('accessories')}
                  className="hover:text-white transition-colors"
                >
                  Accessories & Bags
                </button>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-display uppercase text-lg sm:text-xl mb-4 sm:mb-6 tracking-wide font-bold">SUPPORT</h4>
            <ul className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm text-neutral-300 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => setShopperOpen(true)}
                  className="hover:text-white transition-colors text-left"
                >
                  Personal Shopper / Size Advice
                </button>
              </li>
              <li>
                <span className="text-neutral-400">South Africa Shipping & Returns</span>
              </li>
              <li>
                <span className="text-neutral-400">Track Nationwide Order</span>
              </li>
              <li>
                <span className="text-neutral-400">Authorized SA Retailers</span>
              </li>
            </ul>
          </div>

          {/* Join The Club Column with Working Form */}
          <div>
            <h4 className="font-display uppercase text-lg sm:text-xl mb-4 sm:mb-6 tracking-wide font-bold">JOIN THE CLUB</h4>
            <p className="text-xs sm:text-sm text-neutral-300 mb-4 sm:mb-6 leading-relaxed font-medium">
              Sign up for exclusive South African releases, member access, and 20% off your first online order.
            </p>
            {newsletterSubscribed ? (
              <div className="bg-neutral-800 text-emerald-400 p-3 text-xs font-semibold reebok-cut">
                ✓ Check your inbox! Your 20% discount code has been sent.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-end border-b border-neutral-600 pb-2.5 sm:pb-3 focus-within:border-white transition-colors">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-xs sm:text-sm text-white placeholder-neutral-500"
                />
                <button
                  type="submit"
                  className="font-bold uppercase tracking-wider text-xs hover:text-[#D81C2A] transition-colors whitespace-nowrap pl-4"
                >
                  SIGN UP
                </button>
              </form>
            )}
            <p className="text-[11px] text-neutral-500 mt-2.5 sm:mt-3">
              Official Reebok South Africa digital storefront · Currency: ZAR (R)
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Currency */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3 sm:gap-4">
          <p>© {new Date().getFullYear()} Reebok South Africa. All Rights Reserved. Remixed Digital Model.</p>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
            <span>South Africa (ZAR R)</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </footer>

      {/* Fixed Mobile Bottom Tab Bar - Pattern 1 (Visible only when in Home view on mobile) */}
      {currentView === 'home' && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 grid grid-cols-5 items-center h-16 pb-safe shadow-lg">
          <button
            type="button"
            onClick={() => navigateToHome('all')}
            className={`flex flex-col items-center justify-center gap-1 py-1 transition-colors ${
              currentView === 'home' && selectedCategory === 'all' ? 'text-[#D81C2A]' : 'text-neutral-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Home</span>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 text-neutral-600 hover:text-black transition-colors"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Search</span>
          </button>

          <button
            type="button"
            onClick={() => setWishlistOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 text-neutral-600 hover:text-black transition-colors relative"
          >
            <div className="relative">
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#D81C2A] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">Saved</span>
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 text-neutral-600 hover:text-black transition-colors relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#D81C2A] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center tabular-nums">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider">Bag</span>
          </button>

          <button
            type="button"
            onClick={() => setShopperOpen(true)}
            className="flex flex-col items-center justify-center gap-1 py-1 text-[#D81C2A] transition-colors"
          >
            <Bot className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Shopper</span>
          </button>
        </nav>
      )}

      {/* Slide-over Shopping Bag Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setCheckoutOpen(true)}
        onOpenInteractiveBoard={() => setInteractiveBoardOpen(true)}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={navigateToProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={navigateToProduct}
      />

      {/* Personal Shopper AI Assistant */}
      <PersonalShopper
        isOpen={shopperOpen}
        onClose={() => setShopperOpen(false)}
        onSelectProduct={navigateToProduct}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleClearCartOnOrder}
      />

      {/* Smollan Audit Scorecard Modal */}
      <SmollanAuditModal
        isOpen={smollanAuditOpen}
        onClose={() => setSmollanAuditOpen(false)}
      />

      {/* Interactive Cart Products Styling Board */}
      <InteractiveStylingBoard
        isOpen={interactiveBoardOpen}
        onClose={() => setInteractiveBoardOpen(false)}
        cartItems={cartItems}
        onSelectProduct={navigateToProduct}
      />
    </div>
  );
}
