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
    // Here you would typically fetch suggestions from your database or data source
    // For demo purposes, I'm using a simple filtering method with mock data
  };

  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration purpose, just log the form data
    console.log(formData);
    // Reset form fields after submission
    setFormData({ username: '', role: '' });
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
                <div style={{marginLeft:15, cursor:'pointer'}} key={user._id} onClick={(e) => setSearchQuery(user.name)}>
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
            onChange={handleInputChange}
            placeholder="Select Role"
            required
          >
            <option value="Admin">Admin</option>
            <option value="Moderator">Project Manager </option>
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
