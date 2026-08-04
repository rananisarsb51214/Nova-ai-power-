export type TabType = 
  | 'hub' 
  | 'dev' 
  | 'vibe_responding'
  | 'vibe_coding'
  | 'nova_video_demo'
  | 'agents' 
  | 'commercial' 
  | 'skills'
  | 'memory'
  | 'repo_inspector'
  | 'landing'
  | 'pricing'
  | 'docs'
  | 'blog'
  | 'contact'
  | 'admin'
  | 'creative'
  | 'business'
  | 'automation'
  | 'social'
  | 'enterprise';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  model?: string;
}

export interface AiModelOption {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string;
  contextWindow: string;
}

export interface GeneratedProject {
  id?: string;
  userId: string;
  title: string;
  description: string;
  type: 'fullstack' | 'website' | 'saas' | 'api' | 'mobile';
  code: string;
  createdAt: number;
}

export interface AgentTask {
  id?: string;
  userId: string;
  name: string;
  goal: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  logs: string[];
  createdAt: number;
}

export interface KanbanItem {
  id?: string;
  userId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface WorkflowItem {
  id?: string;
  userId: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  executions: number;
}

export interface BrandKitItem {
  id?: string;
  userId: string;
  brandName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  fontPairing: string;
  logoStyle: string;
}
