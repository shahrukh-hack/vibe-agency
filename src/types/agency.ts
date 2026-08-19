export type AgentStatus = 'idle' | 'running' | 'sleeping' | 'awaiting_approval';
export type AgentDivision = 'Engineering' | 'Design & UX' | 'Marketing & Growth' | 'Operations & ERP';

export interface AgentRole {
  id: string;
  name: string;
  avatar: string;
  role: string;
  division: AgentDivision;
  status: AgentStatus;
  schedule?: string;
  skill: string;
  assignedTasks: number;
  lastHeartbeat: string;
  description: string;
}

export interface InboxMessage {
  id: string;
  fromAgent: string;
  toAgent: string;
  subject: string;
  timestamp: string;
  status: 'unread' | 'processing' | 'completed';
  payload: string;
}

export interface OvernightStep {
  time: string;
  agent: string;
  action: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  summary: string;
}
