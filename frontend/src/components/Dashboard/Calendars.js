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
  const [selectedOwner, setSelectedOwner] = useState('');
  const [owners, setOwners] = useState([])
  const [selectedTask, setSelectedTask] = useState('')
  
  var labels = gantt.locale.labels;
  gantt.locale.labels.column_owner = labels.section_owner= "Owner";
  gantt.locale.labels["section_parent"] = "Parent task";
  gantt.locale.labels["section_text"] = "Task name";
  gantt.templates.rightside_text = function (start, end, task) {
		if (task.type == "milestone") {
			return task.text;
		}
		return "";
	};

  
  const ownerEditor = {
    type: "select",
    map_to: "owner_id",
    options: []
  };

  
  
  useEffect(() => {
    // Replace this with your actual API call to fetch projects
    const fetchUsers = async () => {
      // Example: Fetching projects from an API
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        console.log(data)

        const staffList = data.map(staffMember => ({
          key: staffMember._id,
          label: staffMember.name,
          backgroundColor: "#f57730",
          textColor: "#FFF"
        }));
        console.log(staffList)

        gantt.config.columns = [
          {name:"text",       label:"Task name",  width:110, tree:true },
          {name:"start_date", label:"Start time", align:"center" },
          {name:"duration",   label:"Duration",   align:"center", width:50   },
          {name:"add",        label:"",           width:44 },
          { name: 'owner', label: 'Owner', align: 'center', template: function (task) {
            const owner = gantt.serverList('staff').find(o => o.key === task.owner);
            return owner ? owner.label : '';
          }}
      ];
    
      gantt.config.lightbox.sections = [
        { name: 'text', height: 70, map_to: 'text', type: 'textarea', focus: true},
        { name: 'description', height: 70, map_to: 'description', type: 'textarea', focus: true },
        {name: "owner", height: 22, map_to: "owner", type: "select", options: gantt.serverList("staff")},
        {name: 'time', type: 'duration', map_to: 'auto' }
        // Add more sections as needed
      ];
        // Populate the gantt.serverList
        gantt.serverList('staff', staffList);

      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    
    fetchUsers();
  }, []);

  
  
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
  
  function byId(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].key == id)
				return list[i].label || "";
		}
		return "";
	}
  



  gantt.plugins({ 
    tooltip: true 
}); 

  // Define tooltip template
const tooltipTemplate = (task) => {
  return `
      <div>
          <strong>Task ID:</strong> ${task._id}<br>
          <strong>Task Name:</strong> ${task.text}<br>
          <strong>Task Name:</strong> ${task.text}<br>
          <strong>Start Date:</strong> ${task.start_date}<br>
          <strong>End Date:</strong> ${task.end_date}<br>
          <!-- Add more task details as needed -->
      </div>
  `;
};

// Enable tooltip in Gantt chart configuration
gantt.config.tooltip = {
  html: (task) => {
      return tooltipTemplate(task);
  }
};

// Attach mouseover event to show tooltip on task hover



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
      task.projectId = currentProjectId;
      task.ganttId = id; // Use Gantt chart's task ID
      console.log("Project ID for task creation: ", currentProjectId);
      
      // Ensure owner is either a valid ID or an empty array
      const ownerArray = task.owner === '' ? [] : task.owner;
      task.owner = ownerArray;
     

      console.log(task);// Ensure owner is either a valid ID or an empty array

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


    useEffect(() => {
      // Define the onAfterTaskUpdate event handler
      const handleTaskUpdate = async (id, task) => {
        const taskId = task._id
        try {
          // Send an update request to your server/database
          const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update task');
          }
      
          console.log('Task updated:', id, task);
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
      
    
      // Attach the event handler to the gantt chart
      gantt.attachEvent("onAfterTaskUpdate", handleTaskUpdate);
    
      // Clean up by detaching the event handler when the component unmounts
      return () => {
        gantt.detachEvent("onAfterTaskUpdate", handleTaskUpdate);
      };
    }, []);
    
  //   gantt.attachEvent("onTaskClick", function(id, e) {
  //     // Prevent the default behavior
  //     e.preventDefault();
      
  //     // Access the task ID
  //     console.log("Clicked Task ID: ", id);
 
      
  //     // You can perform any custom logic here
      
  //     // Return true to allow the default behavior (task selection)
      
  
  // });
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