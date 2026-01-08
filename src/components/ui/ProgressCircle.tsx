import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProgressCircleProps {
  score: number;
  size?: number;
  trend?: 'up' | 'down' | 'stable';
  showTrend?: boolean;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  score,
  size = 200,
  trend = 'stable',
  showTrend = true,
}) => {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    return '#14b8a6'; // teal
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52">
        <svg className="transform -rotate-90 w-full h-full" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getScoreColor(score)}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl sm:text-4xl font-bold text-gray-900">{score}%</span>
          <span className="text-xs sm:text-sm text-gray-500 mt-1">Ready</span>
        </div>
      </div>
      {showTrend && (
        <div className="flex items-center gap-1 mt-4">
          {getTrendIcon()}
          <span className="text-sm text-gray-600">
            {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
          </span>
        </div>
      )}
    </div>
  );
};
