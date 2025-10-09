import React, { useState } from 'react';
import { AppData } from '@/types';
import { ReadinessScoreCard } from '@/components/ReadinessScoreCard';
import { StagesSummary } from '@/components/StagesSummary';
import { PipelineView } from '@/components/PipelineView';
import { AddToolModal } from '@/components/modals/AddToolModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Settings, Database, Users, Activity } from 'lucide-react';

interface EngineerDashboardProps {
  appData: AppData;
  onAddTool: (stageId: string, toolName: string, toolDescription: string) => void;
}

export const EngineerDashboard: React.FC<EngineerDashboardProps> = ({ appData, onAddTool }) => {
  const [isAddToolModalOpen, setIsAddToolModalOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<string>('');

  const handleAddToolClick = (stageId: string) => {
    setSelectedStageId(stageId);
    setIsAddToolModalOpen(true);
  };

  const handleAddTool = (toolName: string, toolDescription: string) => {
    onAddTool(selectedStageId, toolName, toolDescription);
  };

  const selectedStage = appData.stages.find(s => s.id === selectedStageId);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Admin Controls Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-4 md:p-6 text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">Engineer Dashboard</h2>
            <p className="text-primary-100 mt-1 text-sm md:text-base">
              Full control over application configuration and monitoring
            </p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">{appData.stages.length}</div>
              <div className="text-xs md:text-sm text-primary-100">Stages</div>
            </div>
            <div className="w-px h-10 md:h-12 bg-primary-400"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">
                {appData.stages.reduce((acc, s) => acc + s.tools.length, 0)}
              </div>
              <div className="text-xs md:text-sm text-primary-100">Tools</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Section: Score and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-1">
          <ReadinessScoreCard
            score={appData.overallScore}
            trend={appData.trend}
            lastUpdated={appData.lastUpdated}
          />
        </div>
        <div className="lg:col-span-2">
          <StagesSummary stages={appData.stages} />
        </div>
      </div>

      {/* Admin Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <AdminMetricCard
          icon={Settings}
          label="Configurable Tools"
          value={appData.stages.reduce(
            (acc, stage) => acc + stage.tools.filter(t => t.configurable).length,
            0
          )}
          color="bg-purple-500"
        />
        <AdminMetricCard
          icon={Database}
          label="Integrations"
          value={appData.stages.reduce(
            (acc, stage) => acc + stage.tools.filter(t => t.status === 'completed').length,
            0
          )}
          color="bg-green-500"
        />
        <AdminMetricCard
          icon={Activity}
          label="Active Pipelines"
          value={3}
          color="bg-blue-500"
        />
        <AdminMetricCard
          icon={Users}
          label="Team Members"
          value={12}
          color="bg-orange-500"
        />
      </div>

      {/* Pipeline Section with Admin Controls */}
      <div>
        <div className="mb-3 md:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Pipeline Configuration</h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Manage tools and stages for {appData.appName}
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Export
            </button>
            <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
              Add Stage
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6">
          <PipelineView
            stages={appData.stages}
            isEngineerView={true}
            onAddTool={handleAddToolClick}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ActivityItem
              action="Tool integrated"
              details="ACE-D successfully integrated in Code stage"
              time="2 hours ago"
              type="success"
            />
            <ActivityItem
              action="Configuration updated"
              details="PR Checker settings modified"
              time="5 hours ago"
              type="info"
            />
            <ActivityItem
              action="Scan completed"
              details="SonarQube analysis finished with 0 critical issues"
              time="1 day ago"
              type="success"
            />
            <ActivityItem
              action="Tool added"
              details="Nexus IQ added to Scans stage"
              time="2 days ago"
              type="info"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Tool Modal */}
      <AddToolModal
        isOpen={isAddToolModalOpen}
        onClose={() => setIsAddToolModalOpen(false)}
        stageName={selectedStage?.name || ''}
        onAddTool={handleAddTool}
      />
    </div>
  );
};

interface AdminMetricCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}

const AdminMetricCard: React.FC<AdminMetricCardProps> = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs md:text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
};

interface ActivityItemProps {
  action: string;
  details: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ action, details, time, type }) => {
  const typeColors = {
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`w-2 h-2 rounded-full mt-2 ${typeColors[type].replace('100', '500')}`}></div>
      <div className="flex-1">
        <p className="font-medium text-sm text-gray-900">{action}</p>
        <p className="text-sm text-gray-600 mt-0.5">{details}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};
