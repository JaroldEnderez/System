// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import Calendars from './Calendars'
<<<<<<< HEAD

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
=======
import ProjectCard from '../Cards/ProjectCard';

const Clients = () => {
  
  return (
    <>
      <ProjectCard></ProjectCard>
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
    </>
  );
};

export default Clients;
