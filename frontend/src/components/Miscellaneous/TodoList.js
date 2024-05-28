import React,{useEffect,useState} from 'react';
import { Box, Text, List, ListItem } from '@chakra-ui/react';
import axios from 'axios';
import TaskSidebar from '../Sidebar2/TaskSidebar';

const TodoList = () => {
  const sampleTasks = [
    { id: 1, text: "Foundation", start_date: "2023-06-01", duration: 5, progress: 0.6, estimated_duration: 5, actual_duration: 5 },
    { id: 2, text: "Framing", start_date: "2023-06-06", duration: 10, progress: 0.4, parent: 1, estimated_duration: 8, actual_duration: 11 },
    { id: 3, text: "Roofing", start_date: "2023-06-17", duration: 7, progress: 0.2, parent: 1, estimated_duration: 7, actual_duration: 7 },
    { id: 4, text: "Plumbing", start_date: "2023-06-20", duration: 8, progress: 0.0, parent: 2, estimated_duration: 8, actual_duration: 0 },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 

const [selectedTask, setSelectedTask] = useState(null)

const [owners, setOwners] = useState([])
const [ project, setProject] = useState('')
const [ tasks, setTasks] = useState([])
const  projectId  = '6653cc88cd999a0e294326c3';

const toggleSidebar = (task) => {
  setSelectedTask(task);
  console.log(selectedTask)
  setIsSidebarOpen(!isSidebarOpen);
};

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
    <Box border="1px solid #ccc" borderRadius="md" p="4" bg="white" boxShadow="md">
      <TaskSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} tasks={selectedTask}/>
      <Text fontSize="2xl" mb="4">Task List</Text>


      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} onClick={() => toggleSidebar(task)} border="1px solid #e2e8f0" borderRadius="md" p="3" >
            <Text><strong>Task:</strong> {task.text}  <Text color='blue'>{task.id}</Text></Text>
            <Text><strong>Start Date:</strong> {task.start_date}</Text>
            <Text><strong>Duration:</strong> {task.duration} days</Text>
            <Text><strong>Progress:</strong> {Math.round(task.progress * 100)}%</Text>
            <Text><strong>Owner/s:</strong></Text>

          </ListItem>
  ))}
      </List>
    </Box>
  );
};

export default TodoList;
