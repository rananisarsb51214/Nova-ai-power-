import React, { useState, useEffect, useRef } from 'react';
import { Database, Plus, Trash2, Search, Sparkles, CheckCircle2, Shield, HardDrive, RefreshCw, Download, Upload, Copy, Check, FileJson, X, Filter, Tag, Share2, ExternalLink, FileText, Code2, Send, Link } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, where, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface MemoryItem {
  id?: string;
  userId: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
  createdAt: number;
}

export function DatabaseMemoryVault() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Codebase State');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [tagsInput, setTagsInput] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  const [sharingSnippet, setSharingSnippet] = useState<MemoryItem | null>(null);

  const [dbError, setDbError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setDbError('Authentication required to sync with Firestore.');
      return;
    }
    setDbError(null);
    
    // Primary query filtered by userId
    const q = query(
      collection(db, 'nova_database_memory'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: MemoryItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as MemoryItem;
        if (data.userId === user.uid) {
          items.push({ id: docSnap.id, ...data });
        }
      });
      setMemories(items);
      setDbError(null);
    }, (error) => {
      console.warn('Primary Firestore index query failed, falling back to simple query:', error.message);
      
      // Fallback query without orderBy in case composite index is building or permissions re-sync
      const fallbackQ = query(
        collection(db, 'nova_database_memory'),
        where('userId', '==', user.uid)
      );

      const fallbackUnsub = onSnapshot(fallbackQ, (snapshot) => {
        const items: MemoryItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as MemoryItem;
          if (data.userId === user.uid) {
            items.push({ id: docSnap.id, ...data });
          }
        });
        items.sort((a, b) => b.createdAt - a.createdAt);
        setMemories(items);
        setDbError(null);
      }, (fallbackErr) => {
        console.error('Error fetching database memory:', fallbackErr);
        setDbError(fallbackErr.message || 'Unable to sync memory vault with Firestore');
      });

      return () => fallbackUnsub();
    });

    return () => unsubscribe();
  }, [user]);

  const parseTags = (input: string): string[] => {
    return Array.from(new Set(
      input
        .split(/[,#\s]+/)
        .map(t => t.trim().toLowerCase())
        .filter(t => t.length > 0)
    ));
  };

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      showToast('Please sign in to save database memory items.', 'error');
      return;
    }
    if (!title.trim() || !content.trim()) {
      showToast('Please enter both memory title and content.', 'error');
      return;
    }

    const tags = parseTags(tagsInput);

    setLoading(true);
    try {
      await addDoc(collection(db, 'nova_database_memory'), {
        userId: user.uid,
        title,
        content,
        category,
        tags,
        createdAt: Date.now()
      });
      setTitle('');
      setContent('');
      setTagsInput('');
      showToast('Memory item successfully stored with tags in Firestore!', 'success');
    } catch (err: any) {
      showToast('Failed to store memory: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTagFromItem = async (mem: MemoryItem, tagToRemove: string) => {
    if (!mem.id) return;
    const updatedTags = (mem.tags || []).filter(t => t !== tagToRemove);
    try {
      await updateDoc(doc(db, 'nova_database_memory', mem.id), {
        tags: updatedTags
      });
      showToast(`Tag #${tagToRemove} removed.`, 'info');
    } catch (err: any) {
      showToast('Failed to update tags: ' + err.message, 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'nova_database_memory', id));
      showToast('Memory item deleted from database.', 'info');
    } catch (err: any) {
      showToast('Failed to delete memory: ' + err.message, 'error');
    }
  };

  const handleExportJson = () => {
    if (memories.length === 0) {
      showToast('No memory items to export.', 'info');
      return;
    }
    const exportPayload = {
      app: "Nova AI Studio - Database Memory Vault",
      version: "1.1",
      exportedAt: new Date().toISOString(),
      totalRecords: memories.length,
      memories: memories.map(m => ({
        title: m.title,
        category: m.category,
        content: m.content,
        tags: m.tags || [],
        createdAt: m.createdAt,
        id: m.id
      }))
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nova_ai_database_memories_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Successfully exported ${memories.length} memory items as JSON!`, 'success');
  };

  const handleExportSingleItem = (mem: MemoryItem) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mem, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `memory_${mem.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(`Exported "${mem.title}" as JSON backup file!`, 'success');
  };

  const handleShareSnippet = (mem: MemoryItem) => {
    setSharingSnippet(mem);
    // Quick copy as Markdown text
    const markdownFormatted = `### ${mem.title}\n**Category:** ${mem.category}${mem.tags?.length ? ` | **Tags:** ${mem.tags.map(t => '#' + t).join(' ')}` : ''}\n\n\`\`\`\n${mem.content}\n\`\`\`\n*Exported from Nova AI Database Memory Vault*`;
    navigator.clipboard.writeText(markdownFormatted);
    showToast(`Snippet "${mem.title}" formatted & copied to clipboard for sharing!`, 'success');
  };

  const handleCopyFormattedShare = (mem: MemoryItem, format: 'markdown' | 'text' | 'json') => {
    let output = '';
    if (format === 'markdown') {
      output = `### ${mem.title}\n**Category:** ${mem.category}${mem.tags?.length ? ` | **Tags:** ${mem.tags.map(t => '#' + t).join(' ')}` : ''}\n\n\`\`\`\n${mem.content}\n\`\`\``;
    } else if (format === 'text') {
      output = `${mem.title.toUpperCase()}\nCategory: ${mem.category}\nTags: ${mem.tags?.join(', ') || 'None'}\n\n${mem.content}`;
    } else if (format === 'json') {
      output = JSON.stringify(mem, null, 2);
    }
    navigator.clipboard.writeText(output);
    showToast(`Copied snippet as ${format.toUpperCase()}!`, 'success');
  };

  const handleCopyContent = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied memory content to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImportJsonFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const itemsToImport: any[] = Array.isArray(json) ? json : (Array.isArray(json.memories) ? json.memories : []);
        
        if (itemsToImport.length === 0) {
          showToast('No valid memory items found in selected JSON file.', 'error');
          return;
        }

        let importedCount = 0;
        for (const item of itemsToImport) {
          if (item.title && item.content) {
            const rawTags = Array.isArray(item.tags) ? item.tags : [];
            await addDoc(collection(db, 'nova_database_memory'), {
              userId: user.uid,
              title: item.title,
              content: item.content,
              category: item.category || 'Imported Memory',
              tags: rawTags.map((t: any) => String(t).toLowerCase().trim()).filter(Boolean),
              createdAt: item.createdAt || Date.now()
            });
            importedCount++;
          }
        }
        showToast(`Successfully imported ${importedCount} items into database!`, 'success');
      } catch (err: any) {
        showToast('Failed to parse JSON backup file: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  // Collect all unique tags across user memories
  const allUniqueTags = Array.from(
    new Set(memories.flatMap(m => m.tags || []))
  ).sort();

  const filteredMemories = memories.filter(m => {
    const matchesCategory = selectedCategoryFilter === 'All' || m.category === selectedCategoryFilter;
    const matchesTagFilter = !selectedTagFilter || (m.tags && m.tags.includes(selectedTagFilter));

    const q = search.trim().toLowerCase();
    if (!q) return matchesCategory && matchesTagFilter;

    const matchesTitle = m.title.toLowerCase().includes(q);
    const matchesContent = m.content.toLowerCase().includes(q);
    const matchesCategoryName = m.category.toLowerCase().includes(q);
    const matchesTagSearch = m.tags?.some(t => t.toLowerCase().includes(q)) ?? false;
    const matchesId = m.id ? m.id.toLowerCase().includes(q) : false;

    return matchesCategory && matchesTagFilter && (matchesTitle || matchesContent || matchesCategoryName || matchesTagSearch || matchesId);
  });

  const availableCategories = ['All', 'Codebase State', 'Prompt History', 'Agent Context', 'Environment Config', 'Repo Inspector', 'Imported Memory'];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-slate-900/80 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-indigo-400" />
            Nova AI Database Memory Vault (Firestore)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time persistent cloud memory store for prompt history, codebase state, and agent context.</p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto flex-wrap gap-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJsonFile}
            accept=".json,application/json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0"
            title="Import memory items from JSON file backup"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={handleExportJson}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all shrink-0"
            title="Export all database memories as a JSON file"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON ({memories.length})</span>
          </button>

          {/* Real-time Search Bar with Clear Button */}
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-indigo-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by snippet name, content, or category..."
              className="w-full pl-10 pr-9 py-2 text-xs bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-2.5 p-0.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                title="Clear search filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6">
        {/* Create Memory Form */}
        <div className="w-full lg:w-96 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shrink-0">
          <form onSubmit={handleAddMemory} className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" />
              Store New Memory Item
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Memory Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Production API Schema v3"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Codebase State">Codebase State</option>
                <option value="Prompt History">Prompt History</option>
                <option value="Agent Context">Agent Context</option>
                <option value="Environment Config">Environment Config</option>
                <option value="Repo Inspector">Repo Inspector</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                <span>Custom Tags / Labels</span>
                <span className="text-[10px] text-slate-500">Comma separated</span>
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. api, auth, production"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {tagsInput.trim() && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {parseTags(tagsInput).map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Memory Content / Payload</label>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter detailed memory payload, JSON structure, or notes..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
              <span>{loading ? 'Saving to Firestore...' : 'Store Memory in Database'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Firestore Cloud Storage Active
            </p>
            <p>Database: gen-lang-client-0171270179</p>
          </div>
        </div>

        {/* Memories List with Filter Bar */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 overflow-y-auto space-y-4">
          <div className="space-y-3 pb-3 border-b border-slate-800/80">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Stored Database Memories</span>
                  <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/80 rounded-full">
                    {filteredMemories.length} / {memories.length}
                  </span>
                </h3>
                {(search || selectedTagFilter) && (
                  <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                    <span>Filtering by:</span>
                    {search && <span className="text-indigo-300 font-semibold font-mono">"{search}"</span>}
                    {selectedTagFilter && (
                      <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-md font-mono text-[10px]">
                        #{selectedTagFilter}
                      </span>
                    )}
                  </p>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto text-[11px] w-full sm:w-auto no-scrollbar">
                <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all whitespace-nowrap ${
                      selectedCategoryFilter === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tag Filter Pills Row */}
            {allUniqueTags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap text-[11px] pt-1 border-t border-slate-800/50">
                <span className="text-[11px] text-slate-500 flex items-center gap-1 mr-1">
                  <Tag className="w-3 h-3 text-slate-400" /> Quick Tags:
                </span>
                <button
                  onClick={() => setSelectedTagFilter(null)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all ${
                    selectedTagFilter === null
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  All Tags
                </button>
                {allUniqueTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTagFilter(selectedTagFilter === tag ? null : tag)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all flex items-center gap-1 ${
                      selectedTagFilter === tag
                        ? 'bg-indigo-600 text-white font-bold shadow-sm'
                        : 'bg-slate-950 text-indigo-300 hover:bg-indigo-950/60 border border-indigo-900/60'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredMemories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMemories.map((mem) => (
                <div key={mem.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-3 hover:border-indigo-500/50 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                          {mem.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                        <button
                          onClick={() => handleShareSnippet(mem)}
                          className="px-2.5 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all shadow-sm group"
                          title="Share snippet as Markdown, Plain Text or JSON"
                        >
                          <Share2 className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                          <span>Share</span>
                        </button>

                        <button
                          onClick={() => handleExportSingleItem(mem)}
                          className="px-2.5 py-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all shadow-sm group"
                          title="Export single snippet to JSON backup file"
                        >
                          <FileJson className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                          <span>Export JSON</span>
                        </button>

                        <button
                          onClick={() => mem.id && handleCopyContent(mem.id, mem.content)}
                          className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700"
                          title="Copy memory content text"
                        >
                          {copiedId === mem.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => mem.id && handleDelete(mem.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 transition-colors rounded-lg bg-slate-950 border border-slate-800 hover:border-red-900/60"
                          title="Delete memory snippet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-bold text-white">{mem.title}</h4>

                    {/* Tag Badges on Memory Cards */}
                    {mem.tags && mem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {mem.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 bg-slate-950 text-indigo-300 border border-indigo-900/80 rounded-md group hover:border-indigo-500 transition-colors cursor-pointer"
                            onClick={() => setSelectedTagFilter(selectedTagFilter === tag ? null : tag)}
                            title={`Filter by #${tag}`}
                          >
                            <span>#{tag}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveTagFromItem(mem, tag);
                              }}
                              className="text-slate-500 hover:text-red-400 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5"
                              title="Remove tag"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs font-mono text-slate-300 mt-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 whitespace-pre-wrap leading-relaxed">
                      {mem.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>ID: {mem.id?.substring(0, 8)}...</span>
                    <span>{new Date(mem.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-3">
              <Search className="w-8 h-8 text-slate-600" />
              <div className="text-center space-y-1">
                <p className="text-xs font-semibold text-slate-300">
                  {search || selectedCategoryFilter !== 'All' || selectedTagFilter
                    ? `No memories matched your search or tag filters.` 
                    : `No database memory items stored yet.`}
                </p>
                <p className="text-[11px] text-slate-500">
                  {search || selectedCategoryFilter !== 'All' || selectedTagFilter
                    ? `Try adjusting your search terms or clearing category & tag filters.`
                    : `Use the form on the left to add your first persistent memory.`}
                </p>
              </div>

              {(search || selectedCategoryFilter !== 'All' || selectedTagFilter) && (
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedCategoryFilter('All');
                    setSelectedTagFilter(null);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded-xl text-xs font-semibold transition-all"
                >
                  Clear Search & Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Share Snippet Options Modal */}
      {sharingSnippet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setSharingSnippet(null)} />
          
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl z-10 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Share Memory Snippet</h3>
                  <p className="text-xs text-slate-400 truncate max-w-xs">"{sharingSnippet.title}"</p>
                </div>
              </div>
              <button
                onClick={() => setSharingSnippet(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-300">Choose Export & Sharing Format:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleCopyFormattedShare(sharingSnippet, 'markdown')}
                  className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-white/10 hover:border-indigo-500/40 rounded-2xl text-left transition-all flex items-start space-x-3 group"
                >
                  <FileText className="w-4 h-4 text-indigo-400 mt-0.5 group-hover:scale-110 transition-transform shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Copy Markdown</div>
                    <div className="text-[10px] text-slate-400">Formatted for Discord & Docs</div>
                  </div>
                </button>

                <button
                  onClick={() => handleCopyFormattedShare(sharingSnippet, 'text')}
                  className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-white/10 hover:border-indigo-500/40 rounded-2xl text-left transition-all flex items-start space-x-3 group"
                >
                  <Code2 className="w-4 h-4 text-cyan-400 mt-0.5 group-hover:scale-110 transition-transform shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Copy Plain Text</div>
                    <div className="text-[10px] text-slate-400">Raw content & tags payload</div>
                  </div>
                </button>

                <button
                  onClick={() => handleCopyFormattedShare(sharingSnippet, 'json')}
                  className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-white/10 hover:border-indigo-500/40 rounded-2xl text-left transition-all flex items-start space-x-3 group"
                >
                  <FileJson className="w-4 h-4 text-purple-400 mt-0.5 group-hover:scale-110 transition-transform shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Copy Raw JSON</div>
                    <div className="text-[10px] text-slate-400">Formatted JSON string</div>
                  </div>
                </button>

                <button
                  onClick={() => handleExportSingleItem(sharingSnippet)}
                  className="p-3 bg-slate-950 hover:bg-slate-800/80 border border-white/10 hover:border-indigo-500/40 rounded-2xl text-left transition-all flex items-start space-x-3 group"
                >
                  <Download className="w-4 h-4 text-emerald-400 mt-0.5 group-hover:scale-110 transition-transform shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Download .JSON</div>
                    <div className="text-[10px] text-slate-400">Save standalone JSON backup</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex justify-end">
              <button
                onClick={() => setSharingSnippet(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
