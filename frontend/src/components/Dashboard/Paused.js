// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, VStack, Button, Flex, Collapse, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Project_Modal from '../Modal/Project_Modal';

const Paused = () => {
  const [projects, setProjects] = useState([]);

  // Simulating fetching projects from the database
  useEffect(() => {
    // Replace this with your actual API call to fetch projects
    const fetchProjects = async () => {
      // Example: Fetching projects from an API
      try {
        const response = await axios.get('/api/project/paused');
        const data = response.data;
        setProjects(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProjects();
  }, []);

  const [sectionStates, setSectionStates] = useState([]);

  useEffect(() => {
    // Update sectionStates based on the number of projects
    setSectionStates(Array(projects.length).fill(false));
  }, [projects]);

  const handleToggleCollapse = (index) => {
    setSectionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <Box padding='4' paddingBottom='4'>
      <Heading paddingBottom='10'>{projects.length} Paused Projects</Heading>
      {/* Render dynamic collapsible sections based on projects */}
      {projects.map((project, index) => (
        <div key={project.id}>
          <Button onClick={() => handleToggleCollapse(index)} leftIcon={sectionStates[index] ? <ChevronDownIcon /> : <ChevronUpIcon />}>
            {project.project_name}
          </Button>

          <Collapse in={sectionStates[index]}>
            
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Heading>{`Project name: ${project.project_name}`}</Heading>
            </Box>
          </Collapse>
        </div>
      ))}
      <br/>
      
          
        <Flex align="center">
        <Link to="/projects" paddingRight="2">
          <Button bg="#22b53b" _hover={{ bg: '#1b8f2e' }} color="white">
            View all projects
          </Button> 
        </Link>
        <Box marginLeft="2"> {/* Add some margin or adjust as needed */}
          <Project_Modal />
        </Box>
      </Flex>
    </Box>
  );
};  

export default Paused;
