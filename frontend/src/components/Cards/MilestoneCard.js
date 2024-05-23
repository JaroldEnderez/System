import { Box, Text, Badge, Divider } from '@chakra-ui/react';
import React from 'react';

const MilestoneCard = ({ milestone }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p="4"
      mb="4"
      width="300px" // Fixed width
      height="175px" // Fixed height'
    >
      <Text fontSize="xl" fontWeight="bold" color={`${getStatusColor(milestone.status)}.500`}>
        {milestone.name}
      </Text>
      <Divider my="2" />
      <Text fontSize="sm" 
            isTruncated
            noOfLines={2} // Adjust the number of lines to display before truncating
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis">{milestone.description}</Text>
      <Divider my="2" />
      <Text>
        <Badge colorScheme={getStatusColor(milestone.status)}>
          {milestone.status}
        </Badge>
      </Text>
      <Text mt="2">Due Date: {new Date(milestone.dueDate).toLocaleDateString()}</Text>
      {/* Add more details as needed */}
    </Box>
  );
};

// Helper function to determine badge color based on milestone status
const getStatusColor = (status) => {
  switch (status) {
    case 'ongoing':
      return 'green';
    case 'completed':
      return 'blue';
    case 'delayed':
      return 'red';
    default:
      return 'gray';
  }
};

export default MilestoneCard;
