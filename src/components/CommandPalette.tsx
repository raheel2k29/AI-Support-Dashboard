'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Users, Inbox, BookOpen, Settings, ChevronRight } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    conversations, 
    customers, 
    kbArticles, 
    setActiveTab, 
    setActiveConversationId,
    addToast
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  // Filter items
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.email.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredConversations = conversations.filter(c => 
    c.customerName.toLowerCase().includes(query.toLowerCase()) || 
    c.lastMessage.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredArticles = kbArticles.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const actions = [
    { label: "Go to Analytics", action: () => { setActiveTab('analytics'); } },
    { label: "Toggle Dark Mode", action: () => { document.getElementById('theme-toggle-btn')?.click(); } },
    { label: "Configure AI Assistant Tone", action: () => { setActiveTab('settings'); } },
  ].filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (callback: () => void) => {
    callback();
    setCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Dialog */}
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl z-55 overflow-hidden animate-fade-in flex flex-col max-h-[60vh]">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800 h-12">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search customers, conversations, articles, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 text-sm focus:ring-0 outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {/* Action Settings */}
          {actions.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Actions
              </span>
              <div className="mt-1 space-y-0.5">
                {actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(act.action)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="flex-1 font-medium">{act.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversations */}
          {filteredConversations.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Conversations
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredConversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(() => {
                      setActiveTab('conversations');
                      setActiveConversationId(c.id);
                    })}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <Inbox className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-none">
                        {c.customerName}
                      </p>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate block mt-0.5">
                        {c.lastMessage}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customers */}
          {filteredCustomers.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Customers
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredCustomers.map((cust) => (
                  <button
                    key={cust.id}
                    onClick={() => handleSelect(() => {
                      setActiveTab('customers');
                      addToast(`Selected Customer: ${cust.name}`, 'info');
                    })}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <Users className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-none">
                        {cust.name}
                      </p>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate block mt-0.5">
                        {cust.email}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Knowledge Base */}
          {filteredArticles.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Articles
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelect(() => {
                      setActiveTab('kb');
                    })}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-none">
                        {art.title}
                      </p>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate block mt-0.5">
                        {art.category}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredCustomers.length === 0 && 
           filteredConversations.length === 0 && 
           filteredArticles.length === 0 && 
           actions.length === 0 && (
            <div className="p-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              No matching records found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
