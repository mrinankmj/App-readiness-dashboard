import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';
import { Stage } from '@/types';

interface StagesSummaryProps {
  stages: Stage[];
}

export const StagesSummary: React.FC<StagesSummaryProps> = ({ stages }) => {
  const getStageProgress = (stage: Stage) => {
    const completed = stage.tools.filter(t => t.status === 'completed').length;
    return (completed / stage.tools.length) * 100;
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
              const completed = stage.tools.filter(t => t.status === 'completed').length;
              const total = stage.tools.length;

              return (
                <div key={stage.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stage.color }}
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
                    color={stage.color}
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
