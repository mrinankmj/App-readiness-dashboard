import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';
import { StatusBadge } from './ui/StatusBadge';
import { Stage, Tool } from '@/types';
import clsx from 'clsx';

interface StageCardProps {
  stage: Stage;
  isEngineerView?: boolean;
  onAddTool?: (stageId: string) => void;
}

export const StageCard: React.FC<StageCardProps> = ({ stage, isEngineerView = false, onAddTool }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedTools = stage.tools.filter(tool => tool.status === 'completed').length;
  const progress = (completedTools / stage.tools.length) * 100;

  return (
    <Card className="min-w-[280px] sm:min-w-[320px] max-w-[380px]">
      <CardHeader
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: stage.color }}
            />
            <CardTitle className="text-base">{stage.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {completedTools}/{stage.tools.length}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
        <div className="mt-3">
          <ProgressBar progress={progress} color={stage.color} showLabel={false} />
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-3">
            {stage.tools.map((tool) => (
              <ToolItem key={tool.id} tool={tool} isEngineerView={isEngineerView} />
            ))}
          </div>

          {isEngineerView && (
            <button
              onClick={() => onAddTool?.(stage.id)}
              className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-primary-500 hover:text-primary-600 transition-colors"
            >
              + Add Tool
            </button>
          )}
        </CardContent>
      )}
    </Card>
  );
};

interface ToolItemProps {
  tool: Tool;
  isEngineerView: boolean;
}

const ToolItem: React.FC<ToolItemProps> = ({ tool, isEngineerView }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={clsx(
        'p-3 rounded-lg border transition-all',
        tool.status === 'completed' ? 'bg-green-50 border-green-200' :
        tool.status === 'in-progress' ? 'bg-yellow-50 border-yellow-200' :
        tool.status === 'blocked' ? 'bg-red-50 border-red-200' :
        'bg-gray-50 border-gray-200',
        isEngineerView && 'cursor-pointer hover:shadow-sm'
      )}
      onClick={() => isEngineerView && setShowDetails(!showDetails)}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-gray-900">{tool.name}</span>
        <StatusBadge status={tool.status} size="sm" showIcon={false} />
      </div>

      {tool.description && (
        <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
      )}

      {showDetails && tool.lastUpdated && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Last updated: {new Date(tool.lastUpdated).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
