import React, { useState,useEffect } from 'react';
import {
  ChakraProvider,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex,
  VStack,
  Box,
  Heading,
  IconButton
} from '@chakra-ui/react';
import Header from '../Header';
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';
import { FaEdit } from "react-icons/fa"; // Import the edit icon


function AdminPanel() {

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({ username: '', role: '' });

  useEffect(() => {
    // Replace this with your actual API call to fetch projects
    const fetchUsers = async () => {
      // Example: Fetching projects from an API
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchUsers()
  },[])
  
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query)
    setFormData({ ...formData, username: searchQuery});
    console.log(formData)
    // Here you would typically fetch suggestions from your database or data source
    // For demo purposes, I'm using a simple filtering method with mock data
  };

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Find the user with the selected name
    const selectedUser = users.find(user => user.name === formData.username);

    // Update the role of the selected user
    if (selectedUser) {
      // Assuming you have a function to update the user role, update it here
      // updateUserRole(selectedUser._id, formData.role);
      console.log(`Role ${formData.role} set for user ${selectedUser.name}`);
    } else {
      console.log(`User with name ${formData.username} not found.`);
    }
  };

const handleRoleChange = (e) => {
  setFormData({ ...formData, role: e.target.value });
}

const handleUserSelect = (selectedUsername) => {
  // Update search query for visual feedback (optional)
  setSearchQuery('');
  // Update the formData state immediately with the selected username
  setFormData({ ...formData, username: selectedUsername });
  setSearchQuery(selectedUsername)
  console.log(formData)
};

  return (
    
    <Container maxW="container.lg" mt={8}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>User ID</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={user.profilePictureUrl} alt="Profile" width="50" height="50" style={{ marginRight: '10px' }} />
                  <span>{user.name}</span>
                </div>
              </Td>
              <Td>{user._id}</Td>
              <Td>{user.role}
                
                  <IconButton
                    aria-label="Edit"
                    icon={<FaEdit />}
                    colorScheme="teal"
                  />
  
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mt={4}>
          <FormLabel>Username</FormLabel>
          <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <div style={{ backgroundColor: searchQuery && users.filter(user => user.name.startsWith(searchQuery)).length > 0 ? 'lightgray' : 'transparent'}}>
              { 
                searchQuery && users.filter(user => user.name.startsWith(searchQuery)).map((user)=>(
                <div onClick={(e) => handleUserSelect(user.name)} style={{marginLeft:15, cursor:'pointer'}} key={user._id}>
                  {user.name}<hr/>
                </div>)
              )}
            </div>
        </FormControl>
        <FormControl id="role" mt={4}>  
          <FormLabel>Role</FormLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            placeholder="Select Role"
            required
          >
            <option value="Admin">Admin</option>
            <option value="Project Manager">Project Manager </option>
            <option value="Engineer">Engineer</option>
            <option value="Supervisor">Supervisor</option>
            <option value="User">User</option>
          </Select>
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Save
        </Button>
      </form>
    </Container>
  );
}

function App() {
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
                  <Box padding='4' paddingBottom='4' width='100%'>
                    <Heading paddingBottom='10'>Users</Heading>
                    <AdminPanel />
                  </Box>
            </VStack>
          </Flex>
    </ChakraProvider>
  );
}

export default App;
