// StatusButton.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, HStack, Text } from '@chakra-ui/react'
import { AiOutlineTeam, AiFillSetting , AiFillCheckCircle , AiFillPauseCircle  } from "react-icons/ai";
import { useProjectCount } from '../../Context/ProjectProvider'

const StatusButton = ({ status }) => {
  let backgroundColor, icon, title, description;
  const {Pending, Ongoing, Completed, Paused } = useProjectCount();

  // Set styles, icons, and titles based on the project status
  switch (status) {
    case 'Pending':
      backgroundColor = 'gray.200';
      icon = <AiOutlineTeam />;
      title = `${Pending} Pending Projects`;
      description = 'Awaiting approval';
      break;
    
    case 'Paused':
      backgroundColor = 'gray.200';
      icon = <AiFillPauseCircle/>;
      title = `${Paused} Paused Projects`;
      description = 'On hold';
      break;
  
    case 'Ongoing':
      backgroundColor = 'gray.200';
      icon = <AiFillSetting  />;
      title = `${Ongoing} Ongoing Projects`;
      description = 'Active';
      break;

    case 'Completed':
        backgroundColor = 'gray.200';
        icon = <AiFillCheckCircle  />;
        title = `${Completed} Completed Projects`;
        description = 'Concluded';
        break;
    // Add more cases for other statuses
  }

  return (
    <Box width="25%" height="125px" backgroundColor={backgroundColor} borderRadius='10'>  
      <Link to={`/projects/${status}`}>
        <Box padding='3'>
          {icon}
          <Text fontWeight="bold">{title}</Text>
          <Text color="rgba(0, 0, 0, 0.5)">{description}</Text>
        </Box>
      </Link>
    </Box>
  );
};

export default StatusButton