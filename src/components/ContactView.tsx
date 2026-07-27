import React, { useState } from 'react';
import { Mail, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function ContactView() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all fields.', 'error');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      showToast('Message sent successfully! Our engineering team will respond within 24 hours.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto px-6 py-16">
      <div className="max-w-2xl mx-auto space-y-8 w-full">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 text-xs font-mono border border-indigo-800">
            <Mail className="w-3.5 h-3.5" />
            <span>24/7 Enterprise Support</span>
          </div>
          <h1 className="text-3xl font-black text-white">Get in Touch with Nova AI</h1>
          <p className="text-xs text-slate-400">Have questions about custom enterprise deployments or API limits? Send us a message.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-2xl">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Your Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nisar Ahmed"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Work Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nisarrsna@gmail.com"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Message / Inquiry</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your enterprise requirements or technical questions..."
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {sending ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{sending ? 'Sending Message...' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
