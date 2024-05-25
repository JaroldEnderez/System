import React from 'react'
import { Box, Text, Image,Flex, Heading } from '@chakra-ui/react';

const ProjectCard = () => {
  return (
    <Box maxW= '300px' 
         maxH='600px' 
         background='red' 
         borderRadius='15px' 
         margin='0px 20px'
         cursor='pointer'
         transform='scale(0.9)'
         transition='transform 150ms ease-in, box-shadow 0.2s linear'
         bg="white"
        boxShadow="10px 10px 5px -2px rgba(0, 0, 0, 0.75)"
        textAlign='center'
        sx={{
            '&:hover': {
              transform: 'scale(1)',
              boxShadow: '10px 10px 28px -2px rgba(0, 0, 0, 0.75)',
            }
          }}>
        <Text color= 'rgb(248, 51, 84)' font-weight= '600'>6/6/26    </Text>
        <Heading as="h1"  p= '0px 0px 20px 0px'>Construction Title</Heading>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <Box>
            <Flex 
            borderRadius="0px 0px 15px 15px"
            justifyContent="space-between"
            alignItems="center"
            p="20px"
            textAlign="center"
            bg="rgb(240, 54, 85)"
            color="white">
                <Box>
                    <Text>4</Text>
                    <Text>Tasks</Text>
                </Box>
                <Box>
                    <Text>10</Text>
                    <Text>Milestones</Text>
                </Box>
                <Box>
                    <Text>11</Text>
                    <Text>Members</Text>
                </Box>
            </Flex>
        </Box>
    </Box>
  )
}

export default ProjectCard