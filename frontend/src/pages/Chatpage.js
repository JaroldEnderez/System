// App.js
import React from 'react';
import { ChakraProvider, extendTheme, Text, HStack, VStack, Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar2/Sidebar';
import Header from '../components/Header'
import Dashboard from '../components/Dashboard';
import CustomTheme from '../CustomTheme';

function Chatpage() {
  return (
    <ChakraProvider theme={CustomTheme}>
    <HStack style={{display:'flex'}}>
      <Sidebar />
        <VStack
          align="flex-start" // Set vertical alignment to flex-start
          height="100vh"    // Set a height for the container (adjust as needed)
          width="100%"
          >
          <Header/>
          <Text fontSize="xl" fontWeight="bold" paddingLeft='4'>
            Welcome, John!
          </Text>
          
          <Dashboard/>
        </VStack>
    </HStack>
    </ChakraProvider>
  );
}

export default Chatpage;
