// client/src/components/maintenance/ServiceNavigation.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ServiceNavigation = ({ projectId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'services',
      label: 'Services',
      path: `/dashboard/project/${projectId}/services`,
      icon: '🔧'
    },
    {
      id: 'upgrade',
      label: 'Upgrade',
      path: `/dashboard/project/${projectId}/upgrade`,
      icon: '⬆️'
    },
    {
      id: 'support',
      label: 'Support',
      path: `/dashboard/project/${projectId}/support`,
      icon: '🛠️'
    }
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    return tabs.find(tab => currentPath.includes(tab.id))?.id || 'services';
  };

  const activeTab = getActiveTab();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                  ${isActive
                    ? 'border-[#3A1A1A] text-[#3A1A1A]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ServiceNavigation;