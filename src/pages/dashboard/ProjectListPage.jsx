// client/src/pages/dashboard/ProjectListPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authAPI } from '../../services/api/auth';

// Components
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';
import ProjectCard from '../../components/dashboard/ProjectCard';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const ProjectListPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();
  const { addToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name'); // name, stage, id

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await authAPI.getDashboard();
      
      if (data.odooLead && Array.isArray(data.odooLead)) {
        setProjects(data.odooLead);
      } else if (data.odooLead && !Array.isArray(data.odooLead)) {
        // Handle single project case - convert to array
        setProjects([data.odooLead]);
      } else {
        setProjects([]);
      }
    } catch (error) {
      addToast('Failed to load projects', 'error');
      console.error('Project fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    addToast('Logged out successfully', 'success');
  };

  const sortProjects = (projects, sortBy) => {
    const sorted = [...projects];
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      case 'stage':
        return sorted.sort((a, b) => {
          const stageA = a.stage_id?.[0] || 0;
          const stageB = b.stage_id?.[0] || 0;
          return stageB - stageA; // Higher stage first
        });
      case 'id':
        return sorted.sort((a, b) => b.id - a.id); // Newer first
      default:
        return sorted;
    }
  };

  const sortedProjects = sortProjects(projects, sortBy);

  const renderNoProjects = () => (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-[#F1E6DD] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#AF7C71]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat mb-2">
          No Projects Found
        </h3>
        
        <p className="text-[#6B4B41] font-nunito mb-6">
          No projects are associated with your phone number. Please contact our support team for assistance.
        </p>
        
        <div className="space-y-3">
          <p className="text-sm text-[#6B4B41] font-nunito">
            <strong>Registered Phone:</strong> {state.user?.phone}
          </p>
          <p className="text-sm text-[#6B4B41] font-nunito">
            <strong>Support:</strong> +91 62052 81574
          </p>
        </div>

        <div className="mt-6">
          <Button onClick={() => window.location.href = 'tel:+916205281574'}>
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );

  const renderProjectGrid = () => (
    <div className="space-y-6">
      {/* Header Section */}
      {/* <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-[#3A1A1A] font-montserrat mb-2">
              Welcome, {state.user?.firstName}!
            </h2>
            <p className="text-[#6B4B41] font-nunito mb-4">
              You have {projects.length} project{projects.length !== 1 ? 's' : ''} with us. Click on any project to view detailed progress.
            </p>
          </div>
          <div className="text-sm text-right">
            <p className="text-[#6B4B41] font-nunito">
              <strong>Phone:</strong> {state.user?.phone}
            </p>
          </div>
        </div>
      </div> */}

      {/* Sorting Controls */}
      <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat">
            Your Projects ({projects.length})
            </h3>
        
            {/* <div className="flex items-center space-x-2">
            <label className="text-sm text-[#6B4B41] font-nunito">Sort by:</label>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-[#D7C5AA] rounded-md text-sm font-nunito focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent"
            >
                <option value="name">Project Name</option>
                <option value="stage">Current Stage</option>
                <option value="id">Order ID</option>
            </select>
            </div> */}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1E6DD] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#F1E6DD] flex flex-col">
    {/* Header */}
    <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                alt="Modula Logo"
                width="120"
                height="40"
                className="h-10 w-auto"
                src="/modua.png"
                style={{ color: "transparent" }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <h1 
                className="text-2xl font-bold text-[#3A1A1A] font-montserrat"
                style={{ display: 'none' }}
              >
                Modula
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="font-montserrat text-[14px] leading-[18px] font-bold bg-[#3A1A1A] text-white px-4 py-2 rounded-[30px] hover:bg-[#4F372F] transition-colors text-center"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {projects.length === 0 ? renderNoProjects() : renderProjectGrid()}
    </main>

    {/* Footer */}
    <Footer />
  </div>
);
};

export default ProjectListPage;