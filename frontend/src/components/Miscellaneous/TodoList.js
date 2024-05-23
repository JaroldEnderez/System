import React from 'react';
import { Box, Text, List, ListItem } from '@chakra-ui/react';

const TodoList = () => {
  const sampleTasks = [
    { id: 1, text: "Foundation", start_date: "2023-06-01", duration: 5, progress: 0.6, estimated_duration: 5, actual_duration: 5 },
    { id: 2, text: "Framing", start_date: "2023-06-06", duration: 10, progress: 0.4, parent: 1, estimated_duration: 8, actual_duration: 11 },
    { id: 3, text: "Roofing", start_date: "2023-06-17", duration: 7, progress: 0.2, parent: 1, estimated_duration: 7, actual_duration: 7 },
    { id: 4, text: "Plumbing", start_date: "2023-06-20", duration: 8, progress: 0.0, parent: 2, estimated_duration: 8, actual_duration: 0 },
  ];

  return (
    <Box border="1px solid #ccc" borderRadius="md" p="4" bg="white" boxShadow="md">
      <Text fontSize="2xl" mb="4">Task List</Text>
      <List spacing={3}>
        {sampleTasks.map(task => (
          <ListItem key={task.id} border="1px solid #e2e8f0" borderRadius="md" p="3">
            <Text><strong>Task:</strong> {task.text}</Text>
            <Text><strong>Start Date:</strong> {task.start_date}</Text>
            <Text><strong>Duration:</strong> {task.duration} days</Text>
            <Text><strong>Progress:</strong> {Math.round(task.progress * 100)}%</Text>
            <Text><strong>Estimated Duration:</strong> {task.estimated_duration} days</Text>
            <Text><strong>Actual Duration:</strong> {task.actual_duration} days</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
