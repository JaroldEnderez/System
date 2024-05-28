// UserList.js

import React, { useState, useEffect } from 'react';
import { Box, Heading, List, ListItem, Button, Flex, Collapse, Text, VStack, ChakraProvider } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';  // Import useHistory
import Header from '../Header';
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';
import TasksTable from '../Miscellaneous/TaskTable';

const Clients = () => {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }
  
  return (
    <ChakraProvider theme={CustomTheme}>
        <Flex direction="row">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
              <VStack
                align="flex-start" // Set vertical alignment to flex-start
                height="100vh"    // Set a height for the container (adjust as needed)           // Allow the VStack to grow and take remaining horizontal space
                overflowX="auto"
                width="100%"
                >
          
                <Header toggleSidebar={toggleSidebar}/>
                <Box padding='4' paddingBottom='4'>
                <Heading paddingBottom='10'>Projects</Heading>
                <TasksTable/>

</Box>

        </VStack>
        </Flex>
    </ChakraProvider>
  );
};

export default Clients;
