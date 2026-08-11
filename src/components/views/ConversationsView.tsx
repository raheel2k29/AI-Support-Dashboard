'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Conversation, Message } from '../../types';
import { 
  Search, 
  Sparkles, 
  Send, 
  Paperclip, 
  Smile, 
  User, 
  Mail, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  MessageSquare,
  ChevronLeft,
  Info,
  CheckCircle,
  ThumbsUp,
  Brain
} from 'lucide-react';

export const ConversationsView: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendUserMessage,
    isAiThinking,
    aiSuggestion,
    setAiSuggestion,
    generateAiReplySuggestion,
    triggerHandoff,
    resolveConversation,
    addToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [replyText, setReplyText] = useState('');
  const [showRightPanel, setShowRightPanel] = useState(true);

  // States for generating suggestion inside composer
  const [generatingSuggestion, setGeneratingSuggestion] = useState(false);
  const [suggestionStep, setSuggestionStep] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || null;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isAiThinking]);

  // Filter conversations
  const filteredConversations = conversations.filter(c => {
    const matchesSearch = c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || c.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSend = () => {
    if (!activeConversation || !replyText.trim()) return;
    sendUserMessage(activeConversation.id, replyText);
    setReplyText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const triggerGenerateReply = () => {
    if (!activeConversation) return;
    setGeneratingSuggestion(true);
    setSuggestionStep('Analyzing conversation context...');
    
    setTimeout(() => {
      setSuggestionStep('Generating response with trained context...');
      setTimeout(() => {
        setGeneratingSuggestion(false);
        setSuggestionStep('');
        generateAiReplySuggestion(activeConversation.id);
      }, 1000);
    }, 1000);
  };

  const applySuggestion = () => {
    if (aiSuggestion) {
      setReplyText(aiSuggestion);
      setAiSuggestion(null);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 shadow-xs relative">
      
      {/* COLUMN 1: Conversation List */}
      <div className={`w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 ${
        activeConversationId && 'hidden md:flex'
      }`}>
        {/* Search */}
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex flex-col gap-2 bg-zinc-50/50 dark:bg-zinc-900/10">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-zinc-900 dark:text-zinc-50"
            />
          </div>
          {/* Status filters */}
          <div className="flex gap-1.5 mt-1">
            {(['all', 'open', 'resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`flex-1 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  statusFilter === tab
                    ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-150 dark:divide-zinc-850">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
              No conversations found
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              const hasAlert = conv.priority === 'high' && conv.status === 'open';
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${
                    isActive ? 'bg-zinc-100/70 dark:bg-zinc-900/60' : ''
                  }`}
                >
                  {/* Avatar with unread indicator */}
                  <div className="relative">
                    <img
                      src={conv.customerAvatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                    />
                    {conv.unread && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white dark:border-zinc-950" />
                    )}
                  </div>

                  {/* Body details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-50 truncate">
                        {conv.customerName}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-505 shrink-0 ml-1">
                        {conv.lastActive}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-0.5 truncate ${
                      conv.unread 
                        ? 'font-semibold text-zinc-900 dark:text-zinc-50' 
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}>
                      {conv.lastMessage}
                    </p>

                    {/* Priority / Status labels */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                        conv.priority === 'high'
                          ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20'
                          : conv.priority === 'medium'
                          ? 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20'
                          : 'text-zinc-500 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-900'
                      }`}>
                        {conv.priority}
                      </span>
                      <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                        {conv.intent}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* COLUMN 2: Chat Window */}
      <div className={`flex-1 flex flex-col h-full bg-zinc-50/30 dark:bg-zinc-950/10 ${
        !activeConversationId && 'hidden md:flex'
      }`}>
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="p-1 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={activeConversation.customerAvatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 leading-none">
                    {activeConversation.customerName}
                  </h4>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-505 font-medium mt-1 inline-block">
                    Online • {activeConversation.customerEmail}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerHandoff(activeConversation.id)}
                  className="px-2.5 py-1.5 text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-150/50 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  Escalate
                </button>
                {activeConversation.status !== 'resolved' && (
                  <button
                    onClick={() => resolveConversation(activeConversation.id)}
                    className="px-2.5 py-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                  >
                    Mark Resolved
                  </button>
                )}
                <button
                  onClick={() => setShowRightPanel(!showRightPanel)}
                  className={`p-1.5 rounded-lg border text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors ${
                    showRightPanel 
                      ? 'border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-500' 
                      : 'border-zinc-200 dark:border-zinc-850'
                  }`}
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConversation.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isAi = msg.sender === 'ai';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isCustomer ? 'mr-auto' : 'ml-auto flex-row-reverse'
                    }`}
                  >
                    {isCustomer ? (
                      <img
                        src={activeConversation.customerAvatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-zinc-200 dark:border-zinc-800"
                      />
                    ) : (
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isAi 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}>
                        {isAi ? "AI" : "ME"}
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <div className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isCustomer
                          ? 'bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 text-zinc-800 dark:text-zinc-200 rounded-tl-xs'
                          : isAi
                          ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs shadow-indigo-600/5'
                          : 'bg-zinc-850 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-950 rounded-tr-xs shadow-xs'
                      }`}>
                        {msg.content}
                      </div>
                      <span className={`text-[9px] text-zinc-400 dark:text-zinc-550 ${
                        isCustomer ? 'text-left pl-1' : 'text-right pr-1'
                      }`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* AI Thinking Animation */}
              {isAiThinking && (
                <div className="flex items-start gap-2.5 max-w-[85%] mr-auto">
                  <img
                    src={activeConversation.customerAvatar}
                    alt=""
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-tl-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce-subtle" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce-subtle" style={{ animationDelay: '200ms' }} />
                      <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce-subtle" style={{ animationDelay: '400ms' }} />
                    </div>
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 pl-1">
                      Customer is typing...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Composer */}
            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col gap-2.5">
              {/* Suggestion Indicator */}
              {generatingSuggestion ? (
                <div className="px-3 py-2 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 rounded-xl flex items-center gap-2.5 text-xs text-indigo-600 dark:text-indigo-400">
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0" />
                  <span className="font-medium animate-pulse">{suggestionStep}</span>
                </div>
              ) : aiSuggestion ? (
                <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-150 dark:border-indigo-900/50 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                      <Brain className="w-3 h-3 shrink-0" />
                      Draft suggested by AI
                    </span>
                    <button 
                      onClick={() => setAiSuggestion(null)}
                      className="text-[10px] font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      Dismiss
                    </button>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium line-clamp-3">
                    {aiSuggestion}
                  </p>
                  <div className="flex gap-2 justify-end mt-1">
                    <button
                      onClick={applySuggestion}
                      className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold shadow-sm shadow-indigo-600/10"
                    >
                      Insert Draft
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Input Area */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => addToast('Attachment selector opened (simulated)', 'info')}
                  className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => addToast('Emoji selector opened (simulated)', 'info')}
                  className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Smile className="w-4 h-4" />
                </button>
                
                <textarea
                  placeholder="Type your response here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 resize-none h-9 max-h-24"
                />

                {/* Generate AI suggestion button */}
                <button
                  onClick={triggerGenerateReply}
                  className="p-2 rounded-xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-950/40 transition-all flex items-center justify-center shrink-0"
                  title="Generate AI Suggestion"
                >
                  <Sparkles className="w-4.5 h-4.5" />
                </button>

                {/* Send button */}
                <button
                  onClick={handleSend}
                  disabled={!replyText.trim()}
                  className="p-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-50/10 dark:bg-zinc-950/5">
            <MessageSquare className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mt-3">No active chat selected</h4>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs">Select a conversation from the panel list to manage active support responses.</p>
          </div>
        )}
      </div>

      {/* COLUMN 3: Customer Details Panel */}
      {showRightPanel && activeConversation && (
        <div className="w-64 border-l border-zinc-200 dark:border-zinc-800 flex flex-col h-full overflow-y-auto shrink-0 bg-white dark:bg-zinc-950 p-4 space-y-5 absolute md:static right-0 top-0 bottom-0 z-20 shadow-xl md:shadow-none">
          {/* Avatar Header */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-100 dark:border-zinc-900">
            <img
              src={activeConversation.customerAvatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover border border-zinc-200 dark:border-zinc-800 shadow-sm"
            />
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mt-3 leading-none">
              {activeConversation.customerName}
            </h4>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-550 font-medium mt-1">
              {activeConversation.customerEmail}
            </span>
          </div>

          {/* Customer Metadata stats */}
          <div className="space-y-3.5">
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Customer Profile
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-850/50 flex flex-col">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">Subscription</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-300 mt-1 inline-flex items-center gap-1">
                  <CreditCard className="w-3 h-3 text-indigo-500 shrink-0" />
                  {activeConversation.plan}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-150 dark:border-zinc-850/50 flex flex-col">
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">Lifetime LTV</span>
                <span className="font-bold text-zinc-700 dark:text-zinc-300 mt-1 inline-flex items-center gap-0.5">
                  <DollarSign className="w-3 h-3 text-emerald-500 shrink-0" />
                  {activeConversation.ltv}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Customer since
                </span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-350">{activeConversation.customerSince}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Last active
                </span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-355">{activeConversation.lastActive}</span>
              </div>
            </div>
          </div>

          {/* AI Customer Insights */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
              <Brain className="w-3.5 h-3.5 shrink-0" />
              AI Customer Insights
            </span>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block font-medium">Sentiment</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 mt-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  activeConversation.sentiment === 'happy'
                    ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30'
                    : activeConversation.sentiment === 'frustrated' || activeConversation.sentiment === 'angry'
                    ? 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/30'
                    : 'text-zinc-500 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-900'
                }`}>
                  {activeConversation.sentiment}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block font-medium">Detected Intent</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 mt-1 block">
                  {activeConversation.intent}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block font-medium">Suggested Action</span>
                <span className="text-zinc-600 dark:text-zinc-300 font-medium text-[11px] leading-relaxed mt-1 block">
                  {activeConversation.suggestedAction}
                </span>
              </div>
            </div>
          </div>

          {/* Action List Buttons */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-2">
            <button
              onClick={() => addToast('Adding customer note (simulated)', 'info')}
              className="w-full py-2 px-3 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
            >
              Add Note
            </button>
            <button
              onClick={() => addToast('Ticket assigned to Raheel', 'success')}
              className="w-full py-2 px-3 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-750 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
            >
              Assign to me
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
