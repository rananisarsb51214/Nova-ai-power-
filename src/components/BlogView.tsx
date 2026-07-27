import React from 'react';
import { Sparkles, Calendar, ArrowRight, User } from 'lucide-react';

export function BlogView() {
  const posts = [
    {
      title: 'Architecting Autonomous Multi-Agent Swarms with Next.js 15 & Gemini',
      date: 'July 27, 2026',
      author: 'Nisar AI Engineering Team',
      category: 'AI Agents',
      excerpt: 'Discover how we built asynchronous agent loops with automated PR creation, real-time memory RAG, and self-healing error correction.'
    },
    {
      title: 'Scaling PostgreSQL & Supabase for Real-Time Collaborative Apps',
      date: 'July 20, 2026',
      author: 'Database Architect',
      category: 'Database',
      excerpt: 'Best practices for handling concurrent writes, row-level security policies, and high-performance connection pooling in enterprise SaaS.'
    },
    {
      title: 'The Future of AI Coding Assistants: Why 100 Expert Skills Matter',
      date: 'July 15, 2026',
      author: 'Product Engineering',
      category: 'Engineering',
      excerpt: 'Why static code generation falls short and how curated expert Markdown skill specifications ensure production-grade software quality.'
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-12 w-full">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 text-xs font-mono border border-indigo-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nova AI Engineering Blog</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white">Latest Insights & Architecture</h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">Deep dives into AI systems engineering, cloud architecture, and full-stack development.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {posts.map((post, idx) => (
            <div key={idx} className="p-8 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-4 hover:border-indigo-500/50 transition-all group">
              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800">{post.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span>•</span>
                <span>{post.author}</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="pt-2">
                <button className="text-indigo-400 text-xs font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
