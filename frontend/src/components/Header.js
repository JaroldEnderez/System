// Header.js
import React from 'react';
import { Flex, Box, Heading, Text, Button, Avatar, Menu, MenuButton, IconButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  return (
    <Box width="100%" style={{ zIndex: 2 }} position="relative">
      <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Box>
        <Heading as="h1" size="lg">
          SM&MST
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Construction Company
        </Text>
      </Box>

      <Box>
      <Flex align="center">
        {/* User Icon */}
        <Avatar size="md" name="John Doe" />

        {/* User Actions Menu */}
        <Menu>
          <MenuButton ml="2" as={IconButton} icon={<FiLogOut/>} variant="outline" />
          <MenuList>
            <MenuItem>Visit Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      </Box>
    </Flex>
    </Box>
  );
};

export default Header;
