'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Sparkles, Bell, Paintbrush, Globe, Trash2, Cpu } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, addToast } = useApp();
  const [subTab, setSubTab] = useState<'general' | 'ai' | 'notifications' | 'appearance'>('general');

  const subTabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'ai', label: 'AI Assistant Settings', icon: Cpu },
    { id: 'notifications', label: 'Notifications Settings', icon: Bell },
    { id: 'appearance', label: 'Appearance & Themes', icon: Paintbrush }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start h-[calc(100vh-10rem)] overflow-hidden">
      
      {/* Sidebar Subtabs list */}
      <div className="w-full md:w-56 flex md:flex-col gap-1 shrink-0 overflow-x-auto pb-2 md:pb-0 scrollbar-none border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pr-0 md:pr-4 h-auto md:h-full">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-left transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50'
                  : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Subtab Form Area */}
      <div className="flex-1 w-full overflow-y-auto h-full pr-1 pb-10">
        
        {/* SUBTAB: General */}
        {subTab === 'general' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">General Configuration</h3>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Workspace defaults, localization support, and time offsets</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Workspace Name</label>
                <input
                  type="text"
                  value={settings.workspaceName}
                  onChange={(e) => updateSettings({ workspaceName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-900 dark:text-zinc-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => updateSettings({ timezone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-700 dark:text-zinc-300"
                >
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                  <option value="Asia/Tokyo (JST)">Asia/Tokyo (JST)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSettings({ language: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-700 dark:text-zinc-300"
                >
                  <option value="en-US">English (United States)</option>
                  <option value="fr-FR">Français (French)</option>
                  <option value="de-DE">Deutsch (German)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB: AI Settings */}
        {subTab === 'ai' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">AI Agent Settings</h3>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Control autonomous auto-reply parameters, confidence guidelines, and handoff rules</p>
            </div>

            <div className="space-y-5">
              {/* Toggle: AI Enabled */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
                <div>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">AI Auto-Assistance</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">AI drafts suggestions or replies automatically when enabled</span>
                </div>
                <button
                  onClick={() => updateSettings({ aiEnabled: !settings.aiEnabled })}
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center shrink-0 ${
                    settings.aiEnabled ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-800'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform absolute shadow-xs ${
                    settings.aiEnabled ? 'translate-x-4.5' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              {/* Select Tone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Response Tone</label>
                <select
                  value={settings.aiTone}
                  onChange={(e) => updateSettings({ aiTone: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-700 dark:text-zinc-300"
                >
                  <option value="friendly">Friendly & Supportive</option>
                  <option value="professional">Professional & Technical</option>
                  <option value="concise">Concise & Direct</option>
                </select>
              </div>

              {/* Slider confidence handoff */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">
                  <span>Handoff Confidence Threshold</span>
                  <span className="text-indigo-500 font-bold">{settings.handoffThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.handoffThreshold}
                  onChange={(e) => updateSettings({ handoffThreshold: parseInt(e.target.value) })}
                  className="w-full accent-indigo-600 cursor-pointer h-1 rounded-full bg-zinc-200 dark:bg-zinc-800"
                />
                <span className="text-[10px] text-zinc-400 dark:text-zinc-505 block">
                  Automatically escalates to a human operator when the AI confidence score drops below this limit.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB: Notifications */}
        {subTab === 'notifications' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Notifications Subscriptions</h3>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Control what events trigger workspace alerts and email reports</p>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailNotifications', title: "Daily Billing Summary", desc: "Outbound invoicing summaries dispatched to account owner" },
                { key: 'newConversationAlerts', title: "New Ticket Inbox Ping", desc: "Audible noise alert when customer requests support chat" },
                { key: 'escalationAlerts', title: "SLA Escalation Logs", desc: "Push notification alert on critical priority transfers" }
              ].map((notif, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs">
                  <div>
                    <span className="text-xs font-semibold text-zinc-850 dark:text-zinc-150 block">{notif.title}</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 block">{notif.desc}</span>
                  </div>
                  <button
                    onClick={() => updateSettings({ [notif.key]: !((settings as any)[notif.key]) })}
                    className={`w-9 h-5 rounded-full transition-colors relative flex items-center shrink-0 ${
                      (settings as any)[notif.key] ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-850'
                    }`}
                  >
                    <span className={`w-4 h-4 bg-white rounded-full transition-transform absolute shadow-xs ${
                      (settings as any)[notif.key] ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB: Appearance */}
        {subTab === 'appearance' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">Theme & Aesthetics</h3>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">Customize workspace colors and workspace contrast presets</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'light', label: 'Light Mode', class: 'bg-zinc-50 border-zinc-200 text-zinc-900' },
                { id: 'dark', label: 'Dark Mode', class: 'bg-zinc-950 border-zinc-800 text-zinc-50' }
              ].map((themeOpt) => {
                const isActive = settings.appearance === themeOpt.id;
                return (
                  <button
                    key={themeOpt.id}
                    id={themeOpt.id === 'dark' ? 'theme-toggle-btn' : undefined}
                    onClick={() => updateSettings({ appearance: themeOpt.id as any })}
                    className={`p-4 rounded-2xl border text-left flex flex-col gap-2 cursor-pointer transition-all ${
                      themeOpt.class
                    } ${
                      isActive 
                        ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-zinc-950 border-transparent shadow-md' 
                        : 'hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <span className="text-xs font-bold">{themeOpt.label}</span>
                    <div className="h-10 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                      Sample Dashboard
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
