import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Pause, Play, X, SkipForward, ChevronRight, 
  Package, Clock, ArrowLeft, AlertCircle 
} from 'lucide-react';
import { formatINR } from '../utils/currency';

// Mock data for user's subscriptions
const initialSubscriptions = [
  {
    id: 'sub_1',
    planName: '7 Day Plan',
    planId: 'plan_weekly',
    meal: 'All Mix Oats (Fruits & Nuts)',
    startDate: '2026-06-10',
    endDate: '2026-06-16',
    status: 'active',
    price: 899,
    qty: 1,
    deliveries: [
      { date: '2026-06-10', status: 'upcoming', meal: 'All Mix Oats (Fruits & Nuts)' },
      { date: '2026-06-11', status: 'upcoming', meal: 'All Mix Oats (Fruits & Nuts)' },
      { date: '2026-06-12', status: 'upcoming', meal: 'All Mix Oats (Fruits & Nuts)' },
      { date: '2026-06-13', status: 'upcoming', meal: 'All Mix Oats (Fruits & Nuts)' },
      { date: '2026-06-14', status: 'upcoming', meal: 'All Mix Oats (Fruits & Nuts)' },
      { date: '2026-06-15', status: 'upcoming', meal: 'All Mix Oats (Fruits & Nuts)' },
      { date: '2026-06-16', status: 'upcoming', meal: 'All Mix Oats (Fruits & Nuts)' },
    ]
  },
  {
    id: 'sub_2',
    planName: '30 Day Plan',
    planId: 'plan_monthly',
    meal: 'High Protein Oats Chocolate',
    startDate: '2026-06-05',
    endDate: '2026-07-04',
    status: 'active',
    price: 3499,
    qty: 1,
    deliveries: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(new Date('2026-06-05').getTime() + i * 86400000).toISOString().split('T')[0],
      status: i < 4 ? 'delivered' : 'upcoming',
      meal: 'High Protein Oats Chocolate',
    }))
  }
];

function StatusBadge({ status }) {
  const config = {
    active: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    paused: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    cancelled: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' },
  };
  const c = config[status] || config.active;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${c.bg} ${c.text} border ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}

