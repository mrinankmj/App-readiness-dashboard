import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AppUserDashboard } from './views/AppUserDashboard';
import { EngineerDashboard } from './views/EngineerDashboard';
import { OnboardAppModal } from './components/modals/OnboardAppModal';
import { mockAppData, calculateReadinessScore } from './data/mockData';
import { AppData, UserRole, Tool, PhaseItem } from './types';

function App() {
  const [userRole, setUserRole] = useState<UserRole>('app-user');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [appData, setAppData] = useState<AppData>(mockAppData);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRoleSwitch = () => {
    setUserRole(prev => prev === 'app-user' ? 'engineer' : 'app-user');
  };

  const handleAddTool = (stageId: string, toolName: string, toolDescription: string) => {
    setAppData(prev => {
      const newStages = prev.stages.map(stage => {
        if (stage.id === stageId) {
          const newTool: Tool = {
            id: `${toolName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            name: toolName,
            status: 'not-started',
            description: toolDescription,
            configurable: true,
          };
          return {
            ...stage,
            tools: [...stage.tools, newTool],
          };
        }
        return stage;
      });

      return {
        ...prev,
        stages: newStages,
        overallScore: calculateReadinessScore(newStages),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleOnboardApp = (appName: string, appId: string, description: string) => {
    console.log('Onboarding new app:', { appName, appId, description });
    // In a real app, this would create a new app entry
    alert(`App "${appName}" onboarded successfully!`);
  };

  const handleAddPhaseItem = (stageId: string, phaseId: string, itemName: string) => {
    setAppData(prev => {
      const newStages = prev.stages.map(stage => {
        if (stage.id === stageId && stage.phases) {
          const newPhases = stage.phases.map(phase => {
            if (phase.id === phaseId) {
              const newItem: PhaseItem = {
                id: `${itemName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                name: itemName,
                status: 'todo',
              };
              return {
                ...phase,
                items: [...phase.items, newItem],
              };
            }
            return phase;
          });
          return {
            ...stage,
            phases: newPhases,
          };
        }
        return stage;
      });

      return {
        ...prev,
        stages: newStages,
        overallScore: calculateReadinessScore(newStages),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        appName={appData.appName}
        userRole={userRole}
        onRoleSwitch={handleRoleSwitch}
        onOnboardApp={() => setIsOnboardModalOpen(true)}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:sticky top-[73px] h-[calc(100vh-73px)] z-50 lg:z-0
          transition-transform duration-300 ease-in-out
          ${isMobile ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}>
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (isMobile) setIsSidebarOpen(false);
            }}
            isEngineerView={userRole === 'engineer'}
          />
        </div>

        <main className="flex-1 p-4 md:p-6 w-full lg:w-auto">
          <div className="max-w-[1600px] mx-auto">
            {activeTab === 'dashboard' && (
              <>
                {userRole === 'app-user' ? (
                  <AppUserDashboard appData={appData} />
                ) : (
                  <EngineerDashboard 
                    appData={appData} 
                    onAddTool={handleAddTool}
                    onAddPhaseItem={handleAddPhaseItem}
                  />
                )}
              </>
            )}

            {activeTab === 'reports' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports</h2>
                <p className="text-gray-600">Reports view coming soon...</p>
              </div>
            )}

            {activeTab === 'documentation' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentation</h2>
                <p className="text-gray-600">Documentation view coming soon...</p>
              </div>
            )}

            {activeTab === 'apps' && userRole === 'engineer' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">All Applications</h2>
                <p className="text-gray-600">Applications list view coming soon...</p>
              </div>
            )}

            {activeTab === 'team' && userRole === 'engineer' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Team Management</h2>
                <p className="text-gray-600">Team management view coming soon...</p>
              </div>
            )}

            {activeTab === 'settings' && userRole === 'engineer' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
                <p className="text-gray-600">Settings view coming soon...</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <OnboardAppModal
        isOpen={isOnboardModalOpen}
        onClose={() => setIsOnboardModalOpen(false)}
        onOnboard={handleOnboardApp}
      />
    </div>
  );
}

export default App;
