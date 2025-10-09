import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StageCard } from './StageCard';
import { Stage } from '@/types';

interface PipelineViewProps {
  stages: Stage[];
  isEngineerView?: boolean;
  onAddTool?: (stageId: string) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  stages,
  isEngineerView = false,
  onAddTool,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}

      {/* Pipeline Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex items-start gap-6 px-8 min-w-min">
          {stages
            .sort((a, b) => a.order - b.order)
            .map((stage, index) => (
              <React.Fragment key={stage.id}>
                <StageCard
                  stage={stage}
                  isEngineerView={isEngineerView}
                  onAddTool={onAddTool}
                />
                {index < stages.length - 1 && (
                  <div className="flex items-center justify-center pt-24">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                        >
                          <polygon
                            points="0 0, 10 3, 0 6"
                            fill="#9ca3af"
                          />
                        </marker>
                      </defs>
                      <line
                        x1="0"
                        y1="20"
                        x2="35"
                        y2="20"
                        stroke="#9ca3af"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
