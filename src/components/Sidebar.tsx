'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  BookOpen, 
  Inbox, 
  LayoutDashboard, 
  Settings, 
  Sparkles, 
  Users, 
  ChevronDown,
  LogOut,
  User,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, conversations, settings, theme } = useApp();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'conversations', label: 'Conversations', icon: Inbox, badge: conversations.filter(c => c.unread && c.status === 'open').length },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'kb', label: 'Knowledge Base', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-45 flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-transform duration-300 lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo / Workspace Selection */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} 
              alt="AssistlyAI" 
              className="h-14 object-contain" 
            />
          </div>
          <button className="p-1 rounded-md text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-200">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-105 ${isActive ? 'text-indigo-500 dark:text-indigo-400' : ''}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span className="px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Upgrade Plan Callout */}
        <div className="px-4 py-3 mx-3 mb-2 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4 fill-current" />
            <span className="text-xs font-semibold">Pro Workspace Plan</span>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Access advanced analytics models & custom AI webhooks keys.
          </p>
          <button className="w-full py-1.5 px-3 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-600/10">
            Upgrade Plan
          </button>
        </div>

        {/* Bottom Profile Section */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                alt="Profile Avatar"
                className="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-zinc-950 rounded-full" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-none">
                Raheel
              </p>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                Support Manager
              </span>
            </div>
          </div>
          <button className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
