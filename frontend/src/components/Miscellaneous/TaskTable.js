import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner, Box, Center, List, ListItem, Text } from '@chakra-ui/react';
import TaskSidebar from '../Sidebar2/TaskSidebar';

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectId = '6653cc88cd999a0e294326c3'
  const [projectDetails, setProjectDetails] = useState('')
 const [selectedTask, setSelectedTask] = useState('')
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (task) => {
    setSelectedTask(task);
    console.log(selectedTask)
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Replace this with your actual API call to fetch projects
    const fetchProject = async () => {
      // Example: Fetching projects from an API
      try {
        const response = await fetch(`/api/project/${projectId}`);
        const data = await response.json();
        console.log(data)
        setProjectDetails(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    
    fetchProject();
  }, []);
  
  useEffect(() => {
    const fetchTasks = async () => {
      fetch(`/api/project/${projectId}`)
        .then(response => response.json())
        .then(async (projectData) => {
          // Assuming projectData is an object representing the specific project
    
          // Fetch tasks for the selected project
          const response = await fetch(`/api/project/${projectId}/tasks`);
          const tasksReferenceIDs = await response.json();
          console.log('task reference: ', tasksReferenceIDs);
          // Fetch detailed task information using the reference IDs
          const detailedTasksPromises = tasksReferenceIDs.map(async (taskReferenceID) => {
            try {
              // Fetch detailed task information using the reference ID
              console.log('task reference id: ', taskReferenceID);
              const taskResponse = await fetch(`/api/tasks/${taskReferenceID}`);
              //when deleted tasks are retrieved, they are returned as null
              const taskData = await taskResponse.json();
              // Assuming taskData is a single task object
              const formattedTask = {
                ...taskData,
                start_date: new Date(taskData.start_date).toISOString().split('T')[0],
                progress: parseFloat(taskData.progress.$numberDecimal) || 0,
              };
    
              return formattedTask;
            } catch (error) {
              return null; // Handle error case
            }
          });
          // Wait for all detailedTasksPromises to resolve
          console.log('detailed task promises: ', detailedTasksPromises);
          const allTasks = await Promise.all(detailedTasksPromises);
          console.log("All Tasks for" ,projectId,": ", allTasks)
    
          // Filter out null values from the tasks array
          const filteredTasks = allTasks.filter(task => task !== null);  
          setTasks(filteredTasks)
          console.log(tasks)
        })
        .catch(error => {
          console.error('Error fetching project or tasks:', error);
        });
    };
  
    fetchTasks();
  
    // Cleanup function if needed
    return () => {
      // Cleanup code here (if any)
    };
  }, [projectId]);



  return (
    <>
    <TaskSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} tasks={selectedTask}/>
    <TableContainer>
      <Table size="lg" variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Task </Th>
            <Th>Description</Th>
            <Th>Start Date</Th>
            <Th>Duration</Th>
            <Th>Project</Th>
            <Th>Progress</Th>
            <Th>Owner</Th>
        
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => (
            <Tr key={task.id} onClick={() => toggleSidebar(task)}>
              <Td>{task.id}</Td>
              <Td>{task.text}</Td>
              <Td>{task.description}</Td>
              <Td>{new Date(task.start_date).toLocaleDateString()}</Td>
              <Td>{task.duration}</Td>
              <Td>{projectDetails.project_name}</Td>
              <Td>{task.progress ? task.progress.toString() : '0'}</Td>
       
              <Td>
                John Doe
                Jane Doe
              </Td>
            
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </>
  );
};

export default TasksTable;
