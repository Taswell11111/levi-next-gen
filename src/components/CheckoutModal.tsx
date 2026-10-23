import React, { useState } from 'react';
import { CartItem, CheckoutDetails } from '../types/store';
import { X, CheckCircle2, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

const SA_PROVINCES = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderNumber, setOrderNumber] = useState('');
  const [details, setDetails] = useState<CheckoutDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: 'Western Cape',
    postalCode: '',
    paymentMethod: 'ozow'
  });

  if (!isOpen) return null;

  const subtotalZAR = items.reduce((acc, item) => acc + item.product.priceZAR * item.quantity, 0);
  const shippingCostZAR = subtotalZAR >= 1000 ? 0 : 120;
  const totalZAR = subtotalZAR + shippingCostZAR;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `RBK-ZA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('success');
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white max-h-[95vh] sm:max-h-[90vh] overflow-y-auto reebok-cut border-2 border-black shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display uppercase tracking-widest text-base sm:text-lg font-bold">
              {step === 'form' ? 'Reebok South Africa Checkout' : 'Order Confirmed'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Delivery Details */}
            <div>
              <h3 className="font-display uppercase text-base sm:text-lg font-bold text-neutral-900 mb-3 sm:mb-4 pb-1 border-b border-neutral-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D81C2A]" /> 1. Nationwide Delivery Address (South Africa)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sindi Ndlovu"
                    value={details.fullName}
                    onChange={e => setDetails({ ...details, fullName: e.target.value })}
                    className="w-full border border-neutral-300 p-2.5 focus:border-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sindi@example.co.za"
                    value={details.email}
                    onChange={e => setDetails({ ...details, email: e.target.value })}
                    className="w-full border border-neutral-300 p-2.5 focus:border-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Mobile Phone Number (SA) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 82 123 4567"
                    value={details.phone}
                    onChange={e => setDetails({ ...details, phone: e.target.value })}
                    className="w-full border border-neutral-300 p-2.5 focus:border-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 42 Bree Street, Unit 4B"
                    value={details.address}
                    onChange={e => setDetails({ ...details, address: e.target.value })}
                    className="w-full border border-neutral-300 p-2.5 focus:border-black outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    City / Suburb *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cape Town, Sandton, Durban"
                    value={details.city}
                    onChange={e => setDetails({ ...details, city: e.target.value })}
                    className="w-full border border-neutral-300 p-2.5 focus:border-black outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Province *
                    </label>
                    <select
                      value={details.province}
                      onChange={e => setDetails({ ...details, province: e.target.value })}
                      className="w-full border border-neutral-300 p-2.5 focus:border-black outline-none bg-white text-xs"
                    >
                      {SA_PROVINCES.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 8001"
                      value={details.postalCode}
                      onChange={e => setDetails({ ...details, postalCode: e.target.value })}
                      className="w-full border border-neutral-300 p-2.5 focus:border-black outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method in South Africa */}
            <div>
              <h3 className="font-display uppercase text-lg font-bold text-neutral-900 mb-4 pb-1 border-b border-neutral-200">
                2. Secure South African Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                    details.paymentMethod === 'ozow'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">Ozow Instant EFT</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={details.paymentMethod === 'ozow'}
                      onChange={() => setDetails({ ...details, paymentMethod: 'ozow' })}
                      className="accent-black"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    FNB, Standard Bank, Absa, Nedbank, Capitec
                  </p>
                </label>

                <label
                  className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                    details.paymentMethod === 'payfast'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">PayFast Gateway</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={details.paymentMethod === 'payfast'}
                      onChange={() => setDetails({ ...details, paymentMethod: 'payfast' })}
                      className="accent-black"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Visa, Mastercard, Masterpass, Mobicred
                  </p>
                </label>

                <label
                  className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                    details.paymentMethod === 'card'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">Credit / Debit Card</span>
                    <input
                      type="radio"
                      name="payment"
                      checked={details.paymentMethod === 'card'}
                      onChange={() => setDetails({ ...details, paymentMethod: 'card' })}
                      className="accent-black"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Encrypted 3D Secure Verification
                  </p>
                </label>
              </div>
            </div>

            {/* Order Summary Strip */}
            <div className="bg-neutral-50 p-4 border border-neutral-200 space-y-2 text-sm">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                <span className="font-bold tabular-nums text-neutral-900">
                  {subtotalZAR.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Nationwide Shipping</span>
                <span className="font-bold tabular-nums text-neutral-900">
                  {shippingCostZAR === 0 ? 'FREE' : `R ${shippingCostZAR}.00 ZAR`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-neutral-200 font-bold">
                <span className="text-base text-neutral-900">Total Due (ZAR)</span>
                <span className="text-xl text-[#D81C2A] tabular-nums">
                  {totalZAR.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="w-full bg-[#D81C2A] text-white py-4 font-bold uppercase tracking-wider text-sm hover:bg-black transition-colors reebok-cut flex items-center justify-center gap-2"
            >
              <span>Confirm Order & Pay {totalZAR.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' })}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-3xl uppercase font-bold text-neutral-950 mb-1">
                Thank You for Your Order!
              </h3>
              <p className="text-sm text-neutral-600">
                Your Reebok order has been logged and confirmed for delivery across South Africa.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="max-w-md mx-auto reebok-cut bg-neutral-50 p-6 border border-neutral-200 text-left space-y-3">
              <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                <span className="text-xs uppercase font-bold text-neutral-500">Order Reference</span>
                <span className="font-mono text-base font-bold text-black">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                <span className="text-xs uppercase font-bold text-neutral-500">Customer</span>
                <span className="text-sm font-medium text-neutral-900">{details.fullName}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
                <span className="text-xs uppercase font-bold text-neutral-500">Destination</span>
                <span className="text-sm font-medium text-neutral-900">
                  {details.city}, {details.province} ({details.postalCode})
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase font-bold text-neutral-500">Estimated Delivery</span>
                <span className="text-sm font-bold text-[#D81C2A]">2–4 Business Days</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>A tracking notification will be dispatched via SMS & Email.</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="bg-black text-white px-8 py-3.5 font-bold uppercase tracking-wider text-xs hover:bg-[#D81C2A] transition-colors reebok-cut"
            >
              Continue Browsing Reebok.co.za
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
