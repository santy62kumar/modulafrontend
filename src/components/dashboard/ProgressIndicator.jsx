// // client/src/components/dashboard/ProgressIndicator.jsx
// import React from 'react';

// const ProgressIndicator = ({ 
//   stages, 
//   currentStage, 
//   type = 'project',
//   className = '' 
// }) => {
//   const getStageStatus = (stageNumber) => {
//     if (stageNumber < currentStage) return 'completed';
//     if (stageNumber === currentStage) return 'current';
//     return 'pending';
//   };

//   const getStageClasses = (status, isLast = false) => {
//     const baseClasses = 'flex flex-col items-center relative';
//     const circleClasses = {
//       completed: 'w-8 h-8 rounded-md bg-primary-500 text-white flex items-center justify-center text-sm font-semibold',
//       current: 'w-8 h-8 rounded-md bg-primary-200 text-primary-500 flex items-center justify-center text-sm font-semibold ring-4 ring-primary-100',
//       pending: 'w-8 h-8 rounded-md bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-semibold'
//     };
    
//     return {
//       container: baseClasses,
//       circle: circleClasses[status],
//       line: !isLast ? (status === 'completed' ? 'h-1 bg-primary-500' : 'h-1 bg-gray-200') : ''
//     };
//   };

//   const getLineClasses = (fromStatus, toStatus) => {
//     if (fromStatus === 'completed') {
//       return 'flex-1 h-1 bg-primary-500';
//     }
//     return 'flex-1 h-1 bg-gray-200';
//   };

//   if (type === 'linear') {
//     return (
//       <div className={`flex items-center justify-between w-full ${className}`}>
//         {stages.map((stage, index) => {
//           const status = getStageStatus(stage.stageNumber);
//           const isLast = index === stages.length - 1;
//           const classes = getStageClasses(status, isLast);

//           return (
//             <React.Fragment key={stage.stageNumber}>
//               <div className="flex flex-col items-center">
//                 <div className={classes.circle}>
//                   {status === 'completed' ? '✓' : stage.stageNumber}
//                 </div>
//                 <div className="mt-2 text-xs text-center text-primary-400 font-nunito max-w-16">
//                   {stage.name.split(' ').join('\n')}
//                 </div>
//               </div>
              
//               {!isLast && (
//                 <div className={getLineClasses(status, getStageStatus(stages[index + 1]?.stageNumber))}>
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     );
//   }

//   // Default circular progress (for dispatch tracking)
//   if (type === 'dispatch') {
//     return (
//       <div className={`flex items-center justify-center space-x-8 ${className}`}>
//         {stages.map((stage, index) => {
//           const status = getStageStatus(stage.stageNumber);
//           const isLast = index === stages.length - 1;
//           const classes = getStageClasses(status, isLast);

//           return (
//             <React.Fragment key={stage.stageNumber}>
//               <div className="flex flex-col items-center">
//                 <div className={classes.circle}>
//                   {status === 'completed' ? '✓' : stage.icon || stage.stageNumber}
//                 </div>
//                 <div className="mt-2 text-xs text-center text-primary-400 font-nunito">
//                   {stage.name}
//                 </div>
//               </div>
              
//               {!isLast && (
//                 <div className={`w-16 ${getLineClasses(status, getStageStatus(stages[index + 1]?.stageNumber))}`}>
//                 </div>
//               )}
//             </React.Fragment>
//           );
//         })}
//       </div>
//     );
//   }

//   // Default project progress
//   return (
//     <div className={`w-full ${className}`}>
//       <div className="flex items-center justify-between mb-4">
//         {stages.map((stage, index) => {
//           const status = getStageStatus(stage.stageNumber);
//           const isLast = index === stages.length - 1;
//           const classes = getStageClasses(status, isLast);

//           return (
//             <div key={stage.stageNumber} className="flex flex-col items-center flex-1">
//               <div className="flex items-center w-full">
//                 <div className="flex flex-col items-center">
//                   <div className={classes.circle}>
//                     {status === 'completed' ? '✓' : stage.stageNumber}
//                   </div>
//                   <div className="mt-2 text-xs text-center text-primary-400 font-nunito">
//                     {stage.name}
//                   </div>
//                 </div>
                
//                 {!isLast && (
//                   <div className="flex-1 mx-4">
//                     <div className={getLineClasses(status, getStageStatus(stages[index + 1]?.stageNumber))}>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProgressIndicator;


// client/src/components/dashboard/ProgressIndicator.jsx
import React from 'react';

