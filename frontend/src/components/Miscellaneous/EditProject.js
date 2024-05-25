import React, { useState, useEffect } from 'react';
import { useToast } from "@chakra-ui/toast";
import {
  ChakraProvider,
  Box,
  Input,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  VStack,
  Flex,
Heading
} from '@chakra-ui/react';
import axios from 'axios';
import Header from '../Header';
import Sidebar from '../Sidebar2/Sidebar';
import CustomTheme from '../../CustomTheme';


const EditProject = ({ match }) => {
  const projectId = match.params._id;
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Fetch project details using the projectId
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/api/project/${projectId}`);
        const projectData = response.data;
        setProjectDetails(projectData);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleChange = (e) => {
    // Update the state with the edited values
    setProjectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to update the project details
      await axios.put(`/api/project/edit/${projectId}`, projectDetails);
      console.log('Project details updated successfully!');
    } catch (error) {
      console.error('Error updating project details:', error);
    }
  };

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

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
            
            <Box padding='4 ' paddingBottom='0'  width='100%'>
            
            <Heading as="h1" size="lg" >Edit Construction Project {projectDetails._id}</Heading>
                <Box p={4} maxW="md" borderRadius="md" mt={4}>
       
                    <form onSubmit={handleSubmit}>
                    <FormControl mt={4}>
                        <FormLabel>Project Name</FormLabel>
                        <Input
                        type="text"
                        name="project_name"
                        value={projectDetails.project_name}
                        onChange={handleChange}
                        />
                    </FormControl>

                
                    <FormControl mb='5'>
                        <FormLabel>Contract</FormLabel>
                        <Input
                        type="text"
                        name="contract"
                        value={projectDetails.contract}
                        onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mb='5'>
                        <FormLabel>Contractor</FormLabel>
                        <Input
                            type="text"
                            name="contractor"
                            value={projectDetails.contractor}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mb='5'>
                    <FormLabel>Funds</FormLabel>
                    <Input
                        type="text"
                        name="funds"
                        value={projectDetails.funds}
                        onChange={handleChange}
                    />
                    </FormControl>
            
                    <Text>Location</Text>
                        
                    <FormControl>
                    <FormLabel></FormLabel>
                    <Input
                        type="text"
                        name="city"
                        value={projectDetails.city}
                        onChange={handleChange}
                    />
                    </FormControl>

                    <FormControl>
                    <FormLabel></FormLabel>
                    <Input
                        type="text"
                        name="province"
                        value={projectDetails.province}
                        onChange={handleChange}
                        
                    />
                    </FormControl>

                    <FormControl mb='5'>
                        <FormLabel></FormLabel>
                        <Input
                            type="text"
                            name="street"
                            value={projectDetails.street}
                            onChange={handleChange}
                        />
                    </FormControl>
      

                    <FormControl mb='5'>
                    <FormLabel>Procuring Entity</FormLabel>
                    <Input
                        type="text"
                        name="procuring_entity"
                        value={projectDetails.procuring_entity}
                        onChange={handleChange}
                    />
                    </FormControl>

                    <FormControl mb='5'>
                    <FormLabel>Description</FormLabel>
                    <Input
                        type="text"
                        name="projectDescription"
                        value={projectDetails.projectDescription}
                        onChange={handleChange}
                        size='lg'
                    />
                    </FormControl>

                    {/* Add more FormControl components for other fields as needed */}

                    <Button type="submit" mt={4} colorScheme="teal">
                        Save Changes
                    </Button>
                    </form>
                </Box>
            </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default EditProject;
