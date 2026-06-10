import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import { formatINR } from '../utils/currency';

export function OrderConfirmation() {
  const navigate = useNavigate();
  const { checkoutState } = useCheckout();
  const { meal, plan, config, totals } = checkoutState;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!meal || !plan || !config.startDate) {
      navigate('/');
    }
  }, [meal, plan, config.startDate, navigate]);

  if (!meal) return null;

  // Calculate End Date
  const start = new Date(config.startDate);
  const end = new Date(start);
  end.setDate(start.getDate() + plan.duration - 1); // e.g., duration 1 means start and end are the same
  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };

  return (
    <div className="min-h-screen bg-nutribowl-beige pb-32">
      <div className="sticky top-0 z-10 bg-nutribowl-beige/80 backdrop-blur-md border-b border-nutribowl-border/40 px-4 py-4 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white border border-nutribowl-border/40 hover:bg-nutribowl-beige transition-colors"
        >
          <ChevronLeft size={20} className="text-nutribowl-brown" />
        </button>
        <h1 className="font-black text-lg text-nutribowl-brown tracking-wide uppercase">Review Order</h1>
      </div>

      <div className="max-w-2xl mx-auto mt-8 px-4 space-y-6">
        
        {/* Success Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-3xl p-6 text-center"
        >
          <CheckCircle2 size={40} className="text-[#004700] mx-auto mb-3" />
          <h2 className="text-xl font-black text-[#004700] uppercase tracking-wider">Almost There!</h2>
          <p className="text-sm text-[#004700]/80 mt-1 font-medium">Please review your subscription details before payment.</p>
        </motion.div>

        {/* Order Details */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-nutribowl-border/40 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-nutribowl-border/30 flex gap-4">
            <img src={meal.image} alt={meal.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm" />
            <div>
              <h3 className="font-black text-lg text-nutribowl-brown line-clamp-1">{meal.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-[#E8F5E9] text-[#004700] px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest">{plan.name}</span>
                <span className="text-xs font-bold text-nutribowl-muted">Qty: {config.qty}</span>
              </div>
              <p className="text-xs text-nutribowl-muted mt-2 font-medium line-clamp-1">{meal.desc}</p>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-nutribowl-beige/20">
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-nutribowl-muted mb-2">
                <Calendar size={14} /> Schedule
              </p>
              <p className="font-bold text-sm text-nutribowl-brown">Starts: {start.toLocaleDateString('en-US', dateOptions)}</p>
              <p className="font-bold text-sm text-nutribowl-brown mt-1">Ends: {end.toLocaleDateString('en-US', dateOptions)}</p>
              <p className="text-xs text-nutribowl-muted mt-1">({plan.duration} Deliveries)</p>
            </div>
            
            <div>
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-nutribowl-muted mb-2">
                <MapPin size={14} /> Delivery
              </p>
              <p className="font-bold text-sm text-nutribowl-brown line-clamp-3">{config.address}</p>
              {config.instructions && (
                <p className="text-xs text-nutribowl-muted mt-2 italic">"{config.instructions}"</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Price Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl border border-nutribowl-border/40 shadow-sm p-6"
        >
          <h3 className="font-black text-base uppercase tracking-widest text-nutribowl-brown mb-4 border-b border-nutribowl-border/30 pb-4">Payment Summary</h3>
          
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between text-nutribowl-muted font-medium">
              <span>{meal.name} (x{config.qty})</span>
              <span>{formatINR(meal.price * config.qty)}/day</span>
            </div>
            <div className="flex justify-between text-nutribowl-muted font-medium">
              <span>Duration</span>
              <span>{plan.duration} Days</span>
            </div>
            <div className="flex justify-between text-nutribowl-brown font-bold mt-2 pt-2 border-t border-nutribowl-border/20">
              <span>Subtotal</span>
              <span>{formatINR(totals.original)}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-[#E65100] font-bold">
                <span>Plan Savings</span>
                <span>- {formatINR(totals.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-nutribowl-muted font-medium">
              <span>Delivery Fee</span>
              <span className="text-[#004700] font-bold">FREE</span>
            </div>
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-nutribowl-border/30 mb-8">
            <span className="font-black text-xl text-nutribowl-brown uppercase tracking-wider">Total to Pay</span>
            <span className="font-black text-4xl text-[#004700]">{formatINR(totals.final)}</span>
          </div>

          <button 
            onClick={() => navigate('/checkout/payment')}
            className="w-full py-4 bg-[#004700] hover:bg-[#003300] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-floating active:scale-95 transition-all"
          >
            Proceed to Payment
          </button>
        </motion.div>

      </div>
    </div>
  );
}
