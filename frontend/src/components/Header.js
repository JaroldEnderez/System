// Header.js
<<<<<<< HEAD
import React from 'react';
=======
import React, {useState} from 'react';
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
import { Flex, Box, Heading, Text, Button, Avatar, Menu, MenuButton, IconButton, MenuItem,MenuList, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Project_Modal from './Modal/Project_Modal' 
import { UserAuth } from '../Context/UserProvider';
import Logo from '../assets/images/logo.jpg'
import EnterProject from './Dashboard/EnterProject';
<<<<<<< HEAD

const Header = () => {
=======
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({toggleSidebar}) => {
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
  const { logout } = UserAuth();
  const {user} = UserAuth
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    // Call the logout method from the context
    localStorage.removeItem('user');

    logout();
    window.location.href = '/';
    onClose();

    // Optionally, you can redirect the user to the login page or perform other actions
  };

<<<<<<< HEAD

  return (
    <Box width="100%" style={{ zIndex: 2 }} position="relative">
=======
  return (
    <Box width="100%" style={{ zIndex: 2 }} position="relative" >
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
      <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="4"
      borderBottom="1px"
      borderColor="gray.200"
<<<<<<< HEAD
    >
      <Box>
=======
      bg="gray.800"
    >
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
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
        <Image
            src={Logo} // Replace with the actual URL of your image
            alt="SM&MST Construction Company"
            width="200px" // Set the width to your desired size
            height="75px" // Set the height to your desired size
            objectFit="contain"
          />
<<<<<<< HEAD
      </Box>
=======
      </Flex>
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf

      <Box >
      <Flex align="center">
        <EnterProject/>
        <Link to="/create" >
          
          <Button mr={4} colorScheme="teal">Create New Project</Button>
        </Link>
        {/* User Icon */}
        <Menu>
            <MenuButton 
            as={IconButton} 
            icon={<Avatar size="md" name={user?.name} src={user?.pic} />} 
            variant="outline" 
<<<<<<< HEAD
            style={{ boxShadow: 'none' }}
=======
            sx={{
              borderRadius: 'full',
              boxShadow: 'none',
              _focus: { boxShadow: 'none', outline: 'none' },
              _active: { boxShadow: 'none', outline: 'none' },
              _hover: { boxShadow: 'none' },
            }}
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
            />
            <MenuList>
                <Link to={"/profile"}>
                  <MenuItem>
                      Visit Profile
                  </MenuItem>
                </Link>
                <MenuItem variant="link" onClick={onOpen} color='black'>
                    Logout
                </MenuItem>
            </MenuList>

        </Menu>

        <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to log out?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="red" onClick={handleLogout} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </Flex>
      </Box>
    </Flex>
    </Box>
  );
};

export default Header;
