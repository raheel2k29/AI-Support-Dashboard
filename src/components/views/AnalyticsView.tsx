'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, BarChart3, TrendingUp, Sparkles, User, HelpCircle } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  // Dynamic values based on selected timeframe
  const dataMap = {
    '7d': {
      conversations: '284',
      aiResolved: '88.5%',
      humanHandoff: '11.5%',
      avgResponse: '1m 24s',
      csat: '4.84',
      chartPoints: [
        { label: 'Mon', total: 45, ai: 40 },
        { label: 'Tue', total: 38, ai: 34 },
        { label: 'Wed', total: 52, ai: 47 },
        { label: 'Thu', total: 41, ai: 36 },
        { label: 'Fri', total: 48, ai: 42 },
        { label: 'Sat', total: 30, ai: 27 },
        { label: 'Sun', total: 30, ai: 26 },
      ],
      satisfactionPoints: [94, 95, 93, 96, 95, 97, 98],
      topics: [
        { name: "Billing & Duplicate Charges", count: 124, percentage: 65 },
        { name: "SSO & Okta Integration", count: 68, percentage: 45 },
        { name: "API Rate limits timeout", count: 42, percentage: 30 },
        { name: "Workspace Cancellations", count: 22, percentage: 15 },
      ]
    },
    '30d': {
      conversations: '1,248',
      aiResolved: '94.2%',
      humanHandoff: '5.8%',
      avgResponse: '1m 45s',
      csat: '4.82',
      chartPoints: [
        { label: 'Wk 1', total: 280, ai: 240 },
        { label: 'Wk 2', total: 310, ai: 285 },
        { label: 'Wk 3', total: 340, ai: 315 },
        { label: 'Wk 4', total: 318, ai: 298 },
      ],
      satisfactionPoints: [92, 94, 95, 96],
      topics: [
        { name: "Billing & Duplicate Charges", count: 542, percentage: 70 },
        { name: "SSO & Okta Integration", count: 280, percentage: 50 },
        { name: "API Rate limits timeout", count: 184, percentage: 35 },
        { name: "Workspace Cancellations", count: 92, percentage: 20 },
      ]
    },
    '90d': {
      conversations: '4,104',
      aiResolved: '92.8%',
      humanHandoff: '7.2%',
      avgResponse: '2m 04s',
      csat: '4.78',
      chartPoints: [
        { label: 'Month 1', total: 1280, ai: 1120 },
        { label: 'Month 2', total: 1410, ai: 1315 },
        { label: 'Month 3', total: 1414, ai: 1308 },
      ],
      satisfactionPoints: [90, 93, 95],
      topics: [
        { name: "Billing & Duplicate Charges", count: 1840, percentage: 75 },
        { name: "SSO & Okta Integration", count: 980, percentage: 55 },
        { name: "API Rate limits timeout", count: 642, percentage: 40 },
        { name: "Workspace Cancellations", count: 322, percentage: 25 },
      ]
    }
  };

  const activeData = dataMap[timeframe];

  // Helper calculation for resolution split graph layout
  const aiPercentage = parseFloat(activeData.aiResolved);
  const humanPercentage = parseFloat(activeData.humanHandoff);

  return (
    <div className="space-y-6">
      
      {/* Date Filter Toolbar */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-550 dark:text-zinc-400">
          <Calendar className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>Timeline Analytics</span>
        </div>
        <div className="flex gap-1">
          {(['7d', '30d', '90d'] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setTimeframe(opt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === opt
                  ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-250 dark:border-zinc-800/50'
              }`}
            >
              {opt === '7d' ? 'Last 7 Days' : opt === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {[
          { label: "Total Conversations", value: activeData.conversations, desc: "Total customer queries" },
          { label: "AI Resolution Rate", value: activeData.aiResolved, desc: "Solved by AI Assistant" },
          { label: "Human Handoff Rate", value: activeData.humanHandoff, desc: "Escalated to agent desk" },
          { label: "Avg Response Time", value: activeData.avgResponse, desc: "Median reaction speed" },
          { label: "Customer Satisfaction", value: `⭐️ ${activeData.csat}`, desc: "Post-resolution CSAT survey" }
        ].map((m, idx) => (
          <div key={idx} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs flex flex-col gap-2">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{m.label}</span>
            <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{m.value}</h4>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-505 font-medium">{m.desc}</span>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Volume trends */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shadow-xs">
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Volume Trend over Time</h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Compares overall support requests versus volume handled by AI agent</p>
          </div>
          <div className="flex-1 min-h-[220px] mt-4 flex items-end">
            <svg viewBox="0 0 500 200" className="w-full h-44 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="an-grad-ai" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f4f4f5" className="dark:stroke-zinc-900" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f4f4f5" className="dark:stroke-zinc-900" strokeWidth="1" strokeDasharray="3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#f4f4f5" className="dark:stroke-zinc-900" strokeWidth="1" strokeDasharray="3" />

              {/* Dynamic Path Maker based on timeframe count points */}
              <path
                d={timeframe === '7d' 
                  ? "M0,170 C70,140 140,80 210,130 C280,150 350,60 420,50 L500,40"
                  : timeframe === '30d'
                  ? "M0,160 L166,130 L333,90 L500,60"
                  : "M0,160 L250,110 L500,80"
                }
                fill="none"
                stroke="#d4d4d8"
                className="dark:stroke-zinc-700"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <path
                d={timeframe === '7d'
                  ? "M0,185 C70,160 140,110 210,145 C280,165 350,85 420,75 L500,60 L500,200 L0,200 Z"
                  : timeframe === '30d'
                  ? "M0,175 L166,145 L333,105 L500,75 L500,200 L0,200 Z"
                  : "M0,180 L250,130 L500,95 L500,200 L0,200 Z"
                }
                fill="url(#an-grad-ai)"
              />
              <path
                d={timeframe === '7d'
                  ? "M0,185 C70,160 140,110 210,145 C280,165 350,85 420,75 L500,60"
                  : timeframe === '30d'
                  ? "M0,175 L166,145 L333,105 L500,75"
                  : "M0,180 L250,130 L500,95"
                }
                fill="none"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-400 dark:text-zinc-505 font-medium mt-3 px-1">
            {activeData.chartPoints.map((pt, i) => (
              <span key={i}>{pt.label}</span>
            ))}
          </div>
        </div>

        {/* Chart 2: Resolution split */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shadow-xs">
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Resolution Split</h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Ratio of tickets handled autonomously versus human desk transfers</p>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center py-6">
            <div className="w-full flex items-center h-8 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850">
              <div 
                className="h-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
                style={{ width: `${aiPercentage}%` }}
              >
                {aiPercentage}% AI
              </div>
              <div 
                className="h-full bg-zinc-300 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-700 dark:text-zinc-400 transition-all duration-500"
                style={{ width: `${humanPercentage}%` }}
              >
                {humanPercentage}% Agent
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full mt-6 text-xs font-semibold">
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-1 text-center">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Autonomous Resolves</span>
                <span className="text-sm font-bold text-indigo-500">{activeData.aiResolved}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-1 text-center">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Escalated Transfer</span>
                <span className="text-sm font-bold text-zinc-650 dark:text-zinc-300">{activeData.humanHandoff}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart 3: Customer Satisfaction */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shadow-xs">
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Satisfaction Distribution</h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">CSAT scores polled from automated support emails</p>
          </div>
          <div className="flex-1 min-h-[160px] mt-6 flex items-end justify-between gap-2.5 px-3">
            {activeData.satisfactionPoints.map((score, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden flex items-end h-32 border border-zinc-200 dark:border-zinc-850/50">
                  <div 
                    className="w-full bg-emerald-500 hover:bg-emerald-600 transition-colors"
                    style={{ height: `${score}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500">
                  {score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 4: Support Topic Volume breakdown */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col shadow-xs">
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Top Support Topics</h4>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Volume index classifications of inquiries</p>
          </div>
          <div className="mt-5 space-y-4 flex-1">
            {activeData.topics.map((t, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-700 dark:text-zinc-350 truncate">{t.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-450 shrink-0 font-bold">{t.count} items</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
