// App.js
import React,{useState} from 'react';
import { ChakraProvider, Text, Flex, VStack} from '@chakra-ui/react';
import Sidebar from './Sidebar2/Sidebar';
import Header from './Header'
import CustomTheme from '../CustomTheme';
import { UserAuth } from '../Context/UserProvider';

function Kanban() {
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
        </VStack>
    </Flex>
    </ChakraProvider>
  );
}

export default Kanban;
