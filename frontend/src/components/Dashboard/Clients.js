// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import Calendars from './Calendars'

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
    <>
      <Calendars></Calendars>
    </>
  );
};

export default Clients;
