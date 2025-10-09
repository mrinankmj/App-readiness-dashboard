import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ProgressCircle } from './ui/ProgressCircle';
import { Calendar, Activity } from 'lucide-react';

interface ReadinessScoreCardProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export const ReadinessScoreCard: React.FC<ReadinessScoreCardProps> = ({
  score,
  trend,
  lastUpdated,
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>App Readiness Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <ProgressCircle score={score} trend={trend} showTrend={true} />
        
        <div className="w-full mt-6 pt-6 border-t border-gray-200 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Last Updated</span>
            </div>
            <span className="font-medium text-gray-900">
              {new Date(lastUpdated).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Activity className="w-4 h-4" />
              <span>Status</span>
            </div>
            <span className={`font-medium ${
              score >= 80 ? 'text-green-600' : 
              score >= 50 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {score >= 80 ? 'Production Ready' : 
               score >= 50 ? 'In Progress' : 
               'Needs Attention'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
