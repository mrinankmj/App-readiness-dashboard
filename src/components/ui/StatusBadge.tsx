import React from 'react';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { ToolStatus } from '@/types';

interface StatusBadgeProps {
  status: ToolStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showIcon = true, size = 'md' }) => {
  const getStatusConfig = (status: ToolStatus) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          iconColor: 'text-green-600',
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          icon: Clock,
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-600',
        };
      case 'blocked':
        return {
          label: 'Blocked',
          icon: AlertCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
        };
      case 'not-started':
      default:
        return {
          label: 'Not Started',
          icon: XCircle,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.bgColor,
        config.textColor,
        sizeClasses[size]
      )}
    >
      {showIcon && <Icon className={clsx(config.iconColor, iconSizes[size])} />}
      {config.label}
    </span>
  );
};
