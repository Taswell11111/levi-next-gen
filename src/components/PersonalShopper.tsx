import React, { useState } from 'react';
import { Product, PRODUCTS } from '../data/products';
import { ChatMessage } from '../types/store';
import { Bot, X, Send, Sparkles, ArrowRight } from 'lucide-react';

interface PersonalShopperProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'shopper',
    text: "Molo & Sawubona! I'm your Reebok South Africa Personal Shopper. Looking for iconic Club C tennis classics, Nano gym trainers, FloatZig runners, or sizing advice for South Africa?",
    timestamp: 'Just now'
  }
];

const QUICK_QUESTIONS = [
  { text: 'Which shoes are best for CrossFit or gym lifting?', query: 'crossfit gym' },
  { text: 'What is the difference between Club C 85 and Classic Leather?', query: 'club c classic leather' },
  { text: 'How does Reebok UK sizing fit?', query: 'sizing' },
  { text: 'Best shoe for road running and 10k races?', query: 'running' }
];

export const PersonalShopper: React.FC<PersonalShopperProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Provide authentic, accurate guidance based on real Reebok products
    setTimeout(() => {
      let reply = '';
      let suggestedIds: string[] = [];
      const lower = query.toLowerCase();

      if (lower.includes('crossfit') || lower.includes('gym') || lower.includes('lifting') || lower.includes('weight')) {
        reply = "For CrossFit and functional training, the Nano X4 is the gold standard! It features the L.A.R. Chassis plate that locks down for heavy barbell squats and softens for box jumps and sprints. The Nano 2.0 Heritage is also loved for its wider toe box.";
        suggestedIds = ['rbk-nano-x4-training', 'rbk-nano-2-heritage'];
      } else if (lower.includes('running') || lower.includes('runner') || lower.includes('road') || lower.includes('jog') || lower.includes('10k')) {
        reply = "For road running and daily mileage, check out the FloatZig 1. It pairs high-rebound Floatride Energy Foam with geometric Zig geometry for smooth propulsion. For everyday fitness runs, the Energen Tech Plus is also great.";
        suggestedIds = ['rbk-floatzig-1-running', 'rbk-energen-tech-plus'];
      } else if (lower.includes('club c') || lower.includes('classic leather') || lower.includes('difference')) {
        reply = "Both are timeless 80s icons! The Club C 85 is an authentic tennis court shoe with a sleek low cupsole and minimalist lines. The Classic Leather 1983 features a slightly taller bi-density EVA running midsole and supple garment leather.";
        suggestedIds = ['rbk-club-c-85-vintage', 'rbk-classic-leather-1983'];
      } else if (lower.includes('sizing') || lower.includes('size') || lower.includes('fit') || lower.includes('uk')) {
        reply = "Reebok South Africa uses standard UK sizing. Club C 85 and Classic Leather generally run true to size (TTS). If you have wide feet, Nano models (especially Nano 2.0 and Nano X4) have an anatomical wide toe box designed for comfort!";
        suggestedIds = ['rbk-club-c-85-vintage', 'rbk-nano-x4-training'];
      } else if (lower.includes('women') || lower.includes('platform')) {
        reply = "For women's streetwear, the Classic Leather SP Extra Platform gives you exaggerated height with genuine cushion, and the Club C 85 Vintage is an everyday favorite.";
        suggestedIds = ['rbk-classic-leather-sp-extra', 'rbk-club-c-85-vintage'];
      } else {
        reply = "Our top picks in South Africa right now are the Club C 85 Vintage, Nano X4 Cross-Trainer, and FloatZig 1. Check out these favorites:";
        suggestedIds = ['rbk-club-c-85-vintage', 'rbk-nano-x4-training', 'rbk-floatzig-1-running'];
      }

      const botMsg: ChatMessage = {
        id: `s-${Date.now()}`,
        sender: 'shopper',
        text: reply,
        suggestedProductIds: suggestedIds,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden transition-opacity"
      />

      {/* Assistant Modal / Bottom Sheet on Mobile, Floating Widget on Desktop */}
      <div className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6 md:w-96 max-h-[90vh] md:max-h-none bg-white border-t-2 md:border-2 border-black shadow-2xl z-50 flex flex-col rounded-t-2xl md:rounded-none md:reebok-cut transition-all duration-300">
        {/* Mobile Drag Indicator Handle */}
        <div className="md:hidden w-10 h-1 bg-neutral-300 rounded-full mx-auto my-2" />

        {/* Header */}
        <div className="bg-black text-white p-3.5 sm:p-4 flex justify-between items-center rounded-t-xl md:rounded-none">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#D81C2A]" />
            <span className="font-display uppercase tracking-wider text-sm font-bold">
              Reebok Personal Shopper
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="p-3 sm:p-4 h-72 sm:h-80 overflow-y-auto bg-neutral-50 flex flex-col gap-3 text-xs">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`p-3 max-w-[88%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-black text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                    : 'bg-white text-neutral-900 border border-neutral-200 rounded-tr-lg rounded-br-lg rounded-bl-lg shadow-2xs'
                }`}
              >
                {m.text}
              </div>

              {/* Product Suggestions in chat */}
              {m.suggestedProductIds && m.suggestedProductIds.length > 0 && (
                <div className="mt-2 flex flex-col gap-1.5 w-full max-w-[95%]">
                  <span className="text-[10px] font-bold uppercase text-neutral-400">
                    Recommended Products:
                  </span>
                  {m.suggestedProductIds.map(id => {
                    const prod = PRODUCTS.find(p => p.id === id);
                    if (!prod) return null;
                    return (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onSelectProduct(prod);
                          onClose();
                        }}
                        className="flex items-center justify-between p-2 bg-white border border-neutral-200 hover:border-black cursor-pointer transition-colors group reebok-cut-sm"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 object-cover mix-blend-multiply bg-neutral-100 shrink-0"
                          />
                          <div className="truncate">
                            <p className="font-semibold text-neutral-900 group-hover:text-[#D81C2A] transition-colors truncate">
                              {prod.name}
                            </p>
                            <span className="text-[10px] font-bold text-neutral-600">{prod.formattedPrice}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black shrink-0 ml-1" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 p-3 bg-white border border-neutral-200 w-max rounded-lg text-neutral-500">
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-3 py-2 bg-neutral-100 border-t border-neutral-200 flex gap-1.5 overflow-x-auto hide-scroll">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(q.text)}
              className="text-[10px] whitespace-nowrap bg-white border border-neutral-300 hover:border-black px-2.5 py-1.5 text-neutral-800 transition-colors shrink-0 rounded-xs"
            >
              {q.text}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-3 border-t border-neutral-200 bg-white pb-safe">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center border border-neutral-300 p-1.5 focus-within:border-black transition-colors"
          >
            <input
              type="text"
              placeholder="Ask about shoes, gym fit, sizes..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full text-xs outline-none bg-transparent px-2 text-neutral-900"
            />
            <button
              type="submit"
              className="min-h-[36px] min-w-[36px] flex items-center justify-center text-black hover:text-[#D81C2A] transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
