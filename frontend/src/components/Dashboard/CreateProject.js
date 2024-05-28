import React, { useState } from 'react';
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

const ProjectCreationPage = () => {
    const toast = useToast();
    const [project_name, setProjectName] = useState('');
    const [contract, setContract] = useState('');
    const [contractor, setContractor] = useState('');
    const [funds, setFunds] = useState('');
    const [procuring_entity, setProcuringEntity] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [street, setStreet] = useState('')
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }

    const handleCreateProject = async () => {
    
      if (!project_name || !contract || !contractor || !funds || !city || !province || !street || !procuring_entity || !projectDescription) {
        toast({
          title: "Please Fill all the Fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
  
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/project",
          {
            project_name,
            contract,
            contractor, 
            funds,
            city,
            province,
            street,
            procuring_entity,
            projectDescription
          },
          config
        );
        console.log(data);
        toast({
          title: "Project Created",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setProjectName('');
        setContract('');
        setContractor('');
        setFunds('');
        setCity('');
        setStreet('');
        setProvince('');
        setProcuringEntity('');
        setProjectDescription('');


      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      console.log(
        project_name,
        contract,
        contractor, 
        funds,
        city,
        province,
        street,
        procuring_entity,
        projectDescription);
  
      // Clear the form and close the modal
    };
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
                        <Header toggleSidebar={toggleSidebar}/>

            
          <Box padding='4 ' paddingBottom='0'  width='100%'>
            
            <Heading as="h1" size="lg" >Create New Construction Project</Heading>
          <Box p={4} maxW="md" borderRadius="md" mt={4}>
       
          
              <FormControl mb='5'>
                <FormLabel>Project Name</FormLabel>
                <Input
                  type="text"
                  value={project_name}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </FormControl>
              <FormControl mb='5'>
                <FormLabel>Contract</FormLabel>
                <Input
                  type="text"
                  value={contract}
                  onChange={(e) => setContract(e.target.value)}
                />
              </FormControl>
      


            <FormControl mb='5'>
              <FormLabel>Contractor</FormLabel>
              <Input
                type="text"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
              />
            </FormControl>
            <FormControl mb='5'>
              <FormLabel>Funds</FormLabel>
              <Input
                type="text"
                value={funds}
                onChange={(e) => setFunds(e.target.value)}
              />
            </FormControl>
            
              <Text>Location</Text>
                
            <FormControl>
              <FormLabel></FormLabel>
              <Input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
              />
            </FormControl>
            <FormControl>
              <FormLabel></FormLabel>
              <Input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder='Province'
              />
            </FormControl>
            <FormControl mb='5'>
                  <FormLabel></FormLabel>
                  <Input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder='Street'
                  />
            </FormControl>
      

            <FormControl mb='5'>
              <FormLabel>Procuring Entity</FormLabel>
              <Input
                type="text"
                value={procuring_entity}
                onChange={(e) => setProcuringEntity(e.target.value)}
              />
            </FormControl>
            <FormControl mb='5'>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                size='lg'
              />
            </FormControl>
          
          <Text fontSize='sm'>Please review details upon submission</Text>
          <Button type="submit" colorScheme="teal" mt={4} onClick={handleCreateProject}>
            Create Project
          </Button>
            </Box>
        </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default ProjectCreationPage;

// Project Name: A unique identifier for the project.
// Contract: Information related to the project's contract or agreement.
// Contractor: The entity or individual responsible for executing the project.
// Funds: Financial resources allocated for the project.
// Location: Information about the project's physical location (city, province, street).
// Procuring Entity: The organization or entity procuring the project.
// Project Description: A description or summary of the project.
