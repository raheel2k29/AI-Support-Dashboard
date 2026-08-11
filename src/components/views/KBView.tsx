'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KBArticle } from '../../types';
import { BookOpen, Plus, Sparkles, Eye, Edit2, Calendar, FileText, X } from 'lucide-react';

export const KBView: React.FC = () => {
  const { kbArticles, setKbArticles, trainAiModel, isTrainingAi, addToast } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Editor modal state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('Account & Security');
  const [editStatus, setEditStatus] = useState<'published' | 'draft'>('published');
  const [editContent, setEditContent] = useState('');

  // Categories
  const categories = ['all', 'Account & Security', 'Billing & Invoicing', 'Integrations & API', 'Troubleshooting', 'Customizations'];

  // Stats
  const totalArticles = kbArticles.length;
  const publishedCount = kbArticles.filter(a => a.status === 'published').length;
  const draftCount = kbArticles.filter(a => a.status === 'draft').length;
  const totalViews = kbArticles.reduce((acc, curr) => acc + curr.views, 0);

  const filteredArticles = kbArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase()) || 
                          art.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || art.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) {
      addToast('Please fill out all fields', 'error');
      return;
    }

    const newArticle: KBArticle = {
      id: `kb_${Date.now()}`,
      title: editTitle,
      category: editCategory,
      status: editStatus,
      lastUpdated: 'Today',
      views: 0,
      content: editContent
    };

    setKbArticles([newArticle, ...kbArticles]);
    addToast(`Article "${editTitle}" saved successfully`, 'success');
    setEditorOpen(false);
    
    // Reset editor fields
    setEditTitle('');
    setEditContent('');
  };

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Articles", value: totalArticles, icon: FileText, color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20" },
          { label: "Published Articles", value: publishedCount, icon: BookOpen, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
          { label: "Draft Documents", value: draftCount, icon: Edit2, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
          { label: "Cumulative Reads", value: totalViews.toLocaleString(), icon: Eye, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-505 font-semibold block">{stat.label}</span>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{stat.value}</h4>
              </div>
              <div className={`p-2 rounded-xl shrink-0 ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Control Actions Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 px-3.5 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-zinc-900 dark:text-zinc-50"
          />
          {/* Category Selector */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-zinc-700 dark:text-zinc-300"
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={() => trainAiModel()}
            disabled={isTrainingAi}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-indigo-150 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-950/40 disabled:opacity-50 transition-colors"
          >
            <Sparkles className="w-4 h-4 fill-current shrink-0" />
            {isTrainingAi ? 'Training AI...' : 'Train AI'}
          </button>
          <button
            onClick={() => setEditorOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/10"
          >
            <Plus className="w-4 h-4 shrink-0" />
            Add Article
          </button>
        </div>
      </div>

      {/* Articles Table Grid */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-850 text-zinc-400 dark:text-zinc-500 font-semibold bg-zinc-50/50 dark:bg-zinc-900/10">
                <th className="py-3.5 px-6 font-semibold">Article Title</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Last Updated</th>
                <th className="py-3.5 px-4 font-semibold">Views</th>
                <th className="py-3.5 px-6 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {filteredArticles.map((art) => (
                <tr key={art.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-3.5 px-6">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-55 block">
                      {art.title}
                    </span>
                    <p className="text-[10px] text-zinc-450 dark:text-zinc-500 truncate max-w-xs mt-1">
                      {art.content}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-500 dark:text-zinc-400 font-medium">
                    {art.category}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 dark:text-zinc-500 font-medium">
                    {art.lastUpdated}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-300 font-bold">
                    {art.views.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      art.status === 'published'
                        ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20'
                        : 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20'
                    }`}>
                      {art.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Train AI Progress Modal Simulation */}
      {isTrainingAi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl z-55 flex flex-col items-center text-center space-y-4 animate-fade-in">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl text-indigo-500">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-zinc-50">AI Syncing in Progress</h4>
              <p className="text-xs text-zinc-450 dark:text-zinc-500 mt-1 max-w-[240px] leading-relaxed">
                Reading documents metadata, building token indices, and publishing vectors embeddings.
              </p>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden relative">
              <div className="h-full bg-indigo-600 animate-[pulse_1.5s_infinite] w-3/4 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Editor Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs" onClick={() => setEditorOpen(false)} />
          <form 
            onSubmit={handleSaveArticle}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xl z-55 flex flex-col gap-4 animate-fade-in"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-150 dark:border-zinc-850">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">Add New Knowledge Article</h3>
              <button 
                type="button" 
                onClick={() => setEditorOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Article Title</label>
              <input
                type="text"
                placeholder="e.g. Setting up webhooks signature verification"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-900 dark:text-zinc-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-700 dark:text-zinc-300"
                >
                  {categories.filter(c => c !== 'all').map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as 'published' | 'draft')}
                  className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-700 dark:text-zinc-300"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-wider">Markdown Content</label>
              <textarea
                placeholder="Write the guide content here..."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none text-zinc-900 dark:text-zinc-50 min-h-[120px] resize-y"
              />
            </div>

            <div className="flex gap-2 justify-end pt-3 border-t border-zinc-150 dark:border-zinc-850">
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="py-1.5 px-3.5 text-xs font-semibold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-1.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-600/10"
              >
                Save Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
