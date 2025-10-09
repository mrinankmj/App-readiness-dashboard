import React from 'react';
import { Bell, Settings, User, Plus, Menu } from 'lucide-react';
import { UserRole } from '@/types';
import { Button } from './ui/Button';

interface HeaderProps {
  appName: string;
  userRole: UserRole;
  onRoleSwitch: () => void;
  onOnboardApp?: () => void;
  onMenuClick?: () => void;
  isMobile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ appName, userRole, onRoleSwitch, onOnboardApp, onMenuClick, isMobile }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={onMenuClick}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            )}
            
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-lg">AR</span>
              </div>
              <div>
                <h1 className="text-sm md:text-xl font-bold text-gray-900">App Readiness Dashboard</h1>
                <p className="text-xs md:text-sm text-gray-500 hidden sm:block">
                  Application: <span className="font-semibold text-primary-600">{appName}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Role Badge - Hidden on small mobile */}
            <div className="hidden sm:flex items-center gap-2 px-2 md:px-3 py-1.5 bg-gray-100 rounded-lg">
              <User className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
              <span className="text-xs md:text-sm font-medium text-gray-700">
                {userRole === 'engineer' ? 'Engineer' : 'User'}
              </span>
            </div>

            {/* Switch Role Button - Hidden on mobile */}
            <Button variant="outline" size="sm" onClick={onRoleSwitch} className="hidden md:inline-flex">
              Switch to {userRole === 'engineer' ? 'User' : 'Engineer'} View
            </Button>

            {/* Engineer-only: Onboard App Button */}
            {userRole === 'engineer' && (
              <Button variant="primary" size="sm" onClick={onOnboardApp} className="hidden sm:inline-flex">
                <Plus className="w-4 h-4 mr-1" />
                <span className="hidden md:inline">Onboard App</span>
                <span className="md:hidden">Add</span>
              </Button>
            )}

            {/* Notifications - Hidden on small mobile */}
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings - Hidden on mobile */}
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Profile */}
            <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 ring-primary-500 transition-all">
              <span className="text-white font-semibold text-xs md:text-sm">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
