// client/src/components/dashboard/ProjectCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StageMapper } from '../../services/tracking/stageMapper';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/project/${project.id}`);
  };

  const getStageInfo = () => {
    const stageId = project.stage_id?.[0];
    
    if (!StageMapper.isStageVisible(stageId)) {
      return {
        name: 'Processing',
        progress: 0,
        color: 'bg-gray-400'
      };
    }

    const customStage = StageMapper.getCustomStage(stageId);
    const progressPercentage = StageMapper.getProgressPercentage(stageId);
    
    let stageColor = 'bg-gray-400';
    if (progressPercentage >= 80) stageColor = 'bg-green-500';
    else if (progressPercentage >= 40) stageColor = 'bg-blue-500';
    else if (progressPercentage >= 20) stageColor = 'bg-yellow-500';
    else stageColor = 'bg-orange-500';

    return {
      name: customStage,
      progress: progressPercentage,
      color: stageColor
    };
  };

  const stageInfo = getStageInfo();
  const currentStageId = project.stage_id?.[0];

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm border border-[#D7C5AA] p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-[#AF7C71] group"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#3A1A1A] font-montserrat group-hover:text-[#AF7C71] transition-colors">
            {project.name || 'Modula Project'}
          </h3>
          {/* <p className="text-sm text-[#6B4B41] font-nunito">
            Order ID: #{project.id}
          </p> */}
        </div>
        
        {/* Status Badge */}
        <div>
          <p className="text-sm text-[#6B4B41] font-nunito">
            Order ID: #{project.id}
          </p>
        </div>
        {/* <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${stageInfo.color}`}>
          {stageInfo.name}
        </div> */}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        {/* <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#6B4B41] font-nunito">Progress</span>
          <span className="text-sm font-medium text-[#3A1A1A] font-montserrat">{stageInfo.progress}%</span>
        </div> */}
        {/* <div className="w-full bg-[#F1E6DD] rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${stageInfo.color}`}
            style={{ width: `${stageInfo.progress}%` }}
          ></div>
        </div> */}
      </div>

      {/* Project Details */}
      <div className="space-y-2">
        {/* <div className="flex justify-between text-sm">
          <span className="text-[#6B4B41] font-nunito">Phone:</span>
          <span className="font-medium text-[#3A1A1A] font-montserrat">{project.phone}</span>
        </div> */}
        
        {/* {project.email_from && (
          <div className="flex justify-between text-sm">
            <span className="text-[#6B4B41] font-nunito">Email:</span>
            <span className="font-medium text-[#3A1A1A] font-montserrat text-right flex-1 ml-2 truncate">
              {project.email_from}
            </span>
          </div>
        )} */}

        <div className="flex justify-between text-sm">
          <span className="text-[#6B4B41] font-nunito">Current Stage:</span>
          {/* <span className="font-medium text-[#3A1A1A] font-montserrat">Stage {currentStageId}</span> */}
          <span className="font-medium text-[#3A1A1A] font-montserrat">{stageInfo.name}</span>

        </div>
      </div>

      {/* Action Indicator */}
      <div className="mt-4 pt-4 border-t border-[#F1E6DD]">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B4B41] font-nunito">Click to view details</span>
          <svg 
            className="w-5 h-5 text-[#AF7C71] group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;