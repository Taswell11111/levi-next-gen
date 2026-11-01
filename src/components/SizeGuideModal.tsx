import React, { useState } from 'react';
import { X, Check, Ruler, Info, Sparkles, Footprints } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  category?: string;
  availableSizes?: string[];
  onSelectSize?: (size: string) => void;
}

const SIZE_CONVERSIONS = [
  { ukSa: '4', usMen: '5', usWomen: '6.5', eu: '36.5', cm: 23.0 },
  { ukSa: '5', usMen: '6', usWomen: '7.5', eu: '38.0', cm: 24.0 },
  { ukSa: '6', usMen: '7', usWomen: '8.5', eu: '39.0', cm: 25.0 },
  { ukSa: '7', usMen: '8', usWomen: '9.5', eu: '40.5', cm: 26.0 },
  { ukSa: '8', usMen: '9', usWomen: '10.5', eu: '42.0', cm: 27.0 },
  { ukSa: '9', usMen: '10', usWomen: '11.5', eu: '43.0', cm: 28.0 },
  { ukSa: '10', usMen: '11', usWomen: '12.5', eu: '44.5', cm: 29.0 },
  { ukSa: '11', usMen: '12', usWomen: '13.5', eu: '45.5', cm: 30.0 },
  { ukSa: '12', usMen: '13', usWomen: '14.5', eu: '47.0', cm: 31.0 },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  productName = 'Reebok Shoes',
  availableSizes = ['4', '5', '6', '7', '8', '9', '10', '11', '12'],
  onSelectSize
}) => {
  const [activeTab, setActiveTab] = useState<'finder' | 'standards' | 'chart' | 'measure'>('finder');

  // Size Finder interactive state
  const [footCm, setFootCm] = useState<number>(27.0);
  const [fitPreference, setFitPreference] = useState<'snug' | 'true' | 'roomy'>('true');

  if (!isOpen) return null;

  // Calculate recommended size based on cm
  const findRecommendedSize = () => {
    // Find closest conversion match
    const closest = SIZE_CONVERSIONS.reduce((prev, curr) => {
      return Math.abs(curr.cm - footCm) < Math.abs(prev.cm - footCm) ? curr : prev;
    });

    let targetUk = closest.ukSa;

    // Adjust for fit preference if availableSizes permits
    if (fitPreference === 'roomy' && footCm >= closest.cm) {
      const idx = SIZE_CONVERSIONS.findIndex(s => s.ukSa === closest.ukSa);
      if (idx < SIZE_CONVERSIONS.length - 1) {
        targetUk = SIZE_CONVERSIONS[idx + 1].ukSa;
      }
    } else if (fitPreference === 'snug' && footCm <= closest.cm - 0.5) {
      const idx = SIZE_CONVERSIONS.findIndex(s => s.ukSa === closest.ukSa);
      if (idx > 0) {
        targetUk = SIZE_CONVERSIONS[idx - 1].ukSa;
      }
    }

    // Ensure targetUk is in availableSizes if provided
    if (availableSizes && availableSizes.length > 0 && !availableSizes.includes(targetUk)) {
      // Find nearest available size
      const availableNums = availableSizes.map(s => Number(s)).filter(n => !isNaN(n));
      if (availableNums.length > 0) {
        const targetNum = Number(targetUk);
        const nearest = availableNums.reduce((prev, curr) => 
          Math.abs(curr - targetNum) < Math.abs(prev - targetNum) ? curr : prev
        );
        return String(nearest);
      }
    }

    return targetUk;
  };

  const recommendedSize = findRecommendedSize();

  const handleApplySize = () => {
    if (onSelectSize) {
      onSelectSize(recommendedSize);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto reebok-cut border-2 border-black shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 bg-neutral-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#D81C2A]" />
            <div>
              <h2 className="font-display uppercase tracking-wider text-base sm:text-lg font-bold">
                Reebok South Africa Size Guide & Size Finder
              </h2>
              <p className="text-[11px] text-neutral-400 font-sans">
                Find your perfect athletic fit for {productName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 sm:px-6 gap-2 pt-3 shrink-0 overflow-x-auto hide-scroll">
          <button
            type="button"
            onClick={() => setActiveTab('finder')}
            className={`pb-2.5 px-3 text-xs uppercase font-bold tracking-wider transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'finder'
                ? 'border-[#D81C2A] text-[#D81C2A] bg-red-50/50'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D81C2A]" />
            <span>Size Finder Tool</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('standards')}
            className={`pb-2.5 px-3 text-xs uppercase font-bold tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'standards'
                ? 'border-[#D81C2A] text-[#D81C2A]'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            UK vs. SA Standards
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chart')}
            className={`pb-2.5 px-3 text-xs uppercase font-bold tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'chart'
                ? 'border-[#D81C2A] text-[#D81C2A]'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            Conversion Chart
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('measure')}
            className={`pb-2.5 px-3 text-xs uppercase font-bold tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'measure'
                ? 'border-[#D81C2A] text-[#D81C2A]'
                : 'border-transparent text-neutral-600 hover:text-black'
            }`}
          >
            How to Measure
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-neutral-800 text-xs sm:text-sm">
          {activeTab === 'finder' && (
            <div className="space-y-6">
              <div className="bg-neutral-900 text-white p-4 sm:p-5 reebok-cut">
                <div className="flex items-center gap-2 mb-2">
                  <Footprints className="w-5 h-5 text-[#D81C2A]" />
                  <h3 className="font-display uppercase tracking-wider text-sm font-bold">
                    Interactive Size Finder
                  </h3>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Enter your foot length in centimeters and choose your preferred athletic fit. Our algorithm matches South African retail sizing standards for Reebok footwear.
                </p>
              </div>

              {/* Step 1: Foot Length Slider */}
              <div className="space-y-3 bg-neutral-50 p-4 sm:p-5 border border-neutral-200 reebok-cut-sm">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold uppercase tracking-wider text-xs text-neutral-900">
                    1. Your Foot Length (cm)
                  </span>
                  <span className="font-mono text-base font-bold text-[#D81C2A]">
                    {footCm.toFixed(1)} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="22.0"
                  max="31.0"
                  step="0.5"
                  value={footCm}
                  onChange={(e) => setFootCm(Number(e.target.value))}
                  className="w-full accent-[#D81C2A] cursor-pointer h-2 bg-neutral-300 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>22 cm (UK 4)</span>
                  <span>27 cm (UK 8)</span>
                  <span>31 cm (UK 12)</span>
                </div>
              </div>

              {/* Step 2: Fit Preference */}
              <div className="space-y-3 bg-neutral-50 p-4 sm:p-5 border border-neutral-200 reebok-cut-sm">
                <span className="font-bold uppercase tracking-wider text-xs text-neutral-900 block">
                  2. Preferred Athletic Fit
                </span>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setFitPreference('snug')}
                    className={`p-3 text-left border transition-all cursor-pointer reebok-cut-sm ${
                      fitPreference === 'snug'
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <span className="font-bold block text-xs uppercase">Snug Fit</span>
                    <span className="text-[10px] opacity-80 block mt-0.5">Locked-in sprint & training</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFitPreference('true')}
                    className={`p-3 text-left border transition-all cursor-pointer reebok-cut-sm ${
                      fitPreference === 'true'
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <span className="font-bold block text-xs uppercase">True to Size</span>
                    <span className="text-[10px] opacity-80 block mt-0.5">Standard athletic balance</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFitPreference('roomy')}
                    className={`p-3 text-left border transition-all cursor-pointer reebok-cut-sm ${
                      fitPreference === 'roomy'
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <span className="font-bold block text-xs uppercase">Roomy Fit</span>
                    <span className="text-[10px] opacity-80 block mt-0.5">Extra toe splay / thick socks</span>
                  </button>
                </div>
              </div>

              {/* Result Recommendation Card */}
              <div className="bg-red-50 border-2 border-[#D81C2A] p-5 reebok-cut flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] uppercase font-bold text-[#D81C2A] block tracking-widest mb-1">
                    Recommended Reebok SA / UK Size
                  </span>
                  <div className="font-display text-3xl font-extrabold text-neutral-950">
                    UK / SA {recommendedSize}
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Calculated for {footCm.toFixed(1)} cm foot length with {fitPreference} fit preference.
                  </p>
                </div>

                {onSelectSize && (
                  <button
                    type="button"
                    onClick={handleApplySize}
                    className="w-full sm:w-auto bg-[#D81C2A] hover:bg-black text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors reebok-cut shadow-md shrink-0 cursor-pointer"
                  >
                    Apply Size UK {recommendedSize}
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'standards' && (
            <div className="space-y-4">
              {/* Key Takeaway Callout */}
              <div className="bg-neutral-50 p-4 border border-neutral-300 reebok-cut">
                <div className="flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-[#D81C2A] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wide mb-1">
                      South African Sizing = UK Sizing (1:1 Exact Match)
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      In South Africa, footwear retail officially utilizes the <strong>United Kingdom (UK)</strong> sizing system.
                      Therefore, if you normally wear a <strong>South African Size 8</strong>, you should select <strong>UK 8</strong> on this website. There is no conversion needed between SA and UK shoe sizes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Franchise Specific Fit Notes */}
              <div>
                <h4 className="font-display uppercase text-base font-bold text-neutral-900 mb-3 tracking-wide">
                  Model Fit Recommendations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-50 border border-neutral-200">
                    <span className="font-bold text-neutral-900 block mb-0.5">Club C 85 & Classic Leather</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block mb-1">True to Size (TTS)</span>
                    <p className="text-neutral-600">
                      Supple garment leather will naturally break in and mold comfortably to your foot contours after 2–3 wears.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200">
                    <span className="font-bold text-neutral-900 block mb-0.5">Nano X4 & Nano 2.0 (Gym/CrossFit)</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block mb-1">True to Size / Wide Toe Box</span>
                    <p className="text-neutral-600">
                      Engineered with an anatomical wide toe box for solid barbell ground-splay and lateral stability during lifts.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200">
                    <span className="font-bold text-neutral-900 block mb-0.5">FloatZig 1 & Zig Kinetica</span>
                    <span className="text-amber-700 font-semibold text-[11px] block mb-1">True to Size / Performance Lock</span>
                    <p className="text-neutral-600">
                      Snug athletic midfoot lock. If you wear thick cushioned running socks or prefer a roomier toe gap, consider a half size up.
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-50 border border-neutral-200">
                    <span className="font-bold text-neutral-900 block mb-0.5">Classic Leather SP Platform (Women)</span>
                    <span className="text-emerald-700 font-semibold text-[11px] block mb-1">True to Size</span>
                    <p className="text-neutral-600">
                      Standard women's UK/SA sizing with elevated platform midsole cushioning for all-day comfort.
                    </p>
                  </div>
                </div>
              </div>

              {/* Free exchange note */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Hassle-Free Size Guarantee:</strong> If the size isn't 100% perfect, Reebok South Africa offers 30-day courier collections for free size exchanges nationwide.
                </span>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600">
                Compare your South African (UK) shoe size with US and European standards:
              </p>

              <div className="overflow-x-auto border border-neutral-200">
                <table className="w-full text-left text-xs divide-y divide-neutral-200">
                  <thead className="bg-neutral-900 text-white font-display uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3 font-bold bg-[#D81C2A]">UK / SA Size</th>
                      <th className="py-2.5 px-3">US Men</th>
                      <th className="py-2.5 px-3">US Women</th>
                      <th className="py-2.5 px-3">EU</th>
                      <th className="py-2.5 px-3">Foot (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 bg-white tabular-nums">
                    {SIZE_CONVERSIONS.map((row) => (
                      <tr key={row.ukSa} className="hover:bg-neutral-50">
                        <td className="py-2 px-3 font-bold text-neutral-950 bg-neutral-50/80">
                          UK {row.ukSa} (SA {row.ukSa})
                        </td>
                        <td className="py-2 px-3 text-neutral-700">{row.usMen}</td>
                        <td className="py-2 px-3 text-neutral-700">{row.usWomen}</td>
                        <td className="py-2 px-3 text-neutral-700">{row.eu}</td>
                        <td className="py-2 px-3 font-medium text-neutral-900">{row.cm} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'measure' && (
            <div className="space-y-4">
              <h4 className="font-display uppercase text-base font-bold text-neutral-900 tracking-wide">
                How to Measure Your Foot Length
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-neutral-700">
                <li>
                  <strong>Tape a piece of paper to the floor</strong> against a flat wall.
                </li>
                <li>
                  <strong>Stand barefoot</strong> with your heel resting gently against the wall.
                </li>
                <li>
                  <strong>Mark the longest point of your foot</strong> (usually your big toe or second toe) with a pencil.
                </li>
                <li>
                  <strong>Measure the distance</strong> from the edge of the paper to the pencil mark in centimeters (cm).
                </li>
                <li>
                  <strong>Repeat for your other foot</strong> and use the larger measurement when checking the chart above.
                </li>
              </ol>

              <div className="p-3 bg-neutral-100 border border-neutral-300 text-xs text-neutral-700">
                <strong>Pro Tip:</strong> Measure your feet towards the end of the day, as feet naturally swell slightly during daytime activity.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-neutral-500 font-mono">
            {productName}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="bg-black text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#D81C2A] transition-colors reebok-cut cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
