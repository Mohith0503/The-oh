import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Calendar, ArrowRight, Package } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import confetti from 'canvas-confetti';

export function Success() {
  const navigate = useNavigate();
  const { checkoutState, resetCheckout } = useCheckout();
  const { meal, plan, config } = checkoutState;
  
  // Create a snapshot of the state so it survives the reset
  const [snapshot] = useState({ meal, plan, config });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // If we reach here without a valid state snapshot, redirect home
    if (!snapshot.meal) {
      navigate('/');
      return;
    }

    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Reset the checkout state context so the cart/flow is empty for next time
    resetCheckout();

    return () => clearInterval(interval);
  }, [navigate, resetCheckout, snapshot]);

  if (!snapshot.meal) return null;

  const orderId = `SUB-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };

  return (
    <div className="min-h-screen bg-nutribowl-beige flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-premium overflow-hidden text-center"
      >
        <div className="bg-[#004700] p-10 pb-16 relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-floating z-10 relative">
            <Check size={40} className="text-[#004700]" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight relative z-10">Subscription Active!</h1>
          <p className="text-white/80 text-sm mt-2 font-medium relative z-10">Your healthy mornings are sorted.</p>
        </div>

        <div className="px-8 pt-0 pb-10 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-nutribowl-border/30 mb-8 text-left space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-nutribowl-muted mb-1">Subscription ID</p>
              <p className="font-black text-nutribowl-brown text-lg">{orderId}</p>
            </div>
            <div className="h-px bg-nutribowl-border/40"></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-nutribowl-muted mb-1">Plan Details</p>
              <p className="font-bold text-nutribowl-brown text-sm">{snapshot.plan.name} ({snapshot.plan.duration} Days)</p>
              <p className="text-xs text-nutribowl-muted mt-0.5">{snapshot.meal.name} x{snapshot.config.qty}</p>
            </div>
            <div className="h-px bg-nutribowl-border/40"></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-nutribowl-muted mb-2 flex items-center gap-1.5">
                <Calendar size={14} className="text-[#004700]" /> First Delivery
              </p>
              <p className="font-black text-[#004700] text-base">
                {new Date(snapshot.config.startDate).toLocaleDateString('en-US', dateOptions)}
              </p>
              <p className="text-[10px] text-nutribowl-muted font-bold uppercase tracking-wider mt-1">Between 7:00 AM - 9:00 AM</p>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => navigate('/my-subscriptions')}
              className="w-full py-4 bg-[#004700] hover:bg-[#003300] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Package size={18} /> Manage Subscription
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full py-4 bg-transparent border border-nutribowl-border/60 hover:bg-nutribowl-beige text-nutribowl-brown rounded-full font-bold text-sm uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Back to Home <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
