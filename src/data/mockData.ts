import { AppData, Stage } from '@/types';

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
        status: 'completed',
        description: 'Documentation platform',
        lastUpdated: '2025-10-05T09:15:00Z',
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
        status: 'in-progress',
        description: 'Pull request validation',
        lastUpdated: '2025-10-08T08:30:00Z',
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
        status: 'in-progress',
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
        status: 'not-started',
        description: 'BDD testing framework',
      },
      {
        id: 'testng',
        name: 'TestNG',
        status: 'not-started',
        description: 'Testing framework',
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
    id: 'deploy',
    name: 'Deploy',
    description: 'Deployment and release',
    order: 5,
    color: '#ef4444',
    tools: [
      {
        id: 'jenkins',
        name: 'Jenkins',
        status: 'not-started',
        description: 'CI/CD automation',
      },
      {
        id: 'nexus',
        name: 'Nexus',
        status: 'not-started',
        description: 'Artifact repository',
      },
      {
        id: 'aws',
        name: 'AWS',
        status: 'not-started',
        description: 'Cloud infrastructure',
      },
      {
        id: 'shp',
        name: 'SHP',
        status: 'not-started',
        description: 'Secure hosting platform',
      },
      {
        id: 'ikp',
        name: 'IKP',
        status: 'not-started',
        description: 'Infrastructure platform',
      },
    ],
  },
  {
    id: 'monitor',
    name: 'Monitor/Observability',
    description: 'Monitoring and observability',
    order: 6,
    color: '#ec4899',
    tools: [
      {
        id: 'splunk',
        name: 'Splunk',
        status: 'not-started',
        description: 'Log management',
      },
      {
        id: 'appd',
        name: 'AppDynamics',
        status: 'not-started',
        description: 'Application performance monitoring',
      },
    ],
  },
];

export const calculateReadinessScore = (stages: Stage[]): number => {
  const allTools = stages.flatMap(stage => stage.tools);
  const completedTools = allTools.filter(tool => tool.status === 'completed').length;
  return Math.round((completedTools / allTools.length) * 100);
};

export const mockAppData: AppData = {
  appName: 'DOM-PARTY',
  appId: 'dom-party-001',
  overallScore: calculateReadinessScore(mockStages),
  stages: mockStages,
  lastUpdated: '2025-10-08T23:09:44+05:30',
  trend: 'up',
};
