import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Pause, Play, X, Download, TrendingUp, 
  Calendar, Users, DollarSign, Package, ChevronDown, ChevronUp 
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

// Rich mock data for admin subscription management
const mockAdminSubscriptions = [
  {
    id: 'SUB-001',
    customerName: 'Rahul Sharma',
    phone: '+919876543210',
    planName: '7 Day Plan',
    planId: 'plan_weekly',
    meal: 'All Mix Oats (Fruits & Nuts)',
    startDate: '2026-06-10',
    endDate: '2026-06-16',
    status: 'active',
    price: 899,
    qty: 1,
    createdAt: '2026-06-09T08:30:00Z',
  },
  {
    id: 'SUB-002',
    customerName: 'Priya Patel',
    phone: '+919988776655',
    planName: '30 Day Plan',
    planId: 'plan_monthly',
    meal: 'High Protein Oats Chocolate',
    startDate: '2026-06-05',
    endDate: '2026-07-04',
    status: 'active',
    price: 3499,
    qty: 1,
    createdAt: '2026-06-04T10:15:00Z',
  },
  {
    id: 'SUB-003',
    customerName: 'Arjun Reddy',
    phone: '+919123456789',
    planName: '7 Day Plan',
    planId: 'plan_weekly',
    meal: 'Dry Fruits Oats',
    startDate: '2026-06-08',
    endDate: '2026-06-14',
    status: 'paused',
    price: 899,
    qty: 2,
    createdAt: '2026-06-07T14:00:00Z',
  },
  {
    id: 'SUB-004',
    customerName: 'Sneha Iyer',
    phone: '+919012345678',
    planName: 'Next Day Pre-Order',
    planId: 'plan_tomorrow',
    meal: 'Muesli',
    startDate: '2026-06-10',
    endDate: '2026-06-10',
    status: 'active',
    price: 149,
    qty: 1,
    createdAt: '2026-06-09T06:00:00Z',
  },
  {
    id: 'SUB-005',
    customerName: 'Vikram Mehta',
    phone: '+919876501234',
    planName: '30 Day Plan',
    planId: 'plan_monthly',
    meal: 'Fruit Oats',
    startDate: '2026-05-15',
    endDate: '2026-06-13',
    status: 'active',
    price: 3499,
    qty: 1,
    createdAt: '2026-05-14T09:00:00Z',
  },
  {
    id: 'SUB-006',
    customerName: 'Meera Joshi',
    phone: '+919876123456',
    planName: '7 Day Plan',
    planId: 'plan_weekly',
    meal: 'Plain Oats (Soaked/Boiled)',
    startDate: '2026-06-01',
    endDate: '2026-06-07',
    status: 'cancelled',
    price: 899,
    qty: 1,
    createdAt: '2026-05-31T20:00:00Z',
  },
];

