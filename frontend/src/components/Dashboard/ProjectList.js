// UserList.js

import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Button, Flex, Collapse, Text, VStack, ChakraProvider } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';  // Import useHistory
import Header from '../Header';
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [sectionStates, setSectionStates] = useState([]);
  const history = useHistory();  // Initialize useHistory
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  
  // Simulating fetching projects from the database
  useEffect(() => {
    // Replace this with your actual API call to fetch projects
    const fetchProjects = async () => {
      // Example: Fetching projects from an API
      try {
        const response = await fetch('/api/project');
        const data = await response.json();
        console.log(data)
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Update sectionStates based on the number of projects
    setSectionStates(Array(projects.length).fill(false));
  }, [projects]);

  const handleClick = (projectId) => {
    history.push(`/class/${projectId}`)
  };
  
  const handleEditProject = (projectId) => {
    // Redirect to the edit page with the project ID
    history.push(`/edit-project/${projectId}`);
  };

  return (
    <ChakraProvider theme={CustomTheme}>
        <Flex direction="row">
            <Sidebar />
              <VStack
                align="flex-start" // Set vertical alignment to flex-start
                height="100vh"    // Set a height for the container (adjust as needed)           // Allow the VStack to grow and take remaining horizontal space
                overflowX="auto"
                width="100%"
                >
                <Header/>
                <Box padding='4' paddingBottom='4'>
                <Heading paddingBottom='10'>Projects</Heading>
                {/* Render dynamic collapsible sections based on projects */}
                {projects.map((project, index) => (
                  <div key={project._id}>
                    <Flex justify="space-between" align="center" marginBottom="2">
                      <Button
                        onClick={() => handleClick(project._id)}
                        
                      >
                        {project.project_name}
                      </Button>
                    </Flex>

    </div>
  ))}
  <br/>
</Box>

        </VStack>
        </Flex>
    </ChakraProvider>
  );
};

export default ProjectList;
