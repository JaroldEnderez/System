import React, { useEffect, useState } from 'react';
import { VStack, HStack, ChakraProvider, Box, Avatar, Heading, Flex, Text} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Header from '../Header';
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';
import { UserAuth } from '../../Context/UserProvider';


const Profile = () => {
const {user} = UserAuth()
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
}
  return (
    <ChakraProvider theme={CustomTheme}>
      <Flex direction='row'>
        <Sidebar />
          <VStack
                align="flex-start" // Set vertical alignment to flex-start
                height="100vh"    // Set a height for the container (adjust as needed)           // Allow the VStack to grow and take remaining horizontal space
                overflowX="auto"
                width="100%"
                >
                <Header/>
                <Box padding='4' paddingBottom='4' width='100%'>
                    <Flex align="center" justify="center">
                            <VStack align="flex-start" flex='70%'>
                              <Flex align='center' boxShadow={10} width='100%'>
                                <Avatar style={{ width: "180px", height: "180px" }} src={user.pic} m={4} />
                                <Box>
                                  <Heading>{user.name}</Heading>
                                  <Text>Senior Engineer</Text>
                                  <br/>
                                  <Text>{user.email}</Text>
                                  <Text>09989982137</Text>
                                </Box>
                              </Flex>
                            </VStack>
                            <VStack flex='30%'>
                                <h3>BIO</h3>
                                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore</Text>
                            </VStack>
                    </Flex>
                </Box>
            </VStack>
      </Flex>
    </ChakraProvider>
  )
}

export default Profile