function StatusPill({ status }) {
  const config = {
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    paused: 'bg-amber-50 text-amber-700 border-amber-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${config[status] || config.active}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'active' ? 'bg-emerald-500' : status === 'paused' ? 'bg-amber-500' : 'bg-red-500'
      }`} />
      {status}
    </span>
  );
}

export function AdminSubscriptionsTab() {
  const [subscriptions, setSubscriptions] = useState(mockAdminSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Filtered list
  const filtered = useMemo(() => {
    return subscriptions.filter(sub => {
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesSearch = 
        sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.phone.includes(searchTerm);
      const matchesDate = !dateFilter || sub.startDate === dateFilter;
      return matchesStatus && matchesSearch && matchesDate;
    });
  }, [subscriptions, searchTerm, statusFilter, dateFilter]);

  // MRR Calculation
  const mrr = useMemo(() => {
    return subscriptions
      .filter(s => s.status === 'active')
      .reduce((sum, s) => {
        if (s.planId === 'plan_monthly') return sum + (s.price * s.qty);
        if (s.planId === 'plan_weekly') return sum + (s.price * s.qty * 4.3); // weekly to monthly
        return sum + (s.price * s.qty * 30); // daily to monthly
      }, 0);
  }, [subscriptions]);

  const activeCount = subscriptions.filter(s => s.status === 'active').length;
  const pausedCount = subscriptions.filter(s => s.status === 'paused').length;
  const totalRevenue = subscriptions.filter(s => s.status !== 'cancelled').reduce((sum, s) => sum + s.price * s.qty, 0);

  // Generate upcoming deliveries for today and next 6 days
  const upcomingDeliveries = useMemo(() => {
    const today = new Date();
    const deliveries = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() + i * 86400000);
      const dateStr = date.toISOString().split('T')[0];
      const subsForDay = subscriptions.filter(s => {
        if (s.status !== 'active') return false;
        return dateStr >= s.startDate && dateStr <= s.endDate;
      });
      deliveries.push({ date: dateStr, day: date.toLocaleDateString('en-IN', { weekday: 'short' }), count: subsForDay.length, subs: subsForDay });
    }
    return deliveries;
  }, [subscriptions]);

  const handlePause = (id) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'paused' } : s));
  };

  const handleResume = (id) => {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'active' } : s));
  };

  const handleCancel = (id) => {
    if (!window.confirm('Are you sure you want to cancel this subscription?')) return;
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Customer', 'Phone', 'Plan', 'Meal', 'Start', 'End', 'Status', 'Price', 'Qty'].join(','),
      ...filtered.map(s => [s.id, s.customerName, s.phone, s.planName, s.meal, s.startDate, s.endDate, s.status, s.price, s.qty].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutribowl_subscriptions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* MRR and Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-nutribowl-muted uppercase tracking-wider">Monthly Recurring Revenue</p>
            <h3 className="text-2xl font-black text-[#004700] mt-1">{formatINR(Math.round(mrr))}</h3>
          </div>
          <div className="bg-[#E8F5E9] text-[#004700] p-3 rounded-2xl">
            <TrendingUp size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-nutribowl-muted uppercase tracking-wider">Active Subscriptions</p>
            <h3 className="text-2xl font-black text-nutribowl-brown mt-1">{activeCount}</h3>
          </div>
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl">
            <Users size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-nutribowl-muted uppercase tracking-wider">Paused</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{pausedCount}</h3>
          </div>
          <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl">
            <Pause size={20} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-nutribowl-muted uppercase tracking-wider">Total Sub Revenue</p>
            <h3 className="text-2xl font-black text-nutribowl-brown mt-1">{formatINR(totalRevenue)}</h3>
          </div>
          <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      {/* Upcoming Deliveries Timeline */}
      <div className="bg-white p-6 rounded-3xl border border-nutribowl-border/40 shadow-sm">
        <div className="flex items-center gap-2 mb-5 border-b border-nutribowl-border/25 pb-3">
          <Calendar size={18} className="text-[#004700]" />
          <h4 className="font-black text-base text-nutribowl-brown uppercase">Upcoming Deliveries (Next 7 Days)</h4>
        </div>
        <div className="grid grid-cols-7 gap-3">
          {upcomingDeliveries.map((d, i) => (
            <div key={d.date} className={`text-center p-4 rounded-2xl border transition-all ${
              i === 0 ? 'bg-[#E8F5E9] border-[#A5D6A7]' : 'bg-nutribowl-beige/50 border-nutribowl-border/30'
            }`}>
              <p className="text-[10px] uppercase font-bold text-nutribowl-muted tracking-wider">{d.day}</p>
              <p className="text-xs font-medium text-nutribowl-muted mt-0.5">{new Date(d.date).getDate()}</p>
              <p className="text-2xl font-black text-[#004700] mt-2">{d.count}</p>
              <p className="text-[9px] uppercase font-bold text-nutribowl-muted tracking-wider mt-1">deliveries</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-nutribowl-border/40 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-nutribowl-muted">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search by name, ID, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-nutribowl-border bg-white text-sm outline-none focus:border-[#004700] focus:ring-1 focus:ring-[#E8F5E9] font-medium"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold border border-nutribowl-border text-nutribowl-brown outline-none focus:border-[#004700]"
          />
          {['all', 'active', 'paused', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border capitalize transition-all ${
                statusFilter === status 
                  ? 'bg-[#004700] border-[#004700] text-white shadow-sm' 
                  : 'bg-white border-nutribowl-border text-nutribowl-brown hover:border-[#004700]/30'
              }`}
            >
              {status}
            </button>
          ))}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-[#004700] text-[#004700] bg-[#E8F5E9] hover:bg-[#C8E6C9] transition-colors"
          >
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 border border-nutribowl-border/40 text-center">
          <Package className="mx-auto text-nutribowl-muted mb-4" size={40} />
          <h4 className="font-black text-lg text-nutribowl-brown">No subscriptions found</h4>
          <p className="text-sm text-nutribowl-muted mt-1">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => (
            <motion.div
              key={sub.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-nutribowl-border/40 shadow-sm overflow-hidden"
            >
              {/* Row */}
              <div className="p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#004700] font-black text-xs">
                    {sub.customerName.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-black text-nutribowl-brown text-sm">{sub.customerName}</h4>
                      <StatusPill status={sub.status} />
                    </div>
                    <p className="text-xs text-nutribowl-muted mt-0.5 truncate">
                      <span className="font-bold text-nutribowl-brown">{sub.planName}</span> · {sub.meal} · x{sub.qty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 flex-shrink-0 text-xs">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-nutribowl-muted uppercase font-bold tracking-wider">Period</p>
                    <p className="font-bold text-nutribowl-brown">{sub.startDate} → {sub.endDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-nutribowl-muted uppercase font-bold tracking-wider">Amount</p>
                    <p className="font-black text-[#004700] text-base">{formatINR(sub.price * sub.qty)}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {sub.status === 'active' && (
                      <button onClick={() => handlePause(sub.id)} className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 hover:bg-amber-100 transition-colors" title="Pause">
                        <Pause size={14} />
                      </button>
                    )}
                    {sub.status === 'paused' && (
                      <button onClick={() => handleResume(sub.id)} className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 transition-colors" title="Resume">
                        <Play size={14} />
                      </button>
                    )}
                    {sub.status !== 'cancelled' && (
                      <button onClick={() => handleCancel(sub.id)} className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 transition-colors" title="Cancel">
                        <X size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                      className="p-2 rounded-xl border border-nutribowl-border/40 hover:bg-nutribowl-beige transition-colors"
                    >
                      {expandedId === sub.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedId === sub.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-nutribowl-beige/50 border-t border-nutribowl-border/30 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="font-bold text-nutribowl-muted uppercase tracking-wider text-[10px] mb-1">Subscription ID</p>
                        <p className="font-black text-nutribowl-brown">{sub.id}</p>
                      </div>
                      <div>
                        <p className="font-bold text-nutribowl-muted uppercase tracking-wider text-[10px] mb-1">Phone</p>
                        <a href={`tel:${sub.phone}`} className="font-bold text-blue-600 hover:underline">{sub.phone}</a>
                      </div>
                      <div>
                        <p className="font-bold text-nutribowl-muted uppercase tracking-wider text-[10px] mb-1">Created</p>
                        <p className="font-bold text-nutribowl-brown">{new Date(sub.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                      </div>
                      <div>
                        <p className="font-bold text-nutribowl-muted uppercase tracking-wider text-[10px] mb-1">Duration</p>
                        <p className="font-bold text-nutribowl-brown">
                          {Math.ceil((new Date(sub.endDate).getTime() - new Date(sub.startDate).getTime()) / 86400000) + 1} days
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
