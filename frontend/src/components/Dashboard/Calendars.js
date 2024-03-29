import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading, List, Flex, VStack, TabPanels, Tab, TabPanel, TabList, Tabs, ChakraProvider } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';  // Import useHistory
import Header from '../Header';
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import Gantt from '../Gantt';
import Toolbar from '../Toolbar'; 
import MessageArea from '../MessageArea';

const Calendars = () => {
  const [projects, setProjects] = useState([])
  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState([]);
  
   //The empty dependency array ensures that the effect runs only once when the component mounts

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

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = { message };
    setMessages((prevMessages) => [newMessage, ...prevMessages.slice(0, maxLogLength - 1)]);
  };

  const logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    addMessage(message);
  };

  const handleZoomChange = (zoom) => {
    setCurrentZoom(zoom);
  };

  const handleAddTask = () => {
    const newTask = {
      id: gantt.getNextId(),
      text: 'New Task',
      start_date: new Date(),
      duration: 3,
    };

    gantt.addTask(newTask);
  };

  const handleToggleFullscreen = () => {
    if (gantt.ext.fullscreen) {
      gantt.ext.fullscreen.toggle();
    } else {
      console.error('Fullscreen extension not available');
    }
  };

  const ProjectTabs = ({ projects }) => {
    const [selectedProjectId, setSelectedProjectId] = useState(projects.length > 0 ? projects[0]._id : null);

    const selectedProjectIdRef = useRef(selectedProjectId);

  useEffect(() => {
    // Update the ref whenever selectedProjectId changes
    selectedProjectIdRef.current = selectedProjectId;
  }, [selectedProjectId]);

  useEffect(() => {
    const handleAfterTaskAdd = (id, task) => {
      // Use the current project ID from the ref
      const currentProjectId = selectedProjectIdRef.current;
      task.projectId = selectedProjectId
      console.log("Project ID for task creation: ", currentProjectId);

      // Make API request to add task to the selected project
      fetch(`/api/project/${currentProjectId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Task added successfully:', data);
      })
      .catch(error => {
        console.error('Error adding task:', error);
      });
    };

    // Attach the event listener once on component mount
    const eventID = gantt.attachEvent("onAfterTaskAdd", handleAfterTaskAdd);

    // Return a cleanup function to detach the event listener when the component unmounts
    return () => gantt.detachEvent(eventID);
  }, []);

    
    
    useEffect(() => {
      gantt.attachEvent("onAfterTaskDelete", (id, task) => {
        const taskId = task._id; // Remove the quotes around task._id
        
        // Make a DELETE request to delete the task
        fetch(`/api/project/${selectedProjectId}/tasks/${taskId}`, {
          //fetch above should make the call to the tasks array of the project rather than the api/tasks endpoint to remove task reference of project
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (!response.ok) { 
            throw new Error('Failed to delete task');
          }
          // Return the response data
          return response.json();
        })
        .then(data => {
          // Log the response data received from the server
          console.log('Task deleted successfully:', data);
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
      });
      
      gantt.render();
    }, [selectedProjectId]);

    
    const handleTabClick = (projectId) => {
      setSelectedProjectId(projectId);
      console.log(selectedProjectId)
    };

    return (

        <Tabs variant='enclosed-colored'>
            <TabList>
                    {projects.map((project) => (
                      <Tab
                        key={project._id}
                        className={selectedProjectId === project._id ? 'active' : ''}
                        onClick={() => handleTabClick(project._id)}
                      >
                    {project.project_name}
                      </Tab>
                  ))}
            </TabList>
            <TabPanels>
            {projects.map((project) => (
              <TabPanel key={project._id} style={{ display: selectedProjectId === project._id ? 'block' : 'none' }}>
                {selectedProjectId === project._id && (
                  <>
                    <div className="zoom-bar">
                      <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
                    </div>
                    <div className="gantt-container">
                      <Gantt key={project._id} zoom={currentZoom} onDataUpdated={logDataUpdate} projectId={selectedProjectId} />
                    </div>
                    <MessageArea messages={messages} />
                  </>
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
              {selectedProjectId}
              </Tabs>
              );
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
                  <Box padding='4' paddingBottom='4' width='100%'>
                    <Heading paddingBottom='10'>Tasks</Heading>
                    <ProjectTabs projects={projects}/>
                  </Box>
            </VStack>
          </Flex>
      </ChakraProvider>
  );
};

export default Calendars;