const ProgressIndicator = ({ 
  stages, 
  currentStage, 
  type = 'project',
  className = '' 
}) => {
  const getStageStatus = (stageNumber) => {
    if (stageNumber < currentStage) return 'completed';
    if (stageNumber === currentStage) return 'current';
    return 'pending';
  };

  // Figma-style Progress for Project Tracking
  if (type === 'project') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-evenly px-8 relative">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage.stageNumber);
            const isCompleted = status === 'completed' || status === 'current';
            const isLast = index === stages.length - 1;

            return (
              <React.Fragment key={stage.stageNumber}>
                {/* Stage Container */}
                <div className="flex flex-col items-center relative ">
                  {/* Square Box - Figma Style */}
                  <div className="flex flex-col items-center justify-between h-[110px]">
                    <div className={`
                      w-15 h-15 flex items-center justify-center font-bold text-xl font-montserrat relative z-10
                      ${isCompleted 
                        ? 'bg-primary-500 text-white rounded-xl' 
                        : 'bg-white text-primary-500 border-2 border-gray-200 rounded-xl'
                      }
                    `} style={{ width: '60px', height: '60px' }}>
                      {stage.stageNumber}
                      
                    </div>
                    
                    {/* Stage Label */}
                    {/* <div className="mt-4 text-center max-w-24">
                      <div className="text-sm font-medium text-primary-500 font-nunito leading-tight">
                        {stage.name.split(' ').map((word, i) => (
                          <div key={i}>{word}</div>
                        ))}
                      </div>
                    </div> */}

                    <div className="mt-3">
                      <div className="text-sm font-medium text-primary-500 font-nunito leading-tight break-words w-[80px] text-center">
                        {stage.name}
                      </div>
                    </div>
                  </div>


                  {/* Connecting Line */}
                  {!isLast && (
                    <div 
                      className={`absolute top-7 left-1/2 h-0.5 z-0`}
                      style={{
                        marginLeft: '35px',
                        width: 'calc(100vw / 5 - 60px)',
                        maxWidth: '120px',
                        background: isCompleted ? '#3A1A1A' : 'transparent',
                        borderTop: isCompleted ? 'none' : '3px dotted #CCCCCC',
                        height: isCompleted ? '3px' : '0px'
                      }}
                    />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // Figma-style Progress for Dispatch Tracking
  if (type === 'dispatch') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-evenly mx-40 px-8 relative">
          {stages.map((stage, index) => {
            const status = getStageStatus(stage.stageNumber);
            const isCompleted = status === 'completed' || status === 'current';
            const isLast = index === stages.length - 1;

            return (
              <React.Fragment key={stage.stageNumber}>
                {/* Stage Container */}
                <div className="flex flex-col items-center relative">
                  {/* Square Box - Smaller for Dispatch */}
                  <div className="flex flex-col items-center justify-between h-[120px]">
                    <div className={`
                      flex items-center justify-center relative z-10
                      ${isCompleted 
                        ? 'bg-primary-500 rounded-lg' 
                        : 'bg-white border-2 border-gray-200 rounded-lg'
                      }
                    `} style={{ width: '50px', height: '50px' }}>
                      {/* Empty box as per Figma design */}
                    </div>
                    
                    {/* Stage Label */}
                    <div className="mt-4 text-center max-w-20">
                      <div className="text-sm font-medium text-primary-500 font-nunito leading-tight">
                        {stage.name.split(' ').map((word, i) => (
                          <div key={i}>{word}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {!isLast && (
                    <div 
                      className={`absolute top-6 left-1/2 h-0.5 z-0`}
                      style={{
                        marginLeft: '30px',
                        width: 'calc(100vw / 3 - 50px)',
                        maxWidth: '150px',
                        background: isCompleted ? '#3A1A1A' : 'transparent',
                        borderTop: isCompleted ? 'none' : '3px dotted #CCCCCC',
                        height: isCompleted ? '3px' : '0px'
                      }}
                    />
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // Fallback for other types (keeping original logic)
  const getStageClasses = (status, isLast = false) => {
    const baseClasses = 'flex flex-col items-center relative';
    const circleClasses = {
      completed: 'w-8 h-8 rounded-md bg-primary-500 text-white flex items-center justify-center text-sm font-semibold',
      current: 'w-8 h-8 rounded-md bg-primary-200 text-primary-500 flex items-center justify-center text-sm font-semibold ring-4 ring-primary-100',
      pending: 'w-8 h-8 rounded-md bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-semibold'
    };
    
    return {
      container: baseClasses,
      circle: circleClasses[status],
      line: !isLast ? (status === 'completed' ? 'h-1 bg-primary-500' : 'h-1 bg-gray-200') : ''
    };
  };

  const getLineClasses = (fromStatus, toStatus) => {
    if (fromStatus === 'completed') {
      return 'flex-1 h-1 bg-primary-500';
    }
    return 'flex-1 h-1 bg-gray-200';
  };

  if (type === 'linear') {
    return (
      <div className={`flex items-center justify-between w-full ${className}`}>
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.stageNumber);
          const isLast = index === stages.length - 1;
          const classes = getStageClasses(status, isLast);

          return (
            <React.Fragment key={stage.stageNumber}>
              <div className="flex flex-col items-center">
                <div className={classes.circle}>
                  {status === 'completed' ? '✓' : stage.stageNumber}
                </div>
                <div className="mt-2 text-xs text-center text-primary-400 font-nunito max-w-16">
                  {stage.name.split(' ').join('\n')}
                </div>
              </div>
              
              {!isLast && (
                <div className={getLineClasses(status, getStageStatus(stages[index + 1]?.stageNumber))}>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // Default project progress (fallback)
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.stageNumber);
          const isLast = index === stages.length - 1;
          const classes = getStageClasses(status, isLast);

          return (
            <div key={stage.stageNumber} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div className="flex flex-col items-center">
                  <div className={classes.circle}>
                    {status === 'completed' ? '✓' : stage.stageNumber}
                  </div>
                  <div className="mt-2 text-xs text-center text-primary-400 font-nunito">
                    {stage.name}
                  </div>
                </div>
                
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={getLineClasses(status, getStageStatus(stages[index + 1]?.stageNumber))}>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;