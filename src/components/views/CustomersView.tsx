'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';
import { Search, ChevronDown, User, Shield, CreditCard, DollarSign, Calendar, Clock, X, ArrowUpDown, Mail } from 'lucide-react';

export const CustomersView: React.FC = () => {
  const { customers, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<'all' | 'Free' | 'Pro' | 'Enterprise'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'csat' | 'conversationsCount'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Modal/Drawer details
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Sorting handler
  const handleSort = (field: 'name' | 'csat' | 'conversationsCount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Filter & Sort customers
  const filteredCustomers = customers
    .filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                            c.email.toLowerCase().includes(search.toLowerCase());
      const matchesPlan = planFilter === 'all' || c.plan === planFilter;
      return matchesSearch && matchesPlan;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'csat') {
        comparison = a.csat - b.csat;
      } else if (sortBy === 'conversationsCount') {
        comparison = a.conversationsCount - b.conversationsCount;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {(['all', 'Free', 'Pro', 'Enterprise'] as const).map((plan) => (
            <button
              key={plan}
              onClick={() => setPlanFilter(plan)}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-colors ${
                planFilter === plan
                  ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-850'
              }`}
            >
              {plan === 'all' ? 'All Plans' : plan}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-850 text-zinc-400 dark:text-zinc-500 font-semibold bg-zinc-50/50 dark:bg-zinc-900/10">
                <th className="py-3.5 px-6 font-semibold cursor-pointer select-none" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1.5 hover:text-zinc-600 dark:hover:text-zinc-300">
                    Customer
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3.5 px-4 font-semibold">Email</th>
                <th className="py-3.5 px-4 font-semibold">Subscription Plan</th>
                <th className="py-3.5 px-4 font-semibold cursor-pointer select-none" onClick={() => handleSort('conversationsCount')}>
                  <div className="flex items-center gap-1.5 hover:text-zinc-600 dark:hover:text-zinc-300">
                    Conversations
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3.5 px-4 font-semibold">Last Active</th>
                <th className="py-3.5 px-4 font-semibold cursor-pointer select-none" onClick={() => handleSort('csat')}>
                  <div className="flex items-center gap-1.5 hover:text-zinc-600 dark:hover:text-zinc-300">
                    CSAT
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-3.5 px-6 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-6 flex items-center gap-3">
                    <img
                      src={cust.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                    />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {cust.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-500 dark:text-zinc-400 font-medium">
                    {cust.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                      cust.plan === 'Enterprise'
                        ? 'text-violet-600 dark:text-violet-400'
                        : cust.plan === 'Pro'
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}>
                      <CreditCard className="w-3.5 h-3.5 shrink-0" />
                      {cust.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-zinc-700 dark:text-zinc-300">
                    {cust.conversationsCount} tickets
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 dark:text-zinc-500 font-medium">
                    {cust.lastActive}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-zinc-700 dark:text-zinc-300">
                    ⭐️ {cust.csat.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      cust.status === 'active'
                        ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20'
                        : 'text-zinc-400 bg-zinc-100 dark:text-zinc-500 dark:bg-zinc-900'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs"
            onClick={() => setSelectedCustomer(null)}
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-55 flex flex-col h-full animate-fade-in p-5 space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCustomer.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                />
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                    {selectedCustomer.name}
                  </h3>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block mt-1.5">
                    ID: {selectedCustomer.id}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Statistics info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-850/50 flex flex-col">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">Subscription</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-300 mt-1 flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-500" />
                  {selectedCustomer.plan}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-850/50 flex flex-col">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">Lifetime LTV</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-300 mt-1 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                  {selectedCustomer.ltv}
                </span>
              </div>
            </div>

            {/* Metadata Fields */}
            <div className="space-y-3.5 text-xs">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Details Metadata
              </span>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-300">{selectedCustomer.email}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Customer Since
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-300">{selectedCustomer.customerSince}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last Active
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-300">{selectedCustomer.lastActive}</span>
              </div>
            </div>

            {/* Customer Activity Log Timeline */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Activity Logs
              </span>
              <div className="relative border-l-2 border-zinc-100 dark:border-zinc-900 pl-4 ml-1 space-y-4 text-xs">
                {selectedCustomer.activityLog.length === 0 ? (
                  <div className="text-zinc-400 dark:text-zinc-500">No logs on file</div>
                ) : (
                  selectedCustomer.activityLog.map((log) => (
                    <div key={log.id} className="relative">
                      <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-full border-2 border-white dark:border-zinc-955" />
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">{log.date}</span>
                      <p className="text-zinc-650 dark:text-zinc-300 font-medium mt-1 leading-relaxed">{log.action}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Simulated Action Block */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex gap-2">
              <button
                onClick={() => addToast(`Outbound email queued to ${selectedCustomer.email}`, 'success')}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Send Email
              </button>
              <button
                onClick={() => addToast('Simulated credits applied to invoice ledger', 'success')}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                Apply Credit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
