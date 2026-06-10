import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Calendar, FileText, Minus, Plus } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import { calculateSubscriptionPrice } from '../utils/pricing';
import { formatINR } from '../utils/currency';

export function ConfigureSubscription() {
  const navigate = useNavigate();
  const { checkoutState, updateConfig } = useCheckout();
  const { meal, plan, config, totals } = checkoutState;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!meal || !plan) {
      navigate('/');
    }
  }, [meal, plan, navigate]);

  if (!meal || !plan) return null;

  // Handle Qty Change
  const handleQtyChange = (delta) => {
    const newQty = Math.max(1, config.qty + delta);
    const newTotals = calculateSubscriptionPrice(meal.price, plan.id, newQty);
    updateConfig({ qty: newQty }, newTotals);
  };

  // Get tomorrow's date string for input min
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleContinue = () => {
    if (!config.startDate || !config.address.trim()) {
      alert("Please select a start date and delivery address.");
      return;
    }
    navigate('/checkout/confirm');
  };

  return (
    <div className="min-h-screen bg-nutribowl-beige pb-32">
      {/* Top Nav */}
      <div className="sticky top-0 z-10 bg-nutribowl-beige/80 backdrop-blur-md border-b border-nutribowl-border/40 px-4 py-4 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white border border-nutribowl-border/40 hover:bg-nutribowl-beige transition-colors"
        >
          <ChevronLeft size={20} className="text-nutribowl-brown" />
        </button>
        <h1 className="font-black text-lg text-nutribowl-brown tracking-wide uppercase">Configure Plan</h1>
      </div>

      <div className="max-w-4xl mx-auto mt-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quantity */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm"
          >
            <h3 className="font-black text-base uppercase tracking-widest text-nutribowl-brown mb-4">Select Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-nutribowl-beige/50 border border-nutribowl-border/40 rounded-full p-1">
                <button 
                  onClick={() => handleQtyChange(-1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-nutribowl-brown shadow-sm active:scale-95 transition-all"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-black text-lg text-nutribowl-brown">{config.qty}</span>
                <button 
                  onClick={() => handleQtyChange(1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#004700] text-white shadow-sm active:scale-95 transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-sm text-nutribowl-muted font-medium">Meals delivered per day</p>
            </div>
          </motion.div>

          {/* Delivery Schedule */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-[#004700]" size={20} />
              <h3 className="font-black text-base uppercase tracking-widest text-nutribowl-brown">Start Date</h3>
            </div>
            <p className="text-xs text-nutribowl-muted mb-3">When should we start delivering your {plan.name}?</p>
            <input 
              type="date" 
              min={minDate}
              value={config.startDate}
              onChange={(e) => updateConfig({ startDate: e.target.value })}
              className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-nutribowl-border outline-none focus:border-[#004700] text-nutribowl-brown font-bold bg-white"
            />
          </motion.div>

          {/* Delivery Address */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-[#004700]" size={20} />
              <h3 className="font-black text-base uppercase tracking-widest text-nutribowl-brown">Delivery Address</h3>
            </div>
            <textarea 
              rows="3"
              placeholder="Enter your complete delivery address (Hyderabad only)..."
              value={config.address}
              onChange={(e) => updateConfig({ address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-nutribowl-border outline-none focus:border-[#004700] text-nutribowl-brown font-medium bg-white resize-none"
            />
          </motion.div>

          {/* Instructions */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-[#004700]" size={20} />
              <h3 className="font-black text-base uppercase tracking-widest text-nutribowl-brown">Delivery Instructions</h3>
            </div>
            <textarea 
              rows="2"
              placeholder="E.g., Leave at reception, call upon arrival..."
              value={config.instructions}
              onChange={(e) => updateConfig({ instructions: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-nutribowl-border outline-none focus:border-[#004700] text-nutribowl-brown font-medium bg-white resize-none"
            />
          </motion.div>

        </div>

        {/* Right Col: Live Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm sticky top-24"
          >
            <h3 className="font-black text-base uppercase tracking-widest text-nutribowl-brown mb-6 border-b border-nutribowl-border/30 pb-4">Live Summary</h3>
            
            <div className="flex gap-4 mb-6">
              <img src={meal.image} alt={meal.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h4 className="font-black text-nutribowl-brown text-sm line-clamp-2">{meal.name}</h4>
                <p className="text-xs font-bold text-nutribowl-muted uppercase mt-1">{plan.name}</p>
                <p className="text-xs font-bold text-[#004700] mt-0.5">Qty: {config.qty}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm border-b border-nutribowl-border/30 pb-4 mb-4">
              <div className="flex justify-between text-nutribowl-muted font-medium">
                <span>Meal Cost ({config.qty}x)</span>
                <span>{formatINR(meal.price * config.qty)}/day</span>
              </div>
              <div className="flex justify-between text-nutribowl-muted font-medium">
                <span>Duration</span>
                <span>{plan.duration} Days</span>
              </div>
              <div className="flex justify-between text-nutribowl-brown font-bold mt-2 pt-2 border-t border-nutribowl-border/20">
                <span>Original Total</span>
                <span>{formatINR(totals.original)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-[#E65100] font-bold">
                  <span>Plan Discount ({plan.discountPercentage}%)</span>
                  <span>- {formatINR(totals.discount)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="font-black text-lg text-nutribowl-brown uppercase tracking-wider">Total</span>
              <span className="font-black text-3xl text-[#004700]">{formatINR(totals.final)}</span>
            </div>

            <button 
              onClick={handleContinue}
              className="w-full py-4 bg-[#004700] hover:bg-[#003300] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-floating active:scale-95 transition-all"
            >
              Continue to Confirm
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
