import React, { useEffect, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import Gantt from '../Gantt';
import Toolbar from '../Toolbar';
import MessageArea from '../MessageArea';
import { Box, Heading, List, ListItem, Button, Flex, Collapse, Text, TabPanels, Tab, TabPanel, TabList, Tabs, VStack, ChakraProvider } from '@chakra-ui/react';
import Project_Modal from '../Modal/Project_Modal'  
import Header from '../Header';
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';

const Tasks = () => {
  const [projectIdOptions, setProjectIdOptions] = useState([]);

  const handleUpdateProjectIdOptions = (options) => {
    setProjectIdOptions(options);
  };
<<<<<<< HEAD

=======
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
  
  const [tasks, setTasks] = useState({
    data: [],
    links: [],
  });
  
  const dummyTasks = {
    data: [{ id: 123, text: 'Task #1', start_date: '2024-01-20', duration: 3, progress: 0.6 }],
    links: [],
  } 

  const [currentZoom, setCurrentZoom] = useState('Days');
  const [messages, setMessages] = useState([]);
  
   //The empty dependency array ensures that the effect runs only once when the component mounts

	
   useEffect(() => {
    
    const fetchProjectIds = async () => {
      try {
        const response = await fetch('/api/project');
        const projectsData = await response.json();
          
        // Extract project IDs from the projectsData array
        const transformedOptions = projectsData.map(project => ({
          value: project._id,
          label: `Project ${project._id} - ${project.project_name}`
        }));


        handleUpdateProjectIdOptions(transformedOptions);
        console.log("TransformedOptions: ", transformedOptions)
        
      } catch (error) {
        console.error('Error fetching project IDs:', error);
      }
    };

    fetchProjectIds();
  }, []);
  
  useEffect(() => {
    gantt.config.lightbox.sections = [
      { name: 'description', height: 70, map_to: 'text', type: 'textarea', focus: true },
      {
        name: 'projectId',
        height: 22,
        map_to: 'projectId',
        type: 'select',
        options: projectIdOptions.map(option => ({ key: option.value, label: option.label }))
      },
      {name: 'time', type: 'duration', map_to: 'auto' }
      // Add more sections as needed
    ];
    
  }, [projectIdOptions]);


useEffect(()=>{
  gantt.attachEvent("onAfterTaskAdd", (id, task) => {
    const projectId = task.projectId;
    
    fetch(`/api/project/${projectId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server if needed
      console.log('Task added successfully:', data);
    })
    .catch(error => {
      console.error('Error adding task:', error);
    });
  });

  gantt.render()
},[])


useEffect(() => {
  gantt.attachEvent("onAfterTaskDelete", (id, task) => {
    const projectId = task.projectId; // Remove the quotes around task.projectId
    const taskId = task._id; // Remove the quotes around task._id
    
    // Make a DELETE request to delete the task
    fetch(`/api/project/${projectId}/tasks/${taskId}`, {
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
}, []);

gantt.locale.labels.section_projectId =  "Project ID";
    // Add more sections as needed]

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

  return (
    <ChakraProvider theme={CustomTheme}>
        <Flex direction="row">
<<<<<<< HEAD
            <Sidebar />
=======
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
              <VStack
                align="flex-start" // Set vertical alignment to flex-start
                height="100vh"    // Set a height for the container (adjust as needed)           // Allow the VStack to grow and take remaining horizontal space
                overflowX="auto"
                width="100%"
                >
<<<<<<< HEAD
                <Header/>
=======
                <Header toggleSidebar={toggleSidebar}/>
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
                  <Box padding='4' paddingBottom='4' width='100%'>
                    <Heading paddingBottom='10'>Tasks</Heading>
                  
                    <div className="zoom-bar">
                      <Toolbar zoom={currentZoom} onZoomChange={handleZoomChange} />
                      <button onClick={handleAddTask}>Add Task</button>
                    </div>
                    <div className="gantt-container">
                        <Gantt zoom={currentZoom} onDataUpdated={logDataUpdate} />
                    </div>
                    <MessageArea messages={messages} />
                  </Box>
            </VStack>
          </Flex>
      </ChakraProvider>
  )
};

export default Tasks;
