// ProjectCountContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProjectCount } from '../components/Miscellaneous/api';
 // Import the function you created

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projectCounts, setProjectCounts] = useState({
    Pending: 0,
    Ongoing: 0,
    Completed: 0, 
    Paused: 0
    // Add more statuses as needed
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const pendingCount = await fetchProjectCount('Pending');
      const ongoingCount = await fetchProjectCount('Ongoing');
      const completedCount = await fetchProjectCount('Completed');
      const pausedCount = await fetchProjectCount('Paused');
      // Update other counts as needed

      setProjectCounts({
        Pending: pendingCount,
        Ongoing: ongoingCount,
        Completed: completedCount,
        Paused: pausedCount,
        // Update other counts as needed
      });
    };

    fetchCounts();
  }, []);

  return (
    <ProjectContext.Provider value={projectCounts}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectCount = () => {
  return useContext(ProjectContext);
};

export default ProjectProvider
