import React from 'react';
import { Minus, Plus } from 'lucide-react';

export function QuantitySelector({ quantity, onChange, size = 'md' }) {
  const isSm = size === 'sm';
  
  return (
    <div className="flex items-center gap-3 bg-nutribowl-beige border border-nutribowl-border/80 rounded-full p-1 shadow-sm select-none">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className={`flex items-center justify-center rounded-full bg-white hover:bg-nutribowl-lightOrange text-nutribowl-brown hover:text-nutribowl-orange disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-nutribowl-brown shadow-sm transition-all active:scale-90 ${
          isSm ? 'w-7 h-7' : 'w-9 h-9'
        }`}
        aria-label="Decrease quantity"
      >
        <Minus size={isSm ? 12 : 15} strokeWidth={2.5} />
      </button>
      
      <span className={`font-black text-nutribowl-brown text-center min-w-5 ${
        isSm ? 'text-sm' : 'text-base'
      }`}>
        {quantity}
      </span>

      <button
        onClick={() => onChange(quantity + 1)}
        className={`flex items-center justify-center rounded-full bg-white hover:bg-nutribowl-lightOrange text-nutribowl-brown hover:text-nutribowl-orange shadow-sm transition-all active:scale-90 ${
          isSm ? 'w-7 h-7' : 'w-9 h-9'
        }`}
        aria-label="Increase quantity"
      >
        <Plus size={isSm ? 12 : 15} strokeWidth={2.5} />
      </button>
    </div>
  );
}
