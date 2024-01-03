// ProjectList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectsByStatus = () => {
  const { status } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects based on the status
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/project/Status/${status}`);
        const data = await response.json();
        console.log(data)
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [status]);

  return (
    <div>
      <h2>{status} Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.project_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsByStatus;
