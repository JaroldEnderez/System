// App.js
import React from 'react';
import { ChakraProvider, Text, Flex, VStack} from '@chakra-ui/react';
import Sidebar from '../components/Sidebar2/Sidebar';
import Header from '../components/Header'
import Dashboard from '../components/Dashboard';
import CustomTheme from '../CustomTheme';
import { UserAuth } from '../Context/UserProvider';

function Chatpage() {
  const { user } = UserAuth();
  
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
