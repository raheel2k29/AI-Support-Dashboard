'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Search, Sun, Moon, Menu, Check } from 'lucide-react';

interface TopbarProps {
  onOpenSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenSidebar }) => {
  const { activeTab, theme, toggleTheme, notifications, markNotificationRead, markAllNotificationsRead, setCommandPaletteOpen } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Overview';
      case 'conversations': return 'Conversations';
      case 'customers': return 'Customers';
      case 'kb': return 'Knowledge Base';
      case 'analytics': return 'Analytics';
      case 'settings': return 'Settings';
      default: return 'AssistlyAI';
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-35 flex items-center justify-between h-16 px-4 lg:px-6 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      {/* Title & Mobile Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 capitalize">
          {getTitle()}
        </h2>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Command Search Indicator */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 w-60 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all text-left"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1">Search or type command...</span>
          <kbd className="px-1.5 py-0.5 font-sans font-medium text-[10px] bg-zinc-200 dark:bg-zinc-800 text-zinc-500 rounded-md border border-zinc-300 dark:border-zinc-700">
            ⌘K
          </kbd>
        </button>

        {/* Mobile Search Button */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Theme Toggler */}
        <button
          onClick={toggleTheme}
          className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 animate-fade-in">
                <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-zinc-150 dark:divide-zinc-850">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationRead(notif.id)}
                        className={`p-3 text-left transition-colors cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 ${
                          !notif.read ? 'bg-zinc-50/50 dark:bg-zinc-900/30' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`w-1.5 h-1.5 mt-1.5 rounded-full shrink-0 ${
                              notif.type === 'alert'
                                ? 'bg-rose-500'
                                : notif.type === 'success'
                                ? 'bg-emerald-500'
                                : 'bg-indigo-500'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100">
                              {notif.title}
                            </p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 block">
                              {notif.time}
                            </span>
                          </div>
                          {notif.read && (
                            <Check className="w-3 h-3 text-zinc-400 shrink-0" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
