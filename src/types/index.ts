export interface Message {
  id: string;
  sender: 'customer' | 'agent' | 'ai';
  content: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: { name: string; size: string; type: string }[];
}

export interface ActivityItem {
  id: string;
  date: string;
  action: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  status: 'open' | 'snoozed' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  messages: Message[];
  unread: boolean;
  lastMessage: string;
  lastActive: string;
  sentiment: 'happy' | 'neutral' | 'frustrated' | 'angry';
  intent: string;
  suggestedAction: string;
  plan: string;
  ltv: string;
  customerSince: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  conversationsCount: number;
  lastActive: string;
  csat: number;
  status: 'active' | 'inactive';
  avatar: string;
  ltv: string;
  customerSince: string;
  activityLog: ActivityItem[];
}

export interface KBArticle {
  id: string;
  title: string;
  category: string;
  status: 'published' | 'draft';
  lastUpdated: string;
  views: number;
  content: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

export interface Settings {
  workspaceName: string;
  companyLogo: string;
  timezone: string;
  language: string;
  aiEnabled: boolean;
  aiTone: 'friendly' | 'professional' | 'concise' | 'empathetic';
  aiLength: 'short' | 'medium' | 'detailed';
  autoResolve: boolean;
  handoffThreshold: number;
  emailNotifications: boolean;
  newConversationAlerts: boolean;
  escalationAlerts: boolean;
  appearance: 'light' | 'dark' | 'system';
}
