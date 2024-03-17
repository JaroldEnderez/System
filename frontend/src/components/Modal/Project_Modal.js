import React, { useState } from 'react';
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Textarea,
  useDisclosure,
  StepDescription,
} from '@chakra-ui/react';

const Project_Modal = ({ onCreate }) => {
  const toast = useToast() 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [project_name, setProjectName] = useState('');
  const [contract, setContract] = useState('');
  const [contractor, setContractor] = useState('');
  const [funds, setFunds] = useState('');
  const [location, setLocation] = useState('');
  const [procuring_entity, setProcuringEntity] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  
  const handleCreateProject = async () => {
  
    if (!project_name || !contract || !contractor || !funds || !location || !procuring_entity || !projectDescription) {
      toast({
        title: "Please Fill all the Feilds",
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
          location,
          procuring_entity,
          projectDescription
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
      location,
      procuring_entity,
      projectDescription);

    // Clear the form and close the modal
    setProjectName('');
    setContract('');
    setContractor('');
    setFunds('');
    setLocation('');
    setProcuringEntity('');
    setProjectDescription('');
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" mr={3}>Create New Project</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input
                type="text"
                value={project_name}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contract</FormLabel>
              <Input
                type="text"
                value={contract}
                onChange={(e) => setContract(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Contractor</FormLabel>
              <Input
                type="text"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Funds</FormLabel>
              <Input
                type="text"
                value={funds}
                onChange={(e) => setFunds(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Procuring Entity</FormLabel>
              <Input
                type="text"
                value={procuring_entity}
                onChange={(e) => setProcuringEntity(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </FormControl>
            
            {/* Add other form controls for the new inputs */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateProject}>
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Project_Modal;
