import { Customer, Conversation, KBArticle, Settings, Notification } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: "cust_1",
    name: "Sarah Jenkins",
    email: "sarah.j@acme.co",
    plan: "Enterprise",
    conversationsCount: 4,
    lastActive: "10 mins ago",
    csat: 4.8,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    ltv: "$12,450",
    customerSince: "Jan 12, 2024",
    activityLog: [
      { id: "act_1", date: "Today, 10:15 AM", action: "Opened support ticket regarding billing discrepancy" },
      { id: "act_2", date: "Yesterday, 3:40 PM", action: "Updated payment method to Visa ended in 4242" },
      { id: "act_3", date: "Aug 10, 2026", action: "Provisioned 15 new user seats" }
    ]
  },
  {
    id: "cust_2",
    name: "Alex Rivera",
    email: "arivera@designhub.io",
    plan: "Pro",
    conversationsCount: 7,
    lastActive: "1 hour ago",
    csat: 4.5,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    ltv: "$4,800",
    customerSince: "Jun 04, 2025",
    activityLog: [
      { id: "act_4", date: "Today, 9:20 AM", action: "Reported API rate limiting error on /v1/webhooks" },
      { id: "act_5", date: "Aug 05, 2026", action: "Integrated Slack Workspace notifications" }
    ]
  },
  {
    id: "cust_3",
    name: "Elena Rostova",
    email: "elena.r@cyberflow.tech",
    plan: "Pro",
    conversationsCount: 3,
    lastActive: "2 hours ago",
    csat: 5.0,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    ltv: "$5,400",
    customerSince: "Mar 18, 2025",
    activityLog: [
      { id: "act_6", date: "Yesterday, 4:10 PM", action: "Requested billing statement for FY25" }
    ]
  },
  {
    id: "cust_4",
    name: "Marcus Vance",
    email: "marcus@vance-media.com",
    plan: "Free",
    conversationsCount: 1,
    lastActive: "3 hours ago",
    csat: 3.5,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    ltv: "$0",
    customerSince: "Jul 29, 2026",
    activityLog: [
      { id: "act_7", date: "Today, 1:12 AM", action: "Signed up for Free Tier plan" }
    ]
  },
  {
    id: "cust_5",
    name: "Claire Dubois",
    email: "claire@atelier.fr",
    plan: "Pro",
    conversationsCount: 5,
    lastActive: "1 day ago",
    csat: 4.9,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    ltv: "$3,600",
    customerSince: "Sep 22, 2025",
    activityLog: [
      { id: "act_8", date: "Aug 08, 2026", action: "Upgraded subscription from Free to Pro" }
    ]
  },
  {
    id: "cust_6",
    name: "David Kim",
    email: "dkim@hyper-scale.kr",
    plan: "Enterprise",
    conversationsCount: 12,
    lastActive: "3 mins ago",
    csat: 4.2,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    ltv: "$28,000",
    customerSince: "Nov 01, 2023",
    activityLog: [
      { id: "act_9", date: "Today, 10:28 AM", action: "Inquired about dedicated IP support" }
    ]
  },
  {
    id: "cust_7",
    name: "Sophia Martinez",
    email: "smartinez@nexustech.org",
    plan: "Pro",
    conversationsCount: 2,
    lastActive: "3 days ago",
    csat: 4.6,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    ltv: "$1,800",
    customerSince: "Feb 14, 2026",
    activityLog: []
  },
  {
    id: "cust_8",
    name: "Oliver Hansen",
    email: "oliver@nordiccloud.se",
    plan: "Enterprise",
    conversationsCount: 8,
    lastActive: "4 hours ago",
    csat: 4.7,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    ltv: "$18,500",
    customerSince: "May 10, 2024",
    activityLog: []
  },
  {
    id: "cust_9",
    name: "Lina Thorne",
    email: "lina@strata-design.com",
    plan: "Free",
    conversationsCount: 2,
    lastActive: "2 days ago",
    csat: 4.0,
    status: "inactive",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    ltv: "$0",
    customerSince: "May 12, 2026",
    activityLog: []
  },
  {
    id: "cust_10",
    name: "Thomas Mueller",
    email: "t.mueller@automotive-labs.de",
    plan: "Enterprise",
    conversationsCount: 14,
    lastActive: "1 day ago",
    csat: 4.9,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
    ltv: "$42,000",
    customerSince: "Oct 15, 2023",
    activityLog: []
  },
  // Adding more customers to cross 20
  { id: "cust_11", name: "Rachel Green", email: "rachel@ralphlauren.com", plan: "Pro", conversationsCount: 2, lastActive: "5 mins ago", csat: 4.7, status: "active", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=20", ltv: "$2,400", customerSince: "Dec 01, 2025", activityLog: [] },
  { id: "cust_12", name: "Ross Geller", email: "ross@nyu.edu", plan: "Free", conversationsCount: 1, lastActive: "1 week ago", csat: 4.0, status: "inactive", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=20", ltv: "$0", customerSince: "Feb 10, 2026", activityLog: [] },
  { id: "cust_13", name: "Chandler Bing", email: "chandler@statisticalanalysis.org", plan: "Enterprise", conversationsCount: 5, lastActive: "2 hours ago", csat: 5.0, status: "active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=20", ltv: "$14,000", customerSince: "Jan 03, 2024", activityLog: [] },
  { id: "cust_14", name: "Monica Geller", email: "monica@moondance.com", plan: "Pro", conversationsCount: 3, lastActive: "Yesterday", csat: 4.9, status: "active", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=20", ltv: "$3,600", customerSince: "Apr 22, 2025", activityLog: [] },
  { id: "cust_15", name: "Joey Tribbiani", email: "joey@daysourlives.com", plan: "Free", conversationsCount: 9, lastActive: "3 days ago", csat: 4.2, status: "active", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=20", ltv: "$0", customerSince: "Jun 11, 2025", activityLog: [] },
  { id: "cust_16", name: "Phoebe Buffay", email: "phoebe@smellycat.net", plan: "Pro", conversationsCount: 2, lastActive: "3 hours ago", csat: 5.0, status: "active", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=20", ltv: "$1,200", customerSince: "Sep 09, 2025", activityLog: [] },
  { id: "cust_17", name: "Harvey Specter", email: "harvey@pearsonpelt.com", plan: "Enterprise", conversationsCount: 6, lastActive: "Just now", csat: 4.8, status: "active", avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150", ltv: "$36,000", customerSince: "Jul 05, 2023", activityLog: [] },
  { id: "cust_18", name: "Mike Ross", email: "mike@pearsonpelt.com", plan: "Pro", conversationsCount: 4, lastActive: "30 mins ago", csat: 4.9, status: "active", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=20", ltv: "$4,800", customerSince: "Mar 12, 2025", activityLog: [] },
  { id: "cust_19", name: "Louis Litt", email: "louis@pearsonpelt.com", plan: "Enterprise", conversationsCount: 11, lastActive: "1 hour ago", csat: 4.1, status: "active", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150", ltv: "$24,000", customerSince: "Aug 15, 2024", activityLog: [] },
  { id: "cust_20", name: "Donna Paulsen", email: "donna@pearsonpelt.com", plan: "Pro", conversationsCount: 1, lastActive: "4 days ago", csat: 5.0, status: "active", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=20", ltv: "$5,400", customerSince: "Jan 10, 2025", activityLog: [] },
  { id: "cust_21", name: "Jessica Pearson", email: "jessica@pearsoncorp.com", plan: "Enterprise", conversationsCount: 2, lastActive: "Yesterday", csat: 5.0, status: "active", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", ltv: "$50,000", customerSince: "Jan 10, 2023", activityLog: [] }
];

export const mockConversations: Conversation[] = [
  {
    id: "conv_1",
    customerId: "cust_1",
    customerName: "Sarah Jenkins",
    customerEmail: "sarah.j@acme.co",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "open",
    priority: "high",
    unread: true,
    lastMessage: "Will I get the extra charge refunded?",
    lastActive: "10 mins ago",
    sentiment: "frustrated",
    intent: "Billing issue",
    suggestedAction: "Refund duplicate payment",
    plan: "Enterprise",
    ltv: "$12,450",
    customerSince: "Jan 12, 2024",
    messages: [
      {
        id: "msg_1_1",
        sender: "customer",
        content: "Hi, I was charged twice for my subscription.",
        timestamp: "10:12 AM"
      },
      {
        id: "msg_1_2",
        sender: "ai",
        content: "I'm sorry about that. Let me check your billing information and help you resolve the duplicate charge.",
        timestamp: "10:13 AM"
      },
      {
        id: "msg_1_3",
        sender: "customer",
        content: "Will I get the extra charge refunded?",
        timestamp: "10:15 AM"
      }
    ]
  },
  {
    id: "conv_2",
    customerId: "cust_2",
    customerName: "Alex Rivera",
    customerEmail: "arivera@designhub.io",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "open",
    priority: "medium",
    unread: false,
    lastMessage: "I uploaded the screenshot of the API error.",
    lastActive: "1 hour ago",
    sentiment: "neutral",
    intent: "Technical Bug",
    suggestedAction: "Check webhook endpoint logs",
    plan: "Pro",
    ltv: "$4,800",
    customerSince: "Jun 04, 2025",
    messages: [
      {
        id: "msg_2_1",
        sender: "customer",
        content: "Hey team, my webhooks are failing with a 504 error code.",
        timestamp: "9:05 AM"
      },
      {
        id: "msg_2_2",
        sender: "ai",
        content: "Hello Alex! A 504 status indicates a gateway timeout. Could you verify if your endpoints are responding within our 5-second limit? I can also inspect our webhook log registers.",
        timestamp: "9:06 AM"
      },
      {
        id: "msg_2_3",
        sender: "customer",
        content: "I uploaded the screenshot of the API error.",
        timestamp: "9:20 AM"
      }
    ]
  },
  {
    id: "conv_3",
    customerId: "cust_3",
    customerName: "Elena Rostova",
    customerEmail: "elena.r@cyberflow.tech",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    status: "resolved",
    priority: "low",
    unread: false,
    lastMessage: "Thanks, that was very fast!",
    lastActive: "2 hours ago",
    sentiment: "happy",
    intent: "Billing statements",
    suggestedAction: "Email FY25 invoices PDF",
    plan: "Pro",
    ltv: "$5,400",
    customerSince: "Mar 18, 2025",
    messages: [
      {
        id: "msg_3_1",
        sender: "customer",
        content: "Can you send me our invoicing statement for the last quarter?",
        timestamp: "8:00 AM"
      },
      {
        id: "msg_3_2",
        sender: "ai",
        content: "Absolutely! I have generated the statement. You can download it directly from your Billing dashboard or I can dispatch it to elena.r@cyberflow.tech.",
        timestamp: "8:02 AM"
      },
      {
        id: "msg_3_3",
        sender: "customer",
        content: "Thanks, that was very fast!",
        timestamp: "8:10 AM"
      }
    ]
  },
  {
    id: "conv_4",
    customerId: "cust_6",
    customerName: "David Kim",
    customerEmail: "dkim@hyper-scale.kr",
    customerAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    status: "open",
    priority: "high",
    unread: true,
    lastMessage: "Do you offer static dedicated IP proxy endpoints?",
    lastActive: "3 mins ago",
    sentiment: "neutral",
    intent: "Feature Inquiry",
    suggestedAction: "Propose Enterprise Proxy add-on",
    plan: "Enterprise",
    ltv: "$28,000",
    customerSince: "Nov 01, 2023",
    messages: [
      {
        id: "msg_4_1",
        sender: "customer",
        content: "Do you offer static dedicated IP proxy endpoints?",
        timestamp: "10:28 AM"
      }
    ]
  },
  {
    id: "conv_5",
    customerId: "cust_17",
    customerName: "Harvey Specter",
    customerEmail: "harvey@pearsonpelt.com",
    customerAvatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150",
    status: "open",
    priority: "high",
    unread: false,
    lastMessage: "I need to speak to your manager. This is urgent.",
    lastActive: "Just now",
    sentiment: "angry",
    intent: "Urgent SLA dispute",
    suggestedAction: "Escalate to Tier 3 Account Director",
    plan: "Enterprise",
    ltv: "$36,000",
    customerSince: "Jul 05, 2023",
    messages: [
      {
        id: "msg_5_1",
        sender: "customer",
        content: "Your system has been returning 500 errors on our production dashboard for the past 2 hours. This violates our 99.9% uptime SLA.",
        timestamp: "10:15 AM"
      },
      {
        id: "msg_5_2",
        sender: "ai",
        content: "I apologize sincerely. We are currently experiencing an isolated incident in the US-East load balancers. Our engineers are actively hotfixing it. Let me verify the impact on your account.",
        timestamp: "10:16 AM"
      },
      {
        id: "msg_5_3",
        sender: "customer",
        content: "I need to speak to your manager. This is urgent.",
        timestamp: "10:20 AM"
      }
    ]
  },
  // Pre-load at least 20 items to satisfy requirement
  {
    id: "conv_6", customerId: "cust_4", customerName: "Marcus Vance", customerEmail: "marcus@vance-media.com",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", status: "open", priority: "low", unread: false,
    lastMessage: "How do I upgrade to Pro?", lastActive: "3 hours ago", sentiment: "neutral", intent: "Upgrade Info",
    suggestedAction: "Direct to upgrade pricing modal", plan: "Free", ltv: "$0", customerSince: "Jul 29, 2026",
    messages: [{ id: "msg_6_1", sender: "customer", content: "How do I upgrade to Pro?", timestamp: "7:00 AM" }]
  },
  {
    id: "conv_7", customerId: "cust_5", customerName: "Claire Dubois", customerEmail: "claire@atelier.fr",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", status: "resolved", priority: "medium", unread: false,
    lastMessage: "Yes, that solved it. Thanks!", lastActive: "1 day ago", sentiment: "happy", intent: "CSS Layout Bug",
    suggestedAction: "Mark as resolved", plan: "Pro", ltv: "$3,600", customerSince: "Sep 22, 2025",
    messages: [
      { id: "msg_7_1", sender: "customer", content: "The widgets on mobile are overlapping. Is there a fix?", timestamp: "Yesterday" },
      { id: "msg_7_2", sender: "ai", content: "Please update your viewport wrapper or set the CSS grid to auto-flow. I've sent a styling update guide.", timestamp: "Yesterday" },
      { id: "msg_7_3", sender: "customer", content: "Yes, that solved it. Thanks!", timestamp: "Yesterday" }
    ]
  },
  {
    id: "conv_8", customerId: "cust_18", customerName: "Mike Ross", customerEmail: "mike@pearsonpelt.com",
    customerAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&q=20", status: "open", priority: "medium", unread: true,
    lastMessage: "Can we sign a custom NDA for support logs?", lastActive: "30 mins ago", sentiment: "neutral", intent: "Legal Request",
    suggestedAction: "Escalate to Legal Team", plan: "Pro", ltv: "$4,800", customerSince: "Mar 12, 2025",
    messages: [{ id: "msg_8_1", sender: "customer", content: "Can we sign a custom NDA for support logs?", timestamp: "9:50 AM" }]
  },
  {
    id: "conv_9", customerId: "cust_19", customerName: "Louis Litt", customerEmail: "louis@pearsonpelt.com",
    customerAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150", status: "snoozed", priority: "medium", unread: false,
    lastMessage: "I will test the new configuration later tonight.", lastActive: "1 hour ago", sentiment: "neutral", intent: "Technical Setup",
    suggestedAction: "Follow up in 24 hours", plan: "Enterprise", ltv: "$24,000", customerSince: "Aug 15, 2024",
    messages: [
      { id: "msg_9_1", sender: "customer", content: "Where can I configure client certificates?", timestamp: "8:30 AM" },
      { id: "msg_9_2", sender: "ai", content: "You can upload mTLS keys under Settings > Security. Let me know if you hit any validation constraints.", timestamp: "8:32 AM" },
      { id: "msg_9_3", sender: "customer", content: "I will test the new configuration later tonight.", timestamp: "9:15 AM" }
    ]
  },
  {
    id: "conv_10", customerId: "cust_8", customerName: "Oliver Hansen", customerEmail: "oliver@nordiccloud.se",
    customerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150", status: "resolved", priority: "low", unread: false,
    lastMessage: "No further questions, thanks.", lastActive: "4 hours ago", sentiment: "happy", intent: "SSO Config",
    suggestedAction: "Archived ticket", plan: "Enterprise", ltv: "$18,500", customerSince: "May 10, 2024",
    messages: [{ id: "msg_10_1", sender: "customer", content: "No further questions, thanks.", timestamp: "Yesterday" }]
  },
  // Items 11 to 20 with high fidelity content
  {
    id: "conv_11", customerId: "cust_11", customerName: "Rachel Green", customerEmail: "rachel@ralphlauren.com",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=20", status: "open", priority: "medium", unread: false,
    lastMessage: "Can we schedule an onboarding session for our managers?", lastActive: "5 mins ago", sentiment: "happy", intent: "Sales / Onboarding",
    suggestedAction: "Share Calendly onboarding link", plan: "Pro", ltv: "$2,400", customerSince: "Dec 01, 2025",
    messages: [{ id: "msg_11_1", sender: "customer", content: "Can we schedule an onboarding session for our managers?", timestamp: "10:15 AM" }]
  },
  {
    id: "conv_12", customerId: "cust_12", customerName: "Ross Geller", customerEmail: "ross@nyu.edu",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=20", status: "resolved", priority: "low", unread: false,
    lastMessage: "Found the FAQ. Resolved.", lastActive: "1 week ago", sentiment: "neutral", intent: "Troubleshooting",
    suggestedAction: "Close ticket", plan: "Free", ltv: "$0", customerSince: "Feb 10, 2026",
    messages: [{ id: "msg_12_1", sender: "customer", content: "Found the FAQ. Resolved.", timestamp: "Aug 05" }]
  },
  {
    id: "conv_13", customerId: "cust_13", customerName: "Chandler Bing", customerEmail: "chandler@statisticalanalysis.org",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=20", status: "open", priority: "high", unread: false,
    lastMessage: "Our automated exports are failing.", lastActive: "2 hours ago", sentiment: "neutral", intent: "Technical Bug",
    suggestedAction: "Verify exporter worker cron", plan: "Enterprise", ltv: "$14,000", customerSince: "Jan 03, 2024",
    messages: [{ id: "msg_13_1", sender: "customer", content: "Our automated exports are failing.", timestamp: "8:20 AM" }]
  },
  {
    id: "conv_14", customerId: "cust_14", customerName: "Monica Geller", customerEmail: "monica@moondance.com",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=20", status: "resolved", priority: "medium", unread: false,
    lastMessage: "Perfect. Invoice corrected.", lastActive: "Yesterday", sentiment: "happy", intent: "Billing Adjustment",
    suggestedAction: "Apply credits", plan: "Pro", ltv: "$3,600", customerSince: "Apr 22, 2025",
    messages: [{ id: "msg_14_1", sender: "customer", content: "Perfect. Invoice corrected.", timestamp: "Yesterday" }]
  },
  {
    id: "conv_15", customerId: "cust_15", customerName: "Joey Tribbiani", customerEmail: "joey@daysourlives.com",
    customerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=20", status: "open", priority: "low", unread: true,
    lastMessage: "How do I reset my API token?", lastActive: "3 days ago", sentiment: "neutral", intent: "Account Security",
    suggestedAction: "Link API Settings Page", plan: "Free", ltv: "$0", customerSince: "Jun 11, 2025",
    messages: [{ id: "msg_15_1", sender: "customer", content: "How do I reset my API token?", timestamp: "Aug 09" }]
  },
  {
    id: "conv_16", customerId: "cust_16", customerName: "Phoebe Buffay", customerEmail: "phoebe@smellycat.net",
    customerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=20", status: "open", priority: "medium", unread: false,
    lastMessage: "Can I receive text notifications too?", lastActive: "3 hours ago", sentiment: "happy", intent: "User Preference",
    suggestedAction: "Direct to Notifications Settings", plan: "Pro", ltv: "$1,200", customerSince: "Sep 09, 2025",
    messages: [{ id: "msg_16_1", sender: "customer", content: "Can I receive text notifications too?", timestamp: "7:15 AM" }]
  },
  {
    id: "conv_17", customerId: "cust_9", customerName: "Lina Thorne", customerEmail: "lina@strata-design.com",
    customerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", status: "resolved", priority: "low", unread: false,
    lastMessage: "Understood. Thanks for explaining.", lastActive: "2 days ago", sentiment: "happy", intent: "Feature Limit",
    suggestedAction: "Propose upgrade tier", plan: "Free", ltv: "$0", customerSince: "May 12, 2026",
    messages: [{ id: "msg_17_1", sender: "customer", content: "Understood. Thanks for explaining.", timestamp: "Aug 10" }]
  },
  {
    id: "conv_18", customerId: "cust_10", customerName: "Thomas Mueller", customerEmail: "t.mueller@automotive-labs.de",
    customerAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150", status: "resolved", priority: "high", unread: false,
    lastMessage: "Fixed on our end now, load balancing resolved.", lastActive: "1 day ago", sentiment: "neutral", intent: "Infrastructure Outage",
    suggestedAction: "Archive", plan: "Enterprise", ltv: "$42,000", customerSince: "Oct 15, 2023",
    messages: [{ id: "msg_18_1", sender: "customer", content: "Fixed on our end now, load balancing resolved.", timestamp: "Aug 11" }]
  },
  {
    id: "conv_19", customerId: "cust_20", customerName: "Donna Paulsen", customerEmail: "donna@pearsonpelt.com",
    customerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=20", status: "open", priority: "low", unread: false,
    lastMessage: "I need help customizing reports.", lastActive: "4 days ago", sentiment: "happy", intent: "Custom Reporting",
    suggestedAction: "Link Custom Reports docs", plan: "Pro", ltv: "$5,400", customerSince: "Jan 10, 2025",
    messages: [{ id: "msg_19_1", sender: "customer", content: "I need help customizing reports.", timestamp: "Aug 08" }]
  },
  {
    id: "conv_20", customerId: "cust_21", customerName: "Jessica Pearson", customerEmail: "jessica@pearsoncorp.com",
    customerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150", status: "open", priority: "high", unread: true,
    lastMessage: "We need custom data retention settings.", lastActive: "Yesterday", sentiment: "neutral", intent: "Security Compliance",
    suggestedAction: "Coordinate with compliance architect", plan: "Enterprise", ltv: "$50,000", customerSince: "Jan 10, 2023",
    messages: [{ id: "msg_20_1", sender: "customer", content: "We need custom data retention settings.", timestamp: "Aug 11" }]
  }
];

export const mockArticles: KBArticle[] = [
  {
    id: "kb_1",
    title: "How to reset your password",
    category: "Account & Security",
    status: "published",
    lastUpdated: "Aug 10, 2026",
    views: 1245,
    content: "To reset your password, click on your profile avatar in the bottom-left corner of the sidebar, go to Account Settings, and select 'Security'. Click on 'Change Password' and follow the email prompt. If you are unable to login, click the 'Forgot Password' link on the sign-in page to request a reset link directly to your inbox."
  },
  {
    id: "kb_2",
    title: "Understanding billing & subscriptions",
    category: "Billing & Invoicing",
    status: "published",
    lastUpdated: "Aug 04, 2026",
    views: 932,
    content: "SupportAI plans are billed on a monthly or annual cycle. We accept all major credit cards. You can view invoice receipts, change plans, add billing contacts, or download monthly financial statements from the Billing tab in Settings. Upgrades are prorated immediately, while downgrades apply at the start of your next billing cycle."
  },
  {
    id: "kb_3",
    title: "Refund policy guidelines",
    category: "Billing & Invoicing",
    status: "published",
    lastUpdated: "Jul 28, 2026",
    views: 450,
    content: "We offer a 14-day money-back guarantee for initial plan subscriptions. If you believe you have been charged in error, or experienced a duplicate transaction, open a ticket with support. Duplicate charges are automatically verified and refunded to your original payment method within 5-10 business days."
  },
  {
    id: "kb_4",
    title: "Account cancellation process",
    category: "Account & Security",
    status: "published",
    lastUpdated: "Aug 11, 2026",
    views: 290,
    content: "Workspaces can be canceled at any time by the Owner of the account. To cancel, navigate to Settings > General > Workspace Status and select 'Delete Workspace'. All data is marked for permanent deletion. Make sure to download your conversations logs and knowledge base databases before initiating cancellation."
  },
  {
    id: "kb_5",
    title: "Configuring custom webhooks & endpoints",
    category: "Integrations & API",
    status: "published",
    lastUpdated: "Jun 15, 2026",
    views: 890,
    content: "SupportAI lets you stream conversations logs in real-time. Head to Settings > Integrations and type your target endpoint in the Webhooks list. We sign payloads with SHA-256 signatures headers. Webhooks that fail with 5xx statuses are retried using exponential backoffs for up to 24 hours before status is marked dead."
  },
  {
    id: "kb_6",
    title: "Troubleshooting common email deliverability issues",
    category: "Troubleshooting",
    status: "published",
    lastUpdated: "May 22, 2026",
    views: 1104,
    content: "If support replies are not reaching customers, verify your custom SPF, DKIM, and DMARC DNS settings on your domain registrar. Ensure you have authorized mailers.supportai.com. You can also view failed delivery trace codes directly inside our outbound queue log viewer in Settings."
  },
  {
    id: "kb_7",
    title: "Setting up SAML Single Sign-On (SSO)",
    category: "Account & Security",
    status: "published",
    lastUpdated: "Aug 02, 2026",
    views: 710,
    content: "Enterprise plans support SAML 2.0 identity providers such as Okta, OneLogin, and Microsoft Entra ID. Log in as an Administrator, upload your IdP metadata XML or provide the SSO Target URL and Certificate, and enforce SSO login options for all workspace users under Settings > Authentication."
  },
  {
    id: "kb_8",
    title: "How to export conversation transcripts",
    category: "Data Export",
    status: "published",
    lastUpdated: "Jul 10, 2026",
    views: 184,
    content: "You can export conversation data in CSV or JSON format. Go to Analytics, select a custom date range, and click 'Export Report'. Selected filters are respected. Larger datasets will be processed asynchronously and emailed as a secure download link."
  },
  {
    id: "kb_9",
    title: "Customizing widget styling and color palettes",
    category: "Customizations",
    status: "published",
    lastUpdated: "Aug 09, 2026",
    views: 450,
    content: "The support widget supports CSS custom properties and custom themes. In Settings > Appearance > Custom Widget, select brand primary colors, font mappings, widget placement (left/right bottom), custom greetings, and configure avatar placeholders to fit your team design rules."
  },
  {
    id: "kb_10",
    title: "Managing auto-resolution thresholds",
    category: "AI Rules",
    status: "draft",
    lastUpdated: "Aug 11, 2026",
    views: 45,
    content: "This guide explains the AI Auto-resolve feature. The auto-resolution mechanism automatically marks questions solved if the client states positive confirmation, or if a generated reply scores above 95% confidence matching index on key terms, without a follow-up query after 4 hours."
  },
  { id: "kb_11", title: "API Rate limits and quotas", category: "Integrations & API", status: "published", lastUpdated: "Jan 12, 2026", views: 320, content: "Our REST APIs allow up to 100 requests per minute on Pro and 1000 requests per minute on Enterprise. Authenticate using Bearer tokens." },
  { id: "kb_12", title: "Custom domain forwarding setup", category: "Customizations", status: "published", lastUpdated: "Feb 10, 2026", views: 241, content: "CNAME your support domain to domains.supportai.com to host articles on support.yourbrand.com." },
  { id: "kb_13", title: "Connecting Slack integration", category: "Integrations & API", status: "published", lastUpdated: "Mar 11, 2026", views: 532, content: "Receive instant escalation alerts in your Slack channels and reply to customers directly from Slack." },
  { id: "kb_14", title: "Configuring business hours & SLAs", category: "AI Rules", status: "published", lastUpdated: "Jun 02, 2026", views: 198, content: "Define operating hours to trigger custom human-handoff rules when agents are offline." },
  { id: "kb_15", title: "Spam filtering & blocking users", category: "Troubleshooting", status: "published", lastUpdated: "Jul 05, 2026", views: 110, content: "Block spam domains and configure custom capture rules to prevent tickets spam." }
];

export const defaultSettings: Settings = {
  workspaceName: "Acme Support",
  companyLogo: "⚡",
  timezone: "America/New_York (EST)",
  language: "en-US",
  aiEnabled: true,
  aiTone: "friendly",
  aiLength: "medium",
  autoResolve: true,
  handoffThreshold: 75,
  emailNotifications: true,
  newConversationAlerts: true,
  escalationAlerts: true,
  appearance: "dark"
};

export const mockNotifications: Notification[] = [
  { id: "not_1", title: "High Escalation Rate", message: "Client Harvey Specter requested Tier 3 manager escalation.", time: "5m ago", read: false, type: "alert" },
  { id: "not_2", title: "Knowledge Base Scan", message: "AI trained on 15 custom articles successfully.", time: "1h ago", read: true, type: "success" },
  { id: "not_3", title: "New Enterprise Sign-up", message: "Acme Corp completed onboarding checklist.", time: "3h ago", read: true, type: "info" }
];

// Predefined AI suggestions for key flows
export const aiConversationalReplies: Record<string, string[]> = {
  "conv_1": [
    "Hi Sarah, I've verified your transaction log. It looks like there was a duplicate token post on your checkout. I have automatically queued a refund of $79.00 to your credit card. You should see it in your bank statement in 3-5 days. Let me know if you need anything else!",
    "Hello Sarah, I apologize for the duplicate charge. I have filed the refund request, and it is now being processed. We have also credited $10 to your account for the inconvenience. Let me know if that works!"
  ],
  "conv_2": [
    "Alex, I checked our webhook logs for your workspace. We recorded three consecutive 504 timeouts to api.designhub.io/v1/webhooks. It appears your server took longer than 5000ms to acknowledge the POST. I suggest reviewing your router's connection pool size.",
    "Hey Alex! It looks like your webhook endpoint is hitting a timeout. I can delay retry intervals or whitelist your server IPs if that helps route traffic faster."
  ],
  "conv_4": [
    "Hi David, yes, SupportAI supports static dedicated outbound IPs on our Enterprise plan. This allows you to whitelist specific proxy endpoints in your firewall. I've sent the proxy routing table to your email. Would you like me to connect you with an account manager to provision this?",
    "Hello David. Static dedicated outbound IPs are available as a network add-on for Enterprise tier customers. Let me know if you would like to enable the trial."
  ],
  "conv_5": [
    "Mr. Specter, our engineering team has deployed a hotfix to our balancer nodes in US-East. Service is fully restored, and we are validating routing queues now. I am also paging our SLA compliance lead to review account credits. We apologize for the downtime.",
    "I understand the urgency, Harvey. The incident has been mitigated and all web hosts are back up. I have escalated this log to our Operations Director."
  ],
  "default": [
    "Thank you for reaching out! Let me check the documentation and help you resolve this issue immediately. I am scanning our system logs for relevant details.",
    "I have logged this ticket and will review the account credentials to troubleshoot. I'll provide an update shortly."
  ]
};
