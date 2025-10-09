export type ToolStatus = 'completed' | 'in-progress' | 'not-started' | 'blocked';

export interface Tool {
  id: string;
  name: string;
  status: ToolStatus;
  description?: string;
  lastUpdated?: string;
  configurable?: boolean;
}

export interface Stage {
  id: string;
  name: string;
  description: string;
  tools: Tool[];
  order: number;
  color: string;
}

export interface AppData {
  appName: string;
  appId: string;
  overallScore: number;
  stages: Stage[];
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

export type UserRole = 'app-user' | 'engineer';
