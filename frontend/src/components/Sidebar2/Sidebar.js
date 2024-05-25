// Sidebar.js
<<<<<<< HEAD
import React from 'react';
import { Box, VStack, Text, Icon } from '@chakra-ui/react';
import {Link} from 'react-router-dom'
import { RiDashboardLine, RiSettingsLine, RiLogoutBoxLine } from 'react-icons/ri'; // You can choose your own icons

const Sidebar = () => {
  return (
    <Box
    width="250px"
    bg="gray.800"
    color="white"
    boxShadow="md"
    paddingY="4"
    style={{ zIndex: 1 }}
    >
      <VStack spacing="4" align="start" paddingX="4">
        <Link to='/chats' >
          <Icon as={RiDashboardLine} boxSize="6" />
          <Text>Dashboard</Text>
        </Link>
        <Link>
          <Icon as={RiSettingsLine} boxSize="6" />
          <Text>Clients</Text>
        </Link>
        <Link>
          <Icon as={RiLogoutBoxLine} boxSize="6" />
          <Text>Engineers</Text>
        </Link>
        <Link>
          <Icon as={RiLogoutBoxLine} boxSize="6" />
          <Text>Budget Plan</Text>
        </Link>
        <Link>
          <Icon as={RiLogoutBoxLine} boxSize="6" />
          <Text>Logout</Text>
        </Link>
      </VStack>
    </Box>
=======
import React, {useState} from 'react';
import { Box, VStack, Text, IconButton,useDisclosure, Image, Flex, Icon } from '@chakra-ui/react';
import {Link} from 'react-router-dom'
import { RiDashboardLine, RiSettingsLine, RiLogoutBoxLine } from 'react-icons/ri'; // You can choose your own icons
import {motion} from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Import arrow icons
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from '../../assets/images/logo.jpg'


const Sidebar = ({isSidebarOpen, toggleSidebar}) => {


  
  return (
    <>
      {isSidebarOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="1000"
          onClick={toggleSidebar}
        />
      )}

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '300px',
          backgroundColor: 'white',
          boxShadow: '2xl',
          zIndex: 1001,
        }}
      >
          <Box
          width="100%"
          bg="gray.800"
          color="white"
          boxShadow="md"
          paddingY="4"
          style={{ zIndex: 1 }}
          height='100%'
          >
            <VStack spacing="4" align="start" paddingX="4">
              <Flex justifyContent='center' alignItems='center'> 
                <IconButton
                  onClick={toggleSidebar}
                  icon={<GiHamburgerMenu/>}
                  rounded='md'
                  bg="none"
                  _hover={{ bg: 'gray.900' }}
                  color='white'
                  marginRight='1rem'
                  fontSize='2rem'
                />
                <Image
                    src={Logo} // Replace with the actual URL of your image
                    alt="SM&MST Construction Company"
                    width="200px" // Set the width to your desired size
                    height="75px" // Set the height to your desired size
                    objectFit="contain"
                  />
            </Flex>
            <Link to='/chats'>
                <Icon as={RiDashboardLine} boxSize="6" />
                <Text>Dashboard</Text>
              </Link>
             
              <Link>
                <Icon as={RiSettingsLine} boxSize="6" />
                <Text>Clients</Text>
              </Link>
              <Link>
                <Icon as={RiLogoutBoxLine} boxSize="6" />
                <Text>Engineers</Text>
              </Link>
              <Link>
                <Icon as={RiLogoutBoxLine} boxSize="6" />
                <Text>Budget Plan</Text>
              </Link>
              <Link>
                <Icon as={RiLogoutBoxLine} boxSize="6" />
                <Text>Logout</Text>
              </Link>
            </VStack>
          </Box>
      </motion.div>
    </>
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
  );
};

export default Sidebar;
