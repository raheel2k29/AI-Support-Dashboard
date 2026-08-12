'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Conversation, KBArticle, Settings, Notification, Message } from '../types';
import { mockCustomers, mockConversations, mockArticles, defaultSettings, mockNotifications, aiConversationalReplies } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  kbArticles: KBArticle[];
  setKbArticles: React.Dispatch<React.SetStateAction<KBArticle[]>>;
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  isAiThinking: boolean;
  setIsAiThinking: (thinking: boolean) => void;
  aiSuggestion: string | null;
  setAiSuggestion: (suggestion: string | null) => void;
  generateAiReplySuggestion: (convId: string) => void;
  sendUserMessage: (convId: string, text: string) => void;
  trainAiModel: () => Promise<void>;
  isTrainingAi: boolean;
  triggerHandoff: (convId: string) => void;
  resolveConversation: (convId: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<string>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [kbArticles, setKbArticles] = useState<KBArticle[]>(mockArticles);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeConversationId, setActiveConversationId] = useState<string | null>("conv_1");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isTrainingAi, setIsTrainingAi] = useState(false);

  // Load theme from settings / localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('assistlyai-theme') as 'light' | 'dark' | null;
    const finalTheme = savedTheme || settings.appearance || 'dark';
    setTheme(finalTheme as 'light' | 'dark');
    if (finalTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.appearance]);

  // Keep search keybind active: ⌘K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('assistlyai-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    addToast(`Switched to ${nextTheme} mode`, 'info');
  };

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      if (updates.appearance) {
        const t = updates.appearance === 'system' ? 'dark' : updates.appearance;
        setTheme(t as 'light' | 'dark');
        if (t === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
    addToast('Settings saved successfully', 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  // Generate suggested AI response
  const generateAiReplySuggestion = (convId: string) => {
    setAiSuggestion(null);
    addToast('Analyzing thread context...', 'info');
    
    setTimeout(() => {
      const responses = aiConversationalReplies[convId] || aiConversationalReplies['default'];
      const suggestion = responses[Math.floor(Math.random() * responses.length)];
      setAiSuggestion(suggestion);
      addToast('Suggested reply drafted by AI assistant', 'success');
    }, 1200);
  };

  // Send a user reply (Simulated support team workspace reply)
  const sendUserMessage = (convId: string, text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: 'agent',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const updatedMessages = [...c.messages, newMessage];
          return {
            ...c,
            messages: updatedMessages,
            lastMessage: text,
            lastActive: 'Just now',
            unread: false
          };
        }
        return c;
      })
    );

    addToast('Message dispatched', 'success');
    setAiSuggestion(null);

    // If AI assistant is active, schedule automated user responses
    if (settings.aiEnabled) {
      setIsAiThinking(true);
      setTimeout(() => {
        setIsAiThinking(false);

        // Predefined customer responses based on current message counts / text triggers
        let replyContent = "Got it, that sounds perfect. Thank you for the quick explanation!";
        if (text.toLowerCase().includes('refund')) {
          replyContent = "Thank you so much! Please let me know once the transaction shows up on the invoicing ledger.";
        } else if (text.toLowerCase().includes('ip') || text.toLowerCase().includes('proxy')) {
          replyContent = "Yes, please send the custom onboarding links to scheduling. Thank you!";
        } else if (text.toLowerCase().includes('escalat') || text.toLowerCase().includes('manager')) {
          replyContent = "Okay, standing by for the Tier 3 manager notification link. Let me know when they are online.";
        }

        const customerReply: Message = {
          id: `msg_${Date.now() + 1}`,
          sender: 'customer',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        };

        setConversations((cPrev) =>
          cPrev.map((c) => {
            if (c.id === convId) {
              const updatedMessages = [...c.messages, customerReply];
              return {
                ...c,
                messages: updatedMessages,
                lastMessage: replyContent,
                lastActive: 'Just now',
                unread: true,
                sentiment: 'happy'
              };
            }
            return c;
          })
        );

        addToast('New message from customer received', 'info');
      }, 3000);
    }
  };

  const trainAiModel = async () => {
    setIsTrainingAi(true);
    addToast('Analyzing knowledge base documents...', 'info');
    
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setIsTrainingAi(false);
    addToast('AI knowledge graphs trained on 15 articles!', 'success');
  };

  const triggerHandoff = (convId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            priority: 'high',
            sentiment: 'frustrated',
            lastMessage: "[SYSTEM] Chat escalated to Human operator support"
          };
        }
        return c;
      })
    );
    addToast('Ticket escalated to support agent queues', 'info');
  };

  const resolveConversation = (convId: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            status: 'resolved',
            unread: false
          };
        }
        return c;
      })
    );
    addToast('Conversation marked resolved', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        theme,
        setTheme,
        toggleTheme,
        conversations,
        setConversations,
        customers,
        setCustomers,
        kbArticles,
        setKbArticles,
        settings,
        updateSettings,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        activeConversationId,
        setActiveConversationId,
        commandPaletteOpen,
        setCommandPaletteOpen,
        toasts,
        addToast,
        dismissToast,
        isAiThinking,
        setIsAiThinking,
        aiSuggestion,
        setAiSuggestion,
        generateAiReplySuggestion,
        sendUserMessage,
        trainAiModel,
        isTrainingAi,
        triggerHandoff,
        resolveConversation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
};
