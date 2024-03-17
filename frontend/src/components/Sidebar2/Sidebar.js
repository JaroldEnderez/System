// Sidebar.js
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
  );
};

export default Sidebar;
