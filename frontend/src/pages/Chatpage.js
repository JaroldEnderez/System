// App.js
import React,{useState} from 'react';
import { ChakraProvider, Text, Flex, VStack} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar2/Sidebar';
import Header from '../components/Header'
import Dashboard from '../components/Dashboard';
import CustomTheme from '../CustomTheme';
import { UserAuth } from '../Context/UserProvider';

function Chatpage() {
  const { user } = UserAuth();

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
          <Text fontSize="xl" fontWeight="bold" paddingLeft='4'>
            Welcome, {user.name}!
          </Text>
          
          <Dashboard/>
        </VStack>
    </Flex>
    </ChakraProvider>
  );
}

export default Chatpage;
