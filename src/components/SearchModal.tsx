import React, { useState } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const POPULAR_SEARCHES = [
  'Club C 85',
  'Nano X4',
  'FloatZig',
  'Classic Leather',
  'CrossFit Gym',
  'Accessories'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(p => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.franchise.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.colorway.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-2 sm:px-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white reebok-cut border-2 border-black shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-neutral-200 flex items-center gap-2.5 sm:gap-3 bg-neutral-50 shrink-0">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search Reebok products, models, technologies..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full text-base sm:text-sm outline-none bg-transparent text-neutral-900"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-xs uppercase font-bold text-neutral-500 hover:text-black shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!query && (
          <div className="p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              Popular Searches on Reebok.co.za
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white text-xs font-medium text-neutral-800 transition-colors reebok-cut-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="max-h-96 overflow-y-auto divide-y divide-neutral-100 p-2">
            {results.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 text-sm">
                No matching Reebok items found for "{query}". Try "Nano", "Club C", or "FloatZig".
              </div>
            ) : (
              results.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-3 flex items-center justify-between hover:bg-neutral-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover mix-blend-multiply bg-neutral-100 reebok-cut shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                        {p.category}
                      </span>
                      <h4 className="font-semibold text-sm text-neutral-900 group-hover:text-[#D81C2A] transition-colors truncate">
                        {p.name}
                      </h4>
                      <span className="text-xs font-bold text-neutral-800 tabular-nums">
                        {p.formattedPrice}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black shrink-0 ml-2" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
