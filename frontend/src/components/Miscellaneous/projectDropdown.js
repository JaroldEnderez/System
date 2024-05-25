import React, { useState, useEffect } from 'react';
import { Select, Button } from '@chakra-ui/react'; // Import Chakra UI components
import axios from 'axios';

const ProjectDropdown = ({ onUpdateProjectIdOptions }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the list of projects from your API
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/project'); // Replace with your API endpoint
        setProjects(response.data);

        // Pass the options to the parent component
        onUpdateProjectIdOptions(response.data.map(project => ({ value: project._id, label: project.project_name })));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [onUpdateProjectIdOptions]); // Run this effect once when the component mounts and when onUpdateProjectIdOptions changes

  return (
    <Select placeholder="Select a project">
      {projects.map((project) => (
        <option key={project._id} value={project._id}>
          {project.project_name}
        </option>
      ))}
    </Select>
  );
};

export default ProjectDropdown;
