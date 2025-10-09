import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  FileText,
  Users,
  Package,
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isEngineerView: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isEngineerView }) => {
  const userTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'documentation', label: 'Documentation', icon: FileText },
  ];

  const engineerTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'apps', label: 'All Apps', icon: Package },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const tabs = isEngineerView ? engineerTabs : userTabs;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)] sticky top-[73px]">
      <nav className="p-4 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                activeTab === tab.id
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
