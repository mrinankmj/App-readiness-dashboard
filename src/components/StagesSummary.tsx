import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';
import { Stage } from '@/types';

interface StagesSummaryProps {
  stages: Stage[];
}

export const StagesSummary: React.FC<StagesSummaryProps> = ({ stages }) => {
  const getStageProgress = (stage: Stage) => {
    if (stage.phases) {
      let totalItems = 0;
      let completedItems = 0;
      stage.phases.forEach(phase => {
        totalItems += phase.items.length;
        completedItems += phase.items.filter(item => item.status === 'complete').length;
      });
      return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    } else {
      const completed = stage.tools.filter(t => t.status === 'completed').length;
      return stage.tools.length > 0 ? (completed / stage.tools.length) * 100 : 0;
    }
  };

  const getStageCounts = (stage: Stage) => {
    if (stage.phases) {
      let totalItems = 0;
      let completedItems = 0;
      stage.phases.forEach(phase => {
        totalItems += phase.items.length;
        completedItems += phase.items.filter(item => item.status === 'complete').length;
      });
      return { completed: completedItems, total: totalItems };
    } else {
      return {
        completed: stage.tools.filter(t => t.status === 'completed').length,
        total: stage.tools.length,
      };
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stages Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages
            .sort((a, b) => a.order - b.order)
            .map((stage) => {
              const progress = getStageProgress(stage);
              const { completed, total } = getStageCounts(stage);

              return (
                <div key={stage.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: '#14b8a6' }}
                      />
                      <span className="font-medium text-sm text-gray-900">
                        {stage.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {completed}/{total} tools
                    </span>
                  </div>
                  <ProgressBar
                    progress={progress}
                    color="#14b8a6"
                    showLabel={false}
                    height="h-2"
                  />
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
};
