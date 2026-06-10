import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';
import { oatsBreads } from '../data/oatsBreads'; // For meal selection

export function SubscriptionModal({ isOpen, onClose, plan, onAddToCart }) {
  const [selectedMeal, setSelectedMeal] = useState(oatsBreads[0].name);
  const [startDate, setStartDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]); // Default tomorrow
  const [qty, setQty] = useState(1);

  if (!isOpen || !plan) return null;

  const handleAdd = () => {
    onAddToCart(plan, selectedMeal, startDate, qty);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.5 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose} 
          className="absolute inset-0 bg-black backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          exit={{ opacity: 0, scale: 0.95, y: 20 }} 
          className="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-[#004700] p-6 text-white flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black">{plan.name}</h2>
              <p className="text-green-100 text-sm mt-1">{plan.durationDays} Days Duration</p>
            </div>
            <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Meal Selection */}
            <div>
              <label className="block text-sm font-bold text-nutribowl-muted uppercase tracking-wide mb-2">Select Your Meal</label>
              <select 
                value={selectedMeal} 
                onChange={(e) => setSelectedMeal(e.target.value)}
                className="w-full bg-nutribowl-beige border-none rounded-xl p-4 text-nutribowl-brown font-semibold focus:ring-2 focus:ring-[#004700] outline-none"
              >
                {oatsBreads.map(meal => (
                  <option key={meal.id} value={meal.name}>{meal.name}</option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-bold text-nutribowl-muted uppercase tracking-wide mb-2">Start Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-[#004700]" />
                </div>
                <input 
                  type="date" 
                  value={startDate} 
                  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Min tomorrow
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-nutribowl-beige border-none rounded-xl p-4 pl-12 text-nutribowl-brown font-semibold focus:ring-2 focus:ring-[#004700] outline-none"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-nutribowl-muted uppercase tracking-wide mb-2">Quantity (Per Day)</label>
              <div className="flex items-center gap-4 bg-nutribowl-beige w-max rounded-xl p-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-xl hover:bg-gray-50">-</button>
                <span className="w-8 text-center font-black text-xl text-nutribowl-brown">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 bg-[#004700] text-white rounded-lg flex items-center justify-center font-bold text-xl hover:bg-[#003300]">+</button>
              </div>
            </div>

            {/* Action */}
            <button 
              onClick={handleAdd}
              className="w-full bg-[#004700] text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-green-900/20 hover:scale-[1.02] transition-all"
            >
              Add to Cart - ₹{plan.discountedPrice * qty}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
