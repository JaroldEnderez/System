// Sidebar.js
import React from 'react';
import { Box, VStack, Text, Link, Icon } from '@chakra-ui/react';
import { RiDashboardLine, RiSettingsLine, RiLogoutBoxLine } from 'react-icons/ri'; // You can choose your own icons

const Sidebar = () => {
  return (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      width="250px"
      height="100vh"
      position="relative"
      align="left"
      top="0"
      left="0"
      boxShadow="md"
      paddingY="4"
      style={{ zIndex: 1 }}
    >
      <VStack spacing="4" align="start" paddingX="4">
        <Link>
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
