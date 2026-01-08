import { AppData, Stage, Phase } from '@/types';

export const mockStages: Stage[] = [
  {
    id: 'design',
    name: 'Design',
    description: 'Design and documentation phase',
    order: 1,
    color: '#8b5cf6',
    tools: [
      {
        id: 'sdd',
        name: 'SDD',
        status: 'completed',
        description: 'Software Design Document',
        lastUpdated: '2025-10-05T10:30:00Z',
      },
      {
        id: 'jira',
        name: 'Jira',
        status: 'completed',
        description: 'Project tracking',
        lastUpdated: '2025-10-06T14:20:00Z',
      },
      {
        id: 'confluence',
        name: 'Confluence',
        status: 'not-started',
        description: 'Documentation platform',
      },
    ],
  },
  {
    id: 'code',
    name: 'Code',
    description: 'Development and code management',
    order: 2,
    color: '#3b82f6',
    tools: [
      {
        id: 'ace-d',
        name: 'ACE-D',
        status: 'completed',
        description: 'Development environment',
        lastUpdated: '2025-10-07T11:45:00Z',
      },
      {
        id: 'pr-checker',
        name: 'PR Checker',
        status: 'not-started',
        description: 'Pull request validation',
      },
      {
        id: 'git',
        name: 'Git',
        status: 'completed',
        description: 'Version control',
        lastUpdated: '2025-10-07T16:00:00Z',
      },
      {
        id: 'multi-branch-ci',
        name: 'Multi Branch CI',
        status: 'in-progress',
        description: 'Continuous integration',
        lastUpdated: '2025-10-08T09:00:00Z',
      },
    ],
  },
  {
    id: 'scans',
    name: 'Scans',
    description: 'Security and quality scans',
    order: 3,
    color: '#10b981',
    tools: [
      {
        id: 'sonarqube',
        name: 'SonarQube',
        status: 'completed',
        description: 'Code quality analysis',
        lastUpdated: '2025-10-07T13:20:00Z',
      },
      {
        id: 'cyberflow-sast',
        name: 'Cyberflow SAST',
        status: 'completed',
        description: 'Static security testing',
        lastUpdated: '2025-10-08T10:15:00Z',
      },
      {
        id: 'nexus-iq',
        name: 'Nexus IQ',
        status: 'not-started',
        description: 'Component analysis',
      },
    ],
  },
  {
    id: 'test',
    name: 'Test',
    description: 'Testing and quality assurance',
    order: 4,
    color: '#f59e0b',
    tools: [
      {
        id: 'cucumber',
        name: 'Cucumber',
        status: 'completed',
        description: 'BDD testing framework',
        lastUpdated: '2025-10-08T12:00:00Z',
      },
      {
        id: 'testng',
        name: 'TestNG',
        status: 'completed',
        description: 'Testing framework',
        lastUpdated: '2025-10-08T13:00:00Z',
      },
      {
        id: 'selenium',
        name: 'Selenium',
        status: 'not-started',
        description: 'Browser automation',
      },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: 'DevOps and observability',
    order: 5,
    color: '#3b82f6',
    tools: [],
    phases: [
      {
        id: 'phase-1',
        name: 'Phase 1',
        order: 1,
        items: [
          {
            id: 'standard-pipeline',
            name: 'Standard pipeline skeleton',
            status: 'complete',
          },
          {
            id: 'env-policy',
            name: 'Env policy as code',
            status: 'complete',
          },
          {
            id: 'shared-lib',
            name: 'Shared-lib adoption',
            status: 'todo',
          },
          {
            id: 'central-observability',
            name: 'Central observability',
            status: 'todo',
          },
          {
            id: 'ai-diagnostics',
            name: 'AI for diagnostics only',
            status: 'todo',
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Phase 2',
        order: 2,
        items: [
          {
            id: 'auto-prs',
            name: 'Auto PRs for fixes',
            status: 'complete',
          },
          {
            id: 'hotfix-workflows',
            name: 'Hotfix workflows',
            status: 'complete',
          },
          {
            id: 'release-doc',
            name: 'Release doc automation',
            status: 'todo',
          },
          {
            id: 'cross-repo',
            name: 'Cross-repo impact detection',
            status: 'todo',
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Phase 3',
        order: 3,
        items: [
          {
            id: 'mcp-agents',
            name: 'MCP-based agents',
            status: 'todo',
          },
          {
            id: 'self-service-debug',
            name: 'Self-service debugging',
            status: 'todo',
          },
          {
            id: 'predictive-failures',
            name: 'Predictive failures',
            status: 'todo',
          },
          {
            id: 'platform-slo',
            name: 'Platform-level SLO ownership',
            status: 'todo',
          },
        ],
      },
    ],
  },
];

export const calculateReadinessScore = (stages: Stage[]): number => {
  let totalItems = 0;
  let completedItems = 0;

  stages.forEach(stage => {
    if (stage.phases) {
      // Handle phases
      stage.phases.forEach(phase => {
        totalItems += phase.items.length;
        completedItems += phase.items.filter(item => item.status === 'complete').length;
      });
    } else {
      // Handle tools
      totalItems += stage.tools.length;
      completedItems += stage.tools.filter(tool => tool.status === 'completed').length;
    }
  });

  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
};

export const mockAppData: AppData = {
  appName: 'DOM-PARTY',
  appId: 'dom-party-001',
  overallScore: calculateReadinessScore(mockStages),
  stages: mockStages,
  lastUpdated: '2026-01-09T00:00:00Z',
  trend: 'up',
};
