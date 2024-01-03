// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';

const Clients = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user');
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box paddingLeft='4'>
      <Heading as="h2" mb="4">
        Clients 
      </Heading>
      <List>
        {users.map(user => (
          <ListItem key={user._id} paddingBottom="2rem">
            <strong>{user.name}</strong><br/>
            {user.email}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Clients;