export function MySubscriptions() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [expandedId, setExpandedId] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // { id, action }

  const handlePause = (id) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'paused' } : s));
    setConfirmAction(null);
  };

  const handleResume = (id) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'active' } : s));
  };

  const handleCancel = (id) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
    setConfirmAction(null);
  };

  const handleSkipDay = (subId, date) => {
    setSubscriptions(prev => prev.map(s => {
      if (s.id !== subId) return s;
      return {
        ...s,
        deliveries: s.deliveries.map(d => d.date === date ? { ...d, status: 'skipped' } : d)
      };
    }));
  };

  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const pausedCount = subscriptions.filter(s => s.status === 'paused').length;

  return (
    <div className="bg-nutribowl-beige min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#004700] via-[#005500] to-[#003300] text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-36 -mt-36" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        <div className="max-w-5xl mx-auto relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-green-200 text-sm font-medium mb-4 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">My Subscriptions</h1>
          <p className="text-green-100/70 mt-2 text-sm">Manage your breakfast delivery schedules</p>
          
          <div className="flex gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/10">
              <p className="text-2xl font-black">{activeCount}</p>
              <p className="text-xs text-green-200 font-medium">Active</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/10">
              <p className="text-2xl font-black">{pausedCount}</p>
              <p className="text-xs text-green-200 font-medium">Paused</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscriptions List */}
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {subscriptions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-[#E8F5E9] flex items-center justify-center mx-auto mb-6">
              <Package size={32} className="text-[#004700]" />
            </div>
            <h3 className="text-xl font-bold text-nutribowl-brown mb-2">No subscriptions yet</h3>
            <p className="text-nutribowl-muted text-sm mb-6">Start subscribing and never worry about breakfast again.</p>
            <button onClick={() => navigate('/subscriptions')} className="bg-[#004700] text-white px-6 py-3 rounded-full font-bold hover:bg-[#003300] transition-colors">
              Browse Plans
            </button>
          </div>
        ) : (
          subscriptions.map((sub) => (
            <motion.div
              key={sub.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-nutribowl-border/40 shadow-premium overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-nutribowl-brown">{sub.planName}</h3>
                    <StatusBadge status={sub.status} />
                  </div>
                  <p className="text-sm text-nutribowl-muted font-medium">
                    <span className="text-nutribowl-brown font-semibold">{sub.meal}</span> · Qty: {sub.qty}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-nutribowl-muted">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {sub.startDate} → {sub.endDate}</span>
                    <span className="font-black text-[#004700] text-base">{formatINR(sub.price)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {sub.status === 'active' && (
                    <button 
                      onClick={() => setConfirmAction({ id: sub.id, action: 'pause' })}
                      className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors"
                    >
                      <Pause size={14} /> Pause
                    </button>
                  )}
                  {sub.status === 'paused' && (
                    <button 
                      onClick={() => handleResume(sub.id)}
                      className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors"
                    >
                      <Play size={14} /> Resume
                    </button>
                  )}
                  {sub.status !== 'cancelled' && (
                    <button 
                      onClick={() => setConfirmAction({ id: sub.id, action: 'cancel' })}
                      className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors"
                    >
                      <X size={14} /> Cancel
                    </button>
                  )}
                  <button
                    onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                    className={`p-2 rounded-xl border border-nutribowl-border/40 hover:bg-nutribowl-beige transition-all ${expandedId === sub.id ? 'bg-nutribowl-beige rotate-90' : ''}`}
                  >
                    <ChevronRight size={16} className="text-nutribowl-muted transition-transform" />
                  </button>
                </div>
              </div>

              {/* Expanded Delivery Schedule */}
              <AnimatePresence>
                {expandedId === sub.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-nutribowl-border/30 bg-nutribowl-beige/50 p-6">
                      <h4 className="text-sm font-bold text-nutribowl-brown uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Clock size={14} /> Delivery Schedule
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {sub.deliveries.map((delivery) => {
                          const dayName = new Date(delivery.date).toLocaleDateString('en-IN', { weekday: 'short' });
                          const dayNum = new Date(delivery.date).getDate();
                          const month = new Date(delivery.date).toLocaleDateString('en-IN', { month: 'short' });
                          
                          return (
                            <div key={delivery.date} className={`rounded-2xl p-3 text-center border transition-all ${
                              delivery.status === 'delivered' ? 'bg-emerald-50 border-emerald-200' :
                              delivery.status === 'skipped' ? 'bg-gray-100 border-gray-200 opacity-50' :
                              'bg-white border-nutribowl-border/30 hover:border-[#004700]/40'
                            }`}>
                              <p className="text-[10px] uppercase font-bold text-nutribowl-muted tracking-wider">{dayName}</p>
                              <p className="text-lg font-black text-nutribowl-brown">{dayNum}</p>
                              <p className="text-[10px] text-nutribowl-muted font-medium">{month}</p>
                              <div className="mt-2">
                                {delivery.status === 'delivered' && (
                                  <span className="text-[9px] font-bold text-emerald-600 uppercase">Delivered</span>
                                )}
                                {delivery.status === 'skipped' && (
                                  <span className="text-[9px] font-bold text-gray-400 uppercase">Skipped</span>
                                )}
                                {delivery.status === 'upcoming' && sub.status === 'active' && (
                                  <button
                                    onClick={() => handleSkipDay(sub.id, delivery.date)}
                                    className="text-[9px] font-bold text-amber-600 uppercase hover:text-amber-800 flex items-center justify-center gap-0.5 mx-auto"
                                  >
                                    <SkipForward size={9} /> Skip
                                  </button>
                                )}
                                {delivery.status === 'upcoming' && sub.status !== 'active' && (
                                  <span className="text-[9px] font-bold text-nutribowl-muted uppercase">—</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </section>

      {/* Confirm Action Modal */}
      <AnimatePresence>
        {confirmAction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setConfirmAction(null)} className="absolute inset-0 bg-black" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center z-10"
            >
              <div className={`w-16 h-16 rounded-full ${confirmAction.action === 'cancel' ? 'bg-red-50' : 'bg-amber-50'} flex items-center justify-center mx-auto mb-4`}>
                <AlertCircle size={28} className={confirmAction.action === 'cancel' ? 'text-red-500' : 'text-amber-500'} />
              </div>
              <h3 className="text-xl font-black text-nutribowl-brown mb-2">
                {confirmAction.action === 'cancel' ? 'Cancel Subscription?' : 'Pause Subscription?'}
              </h3>
              <p className="text-sm text-nutribowl-muted mb-6">
                {confirmAction.action === 'cancel' 
                  ? 'This will stop all remaining deliveries. You can re-subscribe anytime.' 
                  : 'Deliveries will be paused until you resume. No charges during pause.'}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmAction(null)} className="flex-1 py-3 rounded-xl border border-nutribowl-border/40 font-bold text-nutribowl-muted hover:bg-nutribowl-beige transition-colors">
                  Keep It
                </button>
                <button 
                  onClick={() => confirmAction.action === 'cancel' ? handleCancel(confirmAction.id) : handlePause(confirmAction.id)}
                  className={`flex-1 py-3 rounded-xl font-bold text-white transition-colors ${
                    confirmAction.action === 'cancel' ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'
                  }`}
                >
                  {confirmAction.action === 'cancel' ? 'Yes, Cancel' : 'Yes, Pause'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
