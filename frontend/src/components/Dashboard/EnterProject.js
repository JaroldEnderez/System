import React, { useState } from 'react';
import { Box,useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const EnterProject = ({ onSelectOption }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState('');

  const handleJoinProject = () => {
    setSelectedOption('Join Project');
    onSelectOption('Join Project');
    onClose(); // Close modal after action
  };

  const handleCreateProject = () => {
    setSelectedOption('Create Project');
    onSelectOption('Create Project');
    onClose(); // Close modal after action
  };

  return (
    <>
    <Box onClick={onOpen} cursor= 'pointer' _hover={{ bg: 'gray.900' }} rounded='md'>
      <FaPlus style={{ fontSize: '1.5rem', marginRight: '1rem', color:'white' }} />
    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose an option</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={handleJoinProject} mr={3}>Join a Project</Button>
            <Button onClick={handleCreateProject}>Create a Project</Button>
          </ModalBody>

        </ModalContent>
      </Modal>
      </>
  )
}

export default EnterProject