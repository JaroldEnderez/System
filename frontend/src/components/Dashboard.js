import { Box, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, Link as RouterLink  } from 'react-router-dom'
import { AiOutlineTeam, AiTwotoneBuild, AiTwotoneCheckCircle, AiTwotoneStop } from "react-icons/ai";
import StatusButton from './Miscellaneous/StatusButton';


const Dashboard = () => {

  
  return (
    <>
        <HStack width='100%' padding='4 ' paddingBottom='0'>
              <StatusButton status='Pending'/>
              <StatusButton status='Paused'/>
              <StatusButton status='Ongoing'/>
              <StatusButton status='Completed'/>
          </HStack>
          <HStack width='100%' padding='4' paddingTop='0' height='100%'>
          <Box
            as={RouterLink}
            to="/tasks"  // Replace with the actual path you want to navigate to
            width="70%"
            height="100%"
            backgroundColor="gray.200"
            borderRadius='10'
            _hover={{
              textDecoration: 'none',  // Optional: Remove underline on hover
              backgroundColor: 'gray.300',  // Optional: Change background color on hover
            }}
            >
              <Text paddingLeft="2">
                Tasks
              </Text>
            </Box>
              <Box  boxShadow="md" width="30%" height="100%" backgroundColor="gray.200" borderRadius='10' >
            <Link>
              </Link>
              <Text paddingLeft="2">
              The Developers
              </Text>
              </Box>
          </HStack>
    </>
  )
}

export default Dashboard