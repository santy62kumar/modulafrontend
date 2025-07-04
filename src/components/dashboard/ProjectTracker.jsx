// // client/src/components/dashboard/ProjectTracker.jsx
// import React from 'react';
// import { StageMapper } from '../../services/tracking/stageMapper';
// import ProgressIndicator from './ProgressIndicator';

// const ProjectTracker = ({ stageId, odooLead }) => {
//   const currentProjectStage = StageMapper.getCurrentProjectStage(stageId);
//   const projectProgress = StageMapper.getProjectProgress(stageId);
//   const allProjectStages = StageMapper.getAllProjectStages();

//   if (!currentProjectStage) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//         <h3 className="text-lg font-semibold text-primary-500 font-montserrat mb-4">
//           Project Tracking
//         </h3>
//         <p className="text-primary-400 font-nunito">
//           Unable to determine project stage.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-primary-500">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-semibold text-primary-500 font-montserrat">
//           Project Tracking
//         </h3>
        
//       </div>

      

//       {/* Progress Indicator */}
//       <ProgressIndicator
//         stages={allProjectStages}
//         currentStage={currentProjectStage.currentStage}
//         type="project"
//         className="mb-4"
//       />

      

      
//     </div>
//   );
// };

// export default ProjectTracker;

// client/src/components/dashboard/ProjectTracker.jsx
import React from 'react';
import { StageMapper } from '../../services/tracking/stageMapper';
import ProgressIndicator from './ProgressIndicator';

const ProjectTracker = ({ stageId, odooLead }) => {
  const currentProjectStage = StageMapper.getCurrentProjectStage(stageId);
  const projectProgress = StageMapper.getProjectProgress(stageId);
  const allProjectStages = StageMapper.getAllProjectStages();

  if (!currentProjectStage) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
        <h3 className="text-2xl font-semibold text-primary-500 font-montserrat mb-4">
          Project Progress
        </h3>
        <p className="text-primary-400 font-nunito">
          Unable to determine project stage.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
      {/* Header - Figma Style */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-primary-500 font-montserrat">
          Project Progress
        </h3>
      </div>

      {/* Progress Indicator - Figma Style */}
      <div className="mt-8">
        <ProgressIndicator
          stages={allProjectStages}
          currentStage={currentProjectStage.currentStage}
          type="project"
          className=""
        />
      </div>
    </div>
  );
};

export default ProjectTracker;