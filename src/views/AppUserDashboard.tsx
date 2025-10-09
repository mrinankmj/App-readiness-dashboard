import React from 'react';
import { AppData } from '@/types';
import { ReadinessScoreCard } from '@/components/ReadinessScoreCard';
import { StagesSummary } from '@/components/StagesSummary';
import { PipelineView } from '@/components/PipelineView';

interface AppUserDashboardProps {
  appData: AppData;
}

export const AppUserDashboard: React.FC<AppUserDashboardProps> = ({ appData }) => {
  return (
    <div className="space-y-4 md:space-y-6">
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

      {/* Pipeline Section */}
      <div>
        <div className="mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Pipeline Explorer</h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Track your application readiness across all stages
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-6">
          <PipelineView stages={appData.stages} isEngineerView={false} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard
          label="Total Tools"
          value={appData.stages.reduce((acc, stage) => acc + stage.tools.length, 0)}
          color="bg-blue-500"
        />
        <StatCard
          label="Completed"
          value={appData.stages.reduce(
            (acc, stage) => acc + stage.tools.filter(t => t.status === 'completed').length,
            0
          )}
          color="bg-green-500"
        />
        <StatCard
          label="In Progress"
          value={appData.stages.reduce(
            (acc, stage) => acc + stage.tools.filter(t => t.status === 'in-progress').length,
            0
          )}
          color="bg-yellow-500"
        />
        <StatCard
          label="Not Started"
          value={appData.stages.reduce(
            (acc, stage) => acc + stage.tools.filter(t => t.status === 'not-started').length,
            0
          )}
          color="bg-gray-500"
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${color} rounded-lg flex items-center justify-center`}>
          <span className="text-white text-lg md:text-xl font-bold">{value}</span>
        </div>
        <div className="text-center sm:text-left">
          <p className="text-xs md:text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">Active</p>
        </div>
      </div>
    </div>
  );
};
