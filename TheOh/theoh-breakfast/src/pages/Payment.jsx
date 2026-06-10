import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CreditCard, Smartphone, ShieldCheck, Loader2 } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import { formatINR } from '../utils/currency';

export function Payment() {
  const navigate = useNavigate();
  const { checkoutState } = useCheckout();
  const { totals, meal } = checkoutState;
  
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!meal) {
      navigate('/');
    }
  }, [meal, navigate]);

  if (!meal) return null;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate('/checkout/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-nutribowl-beige pb-32">
      <div className="sticky top-0 z-10 bg-nutribowl-beige/80 backdrop-blur-md border-b border-nutribowl-border/40 px-4 py-4 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          disabled={isProcessing}
          className="p-2 rounded-full bg-white border border-nutribowl-border/40 hover:bg-nutribowl-beige transition-colors disabled:opacity-50"
        >
          <ChevronLeft size={20} className="text-nutribowl-brown" />
        </button>
        <h1 className="font-black text-lg text-nutribowl-brown tracking-wide uppercase">Payment</h1>
      </div>

      <div className="max-w-xl mx-auto mt-8 px-4 space-y-6">
        
        {/* Amount to Pay */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#004700] rounded-3xl p-8 text-center text-white shadow-floating relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12" />
          
          <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">Amount to Pay</p>
          <h2 className="text-5xl font-black tracking-tight">{formatINR(totals.final)}</h2>
        </motion.div>

        {/* Secure Payment Note */}
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-nutribowl-muted uppercase tracking-wider">
          <ShieldCheck size={16} className="text-emerald-600" /> 100% Secure Payments
        </div>

        {/* Payment Methods */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-nutribowl-border/40 shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-nutribowl-border/30 bg-nutribowl-beige/30">
            <h3 className="font-black text-sm uppercase tracking-widest text-nutribowl-brown">Select Payment Method</h3>
          </div>

          <div className="p-2 space-y-2">
            {/* UPI Option */}
            <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'upi' ? 'border-[#004700] bg-[#E8F5E9]' : 'border-transparent hover:bg-nutribowl-beige/50'
            }`}>
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio" 
                  name="payment" 
                  value="upi" 
                  checked={selectedMethod === 'upi'}
                  onChange={() => setSelectedMethod('upi')}
                  className="w-5 h-5 accent-[#004700] cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-xl ${selectedMethod === 'upi' ? 'bg-white text-[#004700]' : 'bg-nutribowl-beige text-nutribowl-muted'}`}>
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="font-black text-nutribowl-brown text-sm">UPI (GPay, PhonePe, Paytm)</p>
                  <p className="text-[10px] font-bold uppercase text-nutribowl-muted mt-0.5 tracking-wider">Instant Payment</p>
                </div>
              </div>
            </label>

            {/* Cards Option */}
            <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'card' ? 'border-[#004700] bg-[#E8F5E9]' : 'border-transparent hover:bg-nutribowl-beige/50'
            }`}>
              <div className="relative flex items-center justify-center">
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={selectedMethod === 'card'}
                  onChange={() => setSelectedMethod('card')}
                  className="w-5 h-5 accent-[#004700] cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-xl ${selectedMethod === 'card' ? 'bg-white text-[#004700]' : 'bg-nutribowl-beige text-nutribowl-muted'}`}>
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-black text-nutribowl-brown text-sm">Credit / Debit Card</p>
                  <p className="text-[10px] font-bold uppercase text-nutribowl-muted mt-0.5 tracking-wider">Visa, Mastercard, RuPay</p>
                </div>
              </div>
            </label>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="pt-4">
          <button 
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-4 bg-[#004700] hover:bg-[#003300] disabled:bg-nutribowl-muted text-white rounded-full font-black text-sm uppercase tracking-widest shadow-floating active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Processing Payment...
              </>
            ) : (
              `Pay ${formatINR(totals.final)} Now`
            )}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
