'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { CommandPalette } from '../components/CommandPalette';
import { ToastContainer } from '../components/Toast';

import { OverviewView } from '../components/views/OverviewView';
import { ConversationsView } from '../components/views/ConversationsView';
import { CustomersView } from '../components/views/CustomersView';
import { KBView } from '../components/views/KBView';
import { AnalyticsView } from '../components/views/AnalyticsView';
import { SettingsView } from '../components/views/SettingsView';

export default function Home() {
  const { activeTab } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'conversations':
        return <ConversationsView />;
      case 'customers':
        return <CustomersView />;
      case 'kb':
        return <KBView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Topbar 
          onOpenSidebar={() => setMobileSidebarOpen(true)} 
        />

        {/* View Content Wrapper */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette />

      {/* Global Notification Toasts */}
      <ToastContainer />
    </div>
  );
}
