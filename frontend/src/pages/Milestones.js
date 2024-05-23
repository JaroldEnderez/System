import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar2/Sidebar';
import CustomTheme from '../CustomTheme';
import HeaderWithProject from '../components/HeaderWithProject';
import Discussion from '../components/Discussion';
import axios from 'axios'
import Send from '../assets/images/send.png'
import { UserAuth } from '../Context/UserProvider';
import { ChakraProvider, Flex, Text, VStack, Divider, Button, IconButton, Center } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import CreateMilestoneModal from '../components/Modal/CreateMilestoneModal';
import MilestoneCard from '../components/Cards/MilestoneCard'

const Milestones = () => {

    const { projectId } = useParams();
    const [project,setProject] = useState('')
    const [milestones, setMilestones] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }
    let  ongoingMilestones= milestones.filter(milestone => milestone.status === 'ongoing');
    let delayedMilestones= milestones.filter(milestone => milestone.status === 'delayed');
    let completedMilestones= milestones.filter(milestone => milestone.status === 'completed');
    
    function updateMilestones() {
      const currentDate = new Date();
  
      milestones.forEach(milestone => {
          const dueDate = new Date(milestone.dueDate);
  
          if (milestone.status === 'ongoing' && currentDate > dueDate) {
              milestone.status = 'delayed';
          }
      });
  
      // Update the filtered arrays
      ongoingMilestones = milestones.filter(milestone => milestone.status === 'ongoing');
      delayedMilestones = milestones.filter(milestone => milestone.status === 'delayed');
      completedMilestones = milestones.filter(milestone => milestone.status === 'completed');
  }
  
  // // Run the updateMilestones function every minute (60000 milliseconds)
 updateMilestones()

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
    }; 
    useEffect(() => {
      // Replace this with your actual API call to fetch projects
      const fetchProject = async () => {
        // Example: Fetching projects from an API
        try {
          const response = await fetch(`/api/project/${projectId}`);
          const data = await response.json();
          console.log(data)
          setProject(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
      
      fetchProject();
  
    }, []);

    useEffect(()=>{
      const fetchMilestonesByProjectId = async () => {
        try {
          // Perform an asynchronous operation to fetch milestones by project ID
          const response = await fetch(`/api/milestones/from-project/${projectId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch milestones for project ID ${projectId}`);
          }
          const milestonesData = await response.json();
          setMilestones(milestonesData);
          console.log(milestonesData)
        } catch (error) {
          console.error('Error fetching milestones:', error);
          return []; // Return an empty array or handle the error appropriately
        }
      };

      fetchMilestonesByProjectId()
    },[projectId])
        
    useEffect(() => {
      const intervalId = setInterval(() => {
        const currentDate = new Date();
        const updatedMilestones = ongoingMilestones.map(milestone => {
          if (milestone.dueDate < currentDate) {
            if (milestone.status !== 'completed') {
              axios.put(`/api/milestones/${milestone._id}/status`, { status: 'delayed' })
              .then(response => {
                // Assuming you have a success handler function
                console.log('Milestone status updated successfully:', response.data);
              })
              .catch(error => {
                // Handle error if PUT request fails
                console.error('Error updating milestone status:', error);
              });
              
              return { ...milestone, status: 'delayed' };
            }
          }
          return milestone;
        });
        // Update state with the modified milestones
        // Assuming you have a state setter function called setMilestones
        setMilestones(updatedMilestones);
      }, 24 * 60 * 60 * 1000); // Check every 24 hours (adjust as needed)
  
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [milestones]); // Only re-run the effect if milestones change
  console.log(ongoingMilestones)
    
  return (
    <ChakraProvider theme={CustomTheme}>
      <Flex direction="row">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
              <VStack
                align="flex-start" // Set vertical alignment to flex-start
                height="100vh"    // Set a height for the container (adjust as needed)           // Allow the VStack to grow and take remaining horizontal space
                overflowX="auto"
                width="100%"
                >
                <HeaderWithProject projectId= {projectId} toggleSidebar={toggleSidebar}/>
                <Center width="100%">
                <>
                    <Flex alignItems="center" marginBottom="10px">
                      {/* Button with plus icon and "Create Milestone" text */}
                      <IconButton
                        as={AddIcon}
                        boxSize="1em"
                        color="green.500"
                        marginRight="5px"
                        onClick={handleOpenModal} // Open modal when button is clicked
                      />
                      <Text fontSize="xl" fontWeight="bold" marginLeft="5px">Create Milestone</Text>
                    </Flex>

                    {/* Render CreateMilestoneModal when isModalOpen is true */}
                    <CreateMilestoneModal
                      isOpen={isModalOpen}
                      onClose={handleCloseModal}
                      projectId={projectId} // Pass projectId here if needed
                    />
                  </>
                </Center>
                <Flex justifyContent='space-evenly' align="flex-start" width='100%' marginTop='10px'>
                    <div margin='10px'>
                        <Text fontSize="xl" fontWeight="bold" color="green.500">Ongoing Milestones</Text>
                        {ongoingMilestones.length === 0 ? (
                        <Text>No ongoing milestones</Text>
                        ) : (
                        ongoingMilestones.map(milestone => (
                          <MilestoneCard key={milestone._id} milestone={milestone} />
                        ))
                        
                        )}
                    </div>
                    
                    <div margin='10px'>
                        <Text fontSize="xl" fontWeight="bold" color="red.500">Delayed Milestones</Text>
                        {delayedMilestones.length === 0 ? (
                        <Text>No delayed milestones</Text>
                        ) : (
                        delayedMilestones.map(milestone => (
                          <MilestoneCard key={milestone._id} milestone={milestone} />
                        ))
                        )}
                    </div>
                    
                    <div margin='10px'>
                        <Text fontSize="xl" fontWeight="bold" color="blue.500">Completed Milestones</Text>
                        {completedMilestones.length === 0 ? (
                        <Text>No completed milestones</Text>
                        ) : (
                        completedMilestones.map(milestone => (
                          <MilestoneCard key={milestone._id} milestone={milestone} />
                        ))
                        )}
                    </div>
                </Flex>
            </VStack>
          </Flex>
    </ChakraProvider>
  )
}

export default Milestones