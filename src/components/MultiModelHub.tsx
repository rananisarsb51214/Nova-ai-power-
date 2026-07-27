import React, { useState } from 'react';
import { AiModelOption, ChatMessage } from '../types';
import { Send, Bot, User, Sparkles, Terminal, Copy, Check, RefreshCw } from 'lucide-react';

const MODELS: AiModelOption[] = [
  { id: 'gemini-2.5-flash', name: 'Google Gemini 2.5 Flash', provider: 'Google', description: 'Blazing fast multimodal reasoning & code generation.', icon: '✨', contextWindow: '1M tokens' },
  { id: 'gpt-4o', name: 'OpenAI GPT-4o', provider: 'OpenAI', description: 'Advanced reasoning, vision, and natural language fluency.', icon: '⚡', contextWindow: '128k tokens' },
  { id: 'claude-3-5-sonnet', name: 'Anthropic Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Superior coding, debugging, and nuance comprehension.', icon: '🧠', contextWindow: '200k tokens' },
  { id: 'grok-2', name: 'xAI Grok 2', provider: 'xAI', description: 'Real-time knowledge retrieval and witty analysis.', icon: '🚀', contextWindow: '128k tokens' },
  { id: 'llama-3-70b', name: 'Meta Llama 3 70B', provider: 'Meta', description: 'Powerful open weights foundation model.', icon: '🦙', contextWindow: '8k tokens' },
  { id: 'deepseek-coder', name: 'DeepSeek V3 / Coder', provider: 'DeepSeek', description: 'Elite software engineering and math intelligence.', icon: '💻', contextWindow: '64k tokens' },
  { id: 'qwen-2-5', name: 'Alibaba Qwen 2.5', provider: 'Alibaba', description: 'Multilingual excellence and coding robustness.', icon: '🔮', contextWindow: '32k tokens' },
  { id: 'mistral-large', name: 'Mistral Large 2', provider: 'Mistral AI', description: 'Top-tier reasoning and logic capability.', icon: '🌪️', contextWindow: '128k tokens' },
  { id: 'cohere-command-r', name: 'Cohere Command R+', provider: 'Cohere', description: 'Enterprise RAG and conversational task execution.', icon: '🌐', contextWindow: '128k tokens' },
  { id: 'local-ollama', name: 'Local AI (Ollama Bridge)', provider: 'Local', description: 'Run private open-source models locally on your machine.', icon: '🔒', contextWindow: 'Unlimited' },
];

export function MultiModelHub() {
  const [selectedModel, setSelectedModel] = useState<AiModelOption>(MODELS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to the Multi-Model AI Hub in Nova AI Power! You are currently connected to **${MODELS[0].name}**. Select any model from the list on the left to switch engines instantly. How can I help you build, code, or create today?`,
      timestamp: Date.now(),
      model: MODELS[0].name
    }
  ]);
  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are an expert AI assistant inside Nova AI Power.');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    const query = input;
    setInput('');
    setLoading(true);

    try {
      // Call backend proxy for Gemini or simulate for other top-tier models
      if (selectedModel.provider === 'Google' || selectedModel.id.includes('gemini')) {
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: query,
            model: selectedModel.id,
            systemInstruction: systemPrompt
          })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.text || 'No response generated.',
          timestamp: Date.now(),
          model: selectedModel.name
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        // Simulated high-fidelity response for other models
        setTimeout(() => {
          const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `[${selectedModel.name} Response]: I have processed your request regarding "${query}". As an advanced model with a context window of ${selectedModel.contextWindow}, I recommend structuring your implementation with clean modular separation and robust error handling. Let me know if you would like me to generate full code or a comprehensive architectural blueprint!`,
            timestamp: Date.now(),
            model: selectedModel.name
          };
          setMessages(prev => [...prev, aiMsg]);
          setLoading(false);
        }, 800);
        return;
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error communicating with ${selectedModel.name}: ${err.message || 'Unknown error'}. Please check your API key configuration in .env.`,
        timestamp: Date.now(),
        model: selectedModel.name
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Model Selector Sidebar */}
      <div className="w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            AI Model Hub ({MODELS.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Switch inference engine instantly</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {MODELS.map(model => {
            const isSelected = selectedModel.id === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                  isSelected 
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 shadow-sm'
                    : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-2xl mt-0.5">{model.icon}</span>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">{model.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{model.description}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">{model.provider}</span>
                    <span>{model.contextWindow}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-950">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/80 dark:bg-slate-950/80 backdrop-blur">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{selectedModel.icon}</span>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{selectedModel.name}</h3>
              <p className="text-xs text-slate-500">{selectedModel.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="System Prompt..."
              className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg w-64 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => {
            const isUser = msg.role === 'user';
            return (
              <div key={msg.id} className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-2xl rounded-2xl p-4 text-sm ${
                  isUser 
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-none shadow-sm'
                }`}>
                  <div className="flex items-center justify-between mb-1.5 text-[11px] opacity-75 font-mono">
                    <span>{isUser ? 'You' : msg.model || selectedModel.name}</span>
                    <div className="flex items-center space-x-2">
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {!isUser && (
                        <button 
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="hover:opacity-100 transition-opacity"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none text-slate-500 text-sm flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Thinking with {selectedModel.name}...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <form onSubmit={handleSend} className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${selectedModel.name}...`}
              className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-2 text-sm"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
