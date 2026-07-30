import React, { useState, useEffect, useRef } from 'react';
import { Database, Plus, Trash2, Search, Sparkles, CheckCircle2, Shield, HardDrive, RefreshCw, Download, Upload, Copy, Check, FileJson } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface MemoryItem {
  id?: string;
  userId: string;
  title: string;
  content: string;
  category: string;
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
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
    }, (error) => {
      console.error('Error fetching database memory:', error);
    });

    return () => unsubscribe();
  }, [user]);

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

    setLoading(true);
    try {
      await addDoc(collection(db, 'nova_database_memory'), {
        userId: user.uid,
        title,
        content,
        category,
        createdAt: Date.now()
      });
      setTitle('');
      setContent('');
      showToast('Memory item successfully stored in Firestore database!', 'success');
    } catch (err: any) {
      showToast('Failed to store memory: ' + err.message, 'error');
    } finally {
      setLoading(false);
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
      version: "1.0",
      exportedAt: new Date().toISOString(),
      totalRecords: memories.length,
      memories: memories.map(m => ({
        title: m.title,
        category: m.category,
        content: m.content,
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
    showToast(`Exported "${mem.title}" as JSON!`, 'success');
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
            await addDoc(collection(db, 'nova_database_memory'), {
              userId: user.uid,
              title: item.title,
              content: item.content,
              category: item.category || 'Imported Memory',
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

  const filteredMemories = memories.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) || 
    m.content.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

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

          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search database memory..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
              </select>
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

        {/* Memories List */}
        <div className="flex-1 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Stored Database Memories ({filteredMemories.length})</h3>
            <span className="text-xs font-mono text-slate-400">Real-time sync enabled</span>
          </div>

          {filteredMemories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMemories.map((mem) => (
                <div key={mem.id} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-3 hover:border-indigo-500/50 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                        {mem.category}
                      </span>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => mem.id && handleCopyContent(mem.id, mem.content)}
                          className="p-1 text-slate-500 hover:text-indigo-400 transition-colors rounded-md hover:bg-slate-800"
                          title="Copy memory content"
                        >
                          {copiedId === mem.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => handleExportSingleItem(mem)}
                          className="p-1 text-slate-500 hover:text-indigo-400 transition-colors rounded-md hover:bg-slate-800"
                          title="Download snippet as JSON file"
                        >
                          <FileJson className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => mem.id && handleDelete(mem.id)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors rounded-md hover:bg-slate-800"
                          title="Delete memory"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-white">{mem.title}</h4>
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
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-2">
              <HardDrive className="w-8 h-8 text-slate-600" />
              <p className="text-xs">No database memory items stored yet.</p>
              <p className="text-[11px] text-slate-600">Use the form on the left to add your first persistent memory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
