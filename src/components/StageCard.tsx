import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';
import { StatusBadge } from './ui/StatusBadge';
import { PhaseModal } from './modals/PhaseModal';
import { AddPhaseItemModal } from './modals/AddPhaseItemModal';
import { Stage, Tool, Phase } from '@/types';
import clsx from 'clsx';

interface StageCardProps {
  stage: Stage;
  isEngineerView?: boolean;
  onAddTool?: (stageId: string) => void;
  onAddPhaseItem?: (stageId: string, phaseId: string, itemName: string) => void;
}

export const StageCard: React.FC<StageCardProps> = ({ stage, isEngineerView = false, onAddTool, onAddPhaseItem }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);
  const [isPhaseModalOpen, setIsPhaseModalOpen] = useState(false);
  const [isAddPhaseItemModalOpen, setIsAddPhaseItemModalOpen] = useState(false);
  const [selectedPhaseForAdd, setSelectedPhaseForAdd] = useState<Phase | null>(null);

  // Calculate progress based on tools or phases
  let completedItems = 0;
  let totalItems = 0;
  let progress = 0;

  if (stage.phases) {
    stage.phases.forEach(phase => {
      totalItems += phase.items.length;
      completedItems += phase.items.filter(item => item.status === 'complete').length;
    });
    progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  } else {
    completedItems = stage.tools.filter(tool => tool.status === 'completed').length;
    totalItems = stage.tools.length;
    progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  }

  const handlePhaseClick = (phase: Phase) => {
    setSelectedPhase(phase);
    setIsPhaseModalOpen(true);
  };

  const handleAddPhaseItemClick = (e: React.MouseEvent, phase: Phase) => {
    e.stopPropagation();
    setSelectedPhaseForAdd(phase);
    setIsAddPhaseItemModalOpen(true);
  };

  const handleAddPhaseItem = (itemName: string) => {
    if (selectedPhaseForAdd && onAddPhaseItem) {
      onAddPhaseItem(stage.id, selectedPhaseForAdd.id, itemName);
    }
  };

  const isPhaseComplete = (phase: Phase): boolean => {
    return phase.items.every(item => item.status === 'complete');
  };

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
              style={{ backgroundColor: '#14b8a6' }}
            />
            <CardTitle className="text-base">{stage.name}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {completedItems}/{totalItems}
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
          <ProgressBar progress={progress} color="#14b8a6" showLabel={false} />
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          {stage.phases ? (
            // Render phases
            <div className="space-y-3">
              {stage.phases
                .sort((a, b) => a.order - b.order)
                .map((phase) => {
                  const isComplete = isPhaseComplete(phase);
                  const completedCount = phase.items.filter(item => item.status === 'complete').length;
                  
                  return (
                    <div key={phase.id} className="space-y-2">
                      <div
                        onClick={() => handlePhaseClick(phase)}
                        className="p-3 rounded-lg border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all cursor-pointer bg-white"
                      >
                        <div className="flex items-center justify-between gap-3">
                          {/* Phase name and circles */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="font-medium text-sm text-gray-900 whitespace-nowrap">{phase.name}</span>
                            {/* Multiple circle indicators - one for each item */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {phase.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-center flex-shrink-0">
                                  {item.status === 'complete' ? (
                                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                      <CheckCircle2 className="w-3 h-3 text-white" />
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-red-500 bg-white"></div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Count badge */}
                          <div className="flex-shrink-0">
                            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                              {completedCount}/{phase.items.length}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Add Item button for engineer view */}
                      {isEngineerView && (
                        <button
                          onClick={(e) => handleAddPhaseItemClick(e, phase)}
                          className="w-full py-2 px-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all"
                        >
                          + Add Item
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            // Render tools
            <div className="space-y-3">
              {stage.tools.map((tool) => (
                <ToolItem key={tool.id} tool={tool} isEngineerView={isEngineerView} />
              ))}
            </div>
          )}

          {isEngineerView && !stage.phases && (
            <button
              onClick={() => onAddTool?.(stage.id)}
              className="w-full mt-4 py-2 px-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              + Add Tool
            </button>
          )}
        </CardContent>
      )}

      <PhaseModal
        isOpen={isPhaseModalOpen}
        onClose={() => {
          setIsPhaseModalOpen(false);
          setSelectedPhase(null);
        }}
        phase={selectedPhase}
      />

      <AddPhaseItemModal
        isOpen={isAddPhaseItemModalOpen}
        onClose={() => {
          setIsAddPhaseItemModalOpen(false);
          setSelectedPhaseForAdd(null);
        }}
        phaseName={selectedPhaseForAdd?.name || ''}
        onAddItem={handleAddPhaseItem}
      />
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
        'bg-red-50 border-red-200', // TODO/not-started: red instead of grey
        isEngineerView && 'cursor-pointer hover:shadow-md hover:border-primary-300'
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
