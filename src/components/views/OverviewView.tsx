'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Zap, Clock, Smile, Award, TrendingUp, Sparkles, UserCheck } from 'lucide-react';
import { Conversation } from '../../types';

export const OverviewView: React.FC = () => {
  const { conversations, setActiveTab, setActiveConversationId } = useApp();

  // Metrics
  const stats = [
    { label: "Total Conversations", value: "1,248", change: "+18.4% this month", trend: "up", icon: MessageSquare, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
    { label: "AI Resolved", value: "842", change: "+24.1% this month", trend: "up", icon: Zap, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" },
    { label: "Avg Response Time", value: "1m 45s", change: "-12.5% this month", trend: "down", icon: Clock, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
    { label: "Customer Satisfaction", value: "4.82/5", change: "+2.3% this month", trend: "up", icon: Smile, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30" },
    { label: "Resolution Rate", value: "94.2%", change: "+1.8% this month", trend: "up", icon: Award, color: "text-violet-500 bg-violet-50 dark:bg-violet-950/30" }
  ];

  const recentConversations = conversations.slice(0, 5);

  const topIssues = [
    { name: "Subscription Duplicate Charges", count: 48, percentage: 65, status: "critical" },
    { name: "API Webhook Status Timeout", count: 18, percentage: 40, status: "warning" },
    { name: "Password Recovery Failures", count: 12, percentage: 25, status: "stable" },
    { name: "SAML SSO Setup Okta Integration", count: 8, percentage: 15, status: "stable" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-r from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome back, Raheel ⚡
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            SupportAI has auto-resolved <strong className="font-semibold text-zinc-700 dark:text-zinc-200">842 tickets</strong> this billing period.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('conversations')}
          className="shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/10"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          View Active Conversations
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col gap-3 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{stat.label}</span>
                <div className={`p-2 rounded-xl shrink-0 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-55 leading-none">{stat.value}</h4>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                    stat.trend === 'up' && stat.label.includes('Time')
                      ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20'
                      : stat.trend === 'down' && stat.label.includes('Time')
                      ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20'
                      : stat.trend === 'up'
                      ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20'
                      : 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Top Issues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
            <div>
              <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-55">Conversation Activity</h4>
              <p className="text-xs text-zinc-450 dark:text-zinc-500">Volume of customer requests vs. automated resolutions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span>AI Automated</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span>Total Incoming</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[220px] mt-4 flex items-end">
            {/* Custom Responsive SVG Chart */}
            <svg viewBox="0 0 500 200" className="w-full h-48 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-grad-ai" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f4f4f5" className="dark:stroke-zinc-900" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f4f4f5" className="dark:stroke-zinc-900" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#f4f4f5" className="dark:stroke-zinc-900" strokeWidth="1" strokeDasharray="3" />

              {/* Volume Curve Path (Total) */}
              <path
                d="M0,170 C50,150 100,100 150,130 C200,160 250,80 300,60 C350,40 400,90 450,50 L500,40"
                fill="none"
                stroke="#d4d4d8"
                className="dark:stroke-zinc-700"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* AI Auto Resolved Curve Path */}
              <path
                d="M0,185 C50,165 100,120 150,150 C200,175 250,110 300,90 C350,65 400,110 450,75 L500,60 L500,200 L0,200 Z"
                fill="url(#chart-grad-ai)"
              />
              <path
                d="M0,185 C50,165 100,120 150,150 C200,175 250,110 300,90 C350,65 400,110 450,75 L500,60"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Circle Indicators */}
              <circle cx="300" cy="60" r="4.5" fill="#a1a1aa" stroke="#fff" strokeWidth="2" className="dark:stroke-zinc-950" />
              <circle cx="300" cy="90" r="4.5" fill="#6366f1" stroke="#fff" strokeWidth="2" className="dark:stroke-zinc-950" />
            </svg>
          </div>
          <div className="flex justify-between items-center px-2 text-xs text-zinc-450 dark:text-zinc-500 font-medium mt-2">
            <span>Aug 06</span>
            <span>Aug 07</span>
            <span>Aug 08</span>
            <span>Aug 09</span>
            <span>Aug 10</span>
            <span>Aug 11</span>
            <span>Today</span>
          </div>
        </div>

        {/* Top Issues List */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shadow-xs">
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-55">Top Issue Categories</h4>
            <p className="text-xs text-zinc-450 dark:text-zinc-505">Most frequent topics needing response</p>
          </div>
          <div className="mt-5 space-y-4 flex-1">
            {topIssues.map((issue, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-zinc-700 dark:text-zinc-300 truncate pr-4">{issue.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 shrink-0">{issue.count} cases</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      issue.status === 'critical' 
                        ? 'bg-rose-500' 
                        : issue.status === 'warning' 
                        ? 'bg-amber-500' 
                        : 'bg-indigo-500'
                    }`}
                    style={{ width: `${issue.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Conversations Table */}
      <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Recent Conversations</h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Latest active support threads in system</p>
          </div>
          <button 
            onClick={() => setActiveTab('conversations')}
            className="text-xs text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
          >
            See all inbox
          </button>
        </div>

        <div className="overflow-x-auto mt-3 -mx-5 md:mx-0">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500 font-semibold">
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Handling</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-5 text-right">CSAT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {recentConversations.map((conv) => (
                <tr 
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    setActiveTab('conversations');
                  }}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors group"
                >
                  <td className="py-3 px-5 flex items-center gap-2.5">
                    <img 
                      src={conv.customerAvatar} 
                      alt="" 
                      className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                    />
                    <div>
                      <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {conv.customerName}
                      </span>
                      <span className="text-xs text-zinc-450 dark:text-zinc-500 font-medium">
                        {conv.customerEmail}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300 font-medium max-w-[200px] truncate">
                    {conv.lastMessage}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                      conv.status === 'open'
                        ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/20'
                        : conv.status === 'snoozed'
                        ? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20'
                        : 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20'
                    }`}>
                      {conv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {conv.status === 'resolved' || conv.id === 'conv_3' || conv.id === 'conv_10' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        <Sparkles className="w-3 h-3 fill-current shrink-0" />
                        AI Helper
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-550 dark:text-zinc-450">
                        <UserCheck className="w-3 h-3 shrink-0" />
                        Human
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-zinc-400 dark:text-zinc-500 font-medium shrink-0">
                    {conv.lastActive}
                  </td>
                  <td className="py-3 px-5 text-right font-bold text-zinc-700 dark:text-zinc-200">
                    {conv.status === 'resolved' ? "4.9" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
