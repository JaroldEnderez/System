// ProjectList.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VStack, Text, ChakraProvider, Box, Heading, Button, Collapse, Flex} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Header from '../Header';
import { useHistory } from 'react-router-dom';  // Import useHistory
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';
import ProjectCard from '../Cards/ProjectCard';

const ProjectsByStatus = () => {
  const { status } = useParams();
  const [projects, setProjects] = useState([]);
  const history = useHistory();

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

  const handleEditProject = (projectId) => {
    // Redirect to the edit page with the project ID
    history.push(`/edit-project/${projectId}`);
  };

  return (
    <ChakraProvider theme={CustomTheme}>
      <Flex direction="row" >
        <Sidebar />
        <VStack
            align="flex-start" // Set vertical alignment to flex-start
            height="100vh"    // Set a height for the container (adjust as needed)           // Allow the VStack to grow and take remaining horizontal space
            overflowX="auto"
            width="100%"
        >
        <Header/>
            
            <Box padding='4' paddingBottom='4' textAlign='center'>
            <Heading paddingBottom='10'>{status} Projects</Heading>
            {/* Render dynamic collapsible sections based on projects */}
                <Flex flexWrap='wrap' height='100%' width='100%'  justifyContent='space-evenly'>

            {projects.map((project, index) => (

                  <ProjectCard/>
            ))}
                </Flex>
            <br/>
          </Box>
          </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default ProjectsByStatus;
