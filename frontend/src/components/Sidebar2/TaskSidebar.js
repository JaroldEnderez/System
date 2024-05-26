// Sidebar.js
import React, {useState} from 'react';
import { Box, VStack, Text, IconButton,Input, Image, Flex, Icon, Button, SliderTrack, Slider, Select, List, ListItem, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import {Link} from 'react-router-dom'
import { RiDashboardLine, RiSettingsLine, RiLogoutBoxLine } from 'react-icons/ri'; // You can choose your own icons
import {motion} from 'framer-motion'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Import arrow icons
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from '../../assets/images/logo.jpg'


const TaskSidebar = ({isSidebarOpen, toggleSidebar, tasks}) => {

    const [projectDetails, setProjectDetails] = useState(null);
    console.log({tasks})
    const handleInputChange = (e) => {
        // Update the state with the edited values
        setProjectDetails({
          ...projectDetails,
          [e.target.name]: e.target.value,
        });
      };

  return (
    
      <Box>
      

      {isSidebarOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="blackAlpha.600"
          zIndex="1000"
          onClick={() => toggleSidebar(null)}
        />
      )}

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isSidebarOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '300px',
          backgroundColor: 'white',
          boxShadow: '2xl',
          zIndex: 1001,
        }}
      >
        {tasks && (
          <Box
            width="100%"
            bg="white"
            color="white"
            boxShadow="md"
            paddingY="4"
            height="100%"
          >
            <VStack spacing="4" align="start" paddingX="4">
              <Flex justifyContent="center" alignItems="center">
                <Text fontSize="xl" color='black'>Task Name</Text>
              </Flex>
              <Input
                value={tasks.text}
                onChange={handleInputChange}
                color='black'
              />
              <Flex justifyContent="center" alignItems="center">
                <Text fontSize="xl" color='black'>Start Date</Text>
              </Flex>
              <Input
              color='black'
                value={tasks.start_date}
                type='date'
              />
              <Flex justifyContent="center" alignItems="center">
                <Text fontSize="xl" color='black'>Task Duration</Text>
              </Flex>
              <Flex>
                <Input
                type="number"
                value={tasks.duration}
                min='0'
                />
                <Text color='black'>Days</Text>
              </Flex>
              <Select value={tasks.priority || 'High'} readOnly>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Select>
              <Input
                type="color"
                value={tasks.color || '#FFC975'}
                readOnly
              />
              <Slider
                value={tasks.progress || 0}
                readOnly
              >
                <SliderTrack>
                  <SliderFilledTrack bg={tasks.color || '#FFC975'} />
                </SliderTrack>
                <SliderThumb bg={tasks.color || '#FFC975'} />
              </Slider>
              <Text fontSize="sm" textAlign="center">{tasks.progress || 0}%</Text>
            </VStack>
          </Box>
        )}
      </motion.div>
    </Box>
 
  )
};

export default TaskSidebar;
