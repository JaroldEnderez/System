import React, { useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {
  ChakraProvider,
  
  Flex,
  VStack,
  Box,
  Heading,
  Text, 
  Avatar,
  Textarea,
  Button
} from '@chakra-ui/react';
import { IoSend } from "react-icons/io5";
import Header from './Header';
import Sidebar from './Sidebar2/Sidebar';
import CustomTheme from './../CustomTheme';
import Discussion from './Discussion';
import axios from 'axios'
import Send from '../assets/images/send.png'
import { UserAuth } from '../Context/UserProvider';

const AdminPanel= () => {
    const { projectId } = useParams();
    const [project,setProject] = useState('')

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

        return (
          <Box maxW="800px" mx="auto" p="20px" bg="white" borderWidth='1px' borderRadius="lg" boxShadow="inner" mb="20px">
            <Heading as="h2" fontSize="xl" fontWeight="bold" mb="20px">
              {`${project.project_name}`}
            </Heading>
            <Box mb="20px">
              <Text fontWeight="bold">Location:</Text>
              <Text>{`${project.street}`}, {`${project.city}`}, {`${project.province}`}</Text>
            </Box>
            <Box mb="20px">
              <Text fontWeight="bold">Contract:</Text>
              <Text>{`${project.contract}`}</Text>
            </Box>
            <Box mb="20px">
              <Text fontWeight="bold">Contractor:</Text>
              <Text>{`${project.contractor}`}</Text>
            </Box>
            <Box mb="20px">
              <Text fontWeight="bold">Procuring Entity:</Text>
              <Text>{`${project.procuring_entity}`}</Text>
            </Box>
            <Box mb="20px">
              <Text fontWeight="bold">Status:</Text>
              <Text color="green">{`${project.status}`}</Text>
            </Box>
            <Box>
              <Text>{`Created at: ${project.createdAt}`}</Text>
            </Box>
          </Box>
    
      );
};






function App() {
  const {user} = UserAuth()
  const [discussions, setDiscussions] = useState([])
  const { projectId } = useParams(); // This line extracts projectId from the URL
  const [comments, setComments] = useState(Array(discussions.length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(-1); // Initialize with -1 to indicate no focus initially

// Function to handle focus on a specific textarea
const handleTextareaFocus = (index) => {
  setFocusedIndex(index);
};

  
useEffect(() => {
  const fetchDiscussionsUsersAndComments = async () => {
      try {
          // Fetch discussions
          const response = await axios.get('/api/discussions');
          const discussions = response.data;

          // Fetch users and comments for each discussion
          const discussionsWithUsersAndComments = await Promise.all(discussions.map(async discussion => {
              // Fetch user data for the discussion author
              const userResponse = await axios.get(`/api/user/${discussion.author}`);
              const user = userResponse.data;
              const userName = user.name; // Extract user's name

              // Fetch comments for the current discussion
              const commentResponse = await axios.get(`/api/discussions/${discussion._id}/comments`);
              const comments = commentResponse.data;

              // Combine discussion, user, and comments data
              return {
                  ...discussion,
                  author: { name: userName },
                  comments: comments.length > 0 ? comments.map(comment => ({
                      content: comment.content,
                      author: comment.author,
                      dateCreated: comment.dateCreated
                  })) : []
              };
          }));

          // Update state with discussions data including users and comments
          setDiscussions(discussionsWithUsersAndComments);
      } catch (error) {
          console.error("Error fetching discussions, users, and comments: ", error);
      }
  }

  fetchDiscussionsUsersAndComments();
}, []);



  
  function formatDiscussionDate(postedDate) {
    const today = new Date();
    const postedDateTime = new Date(postedDate);

    // Calculate the difference in milliseconds between today and the posted date
    const timeDifference = today.getTime() - postedDateTime.getTime();
    const timeDifferenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // If it has been more than a week, display the month and date
    if (timeDifferenceInDays > 7) {
        const options = { month: 'short', day: 'numeric' };
        return postedDateTime.toLocaleDateString('en-US', options);
    }

    // Otherwise, display the day of the week
    const options = { weekday: 'long' };
    return postedDateTime.toLocaleDateString('en-US', options);
}


const handleReplySubmit = async (discussionId, replyContent) => {
  console.log("Reply: ", replyContent, user._id, discussionId)
  
  try {
    // Send a POST request to your backend API endpoint
    const response = await axios.post("/api/comments", {
      discussionId: discussionId,
      content: replyContent,
      author: user._id
    });
    
    console.log("Reply submitted successfully:", response.data);
    console.log("discussion: ", discussionId)
    // Optionally, update the UI to indicate that the reply was submitted successfully
  } catch (error) {
    console.error("Error submitting reply:", error);
    // Optionally, display an error message to the user
  }
};


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
                  <Box padding='8' width='100%' display='flex' >
                    
                      <AdminPanel mr='10' />
                      <Box paddingLeft='5'paddingRight='5' >
                        <Discussion projectId={projectId} />
                        <Box>
                          <Heading as="h2" size="lg" mb="4">Discussions for Project {projectId}</Heading>
                          {discussions.slice().reverse().map((discussion,index) => (   
                            <Box key={discussion._id} borderWidth="1px" borderRadius="lg" p="4" mb="4" display='block'>
                              <Box display='flex' alignItems='center'>
                                <Avatar name={discussion.author.name}/>
                                <Box>
                                  <Text ml='3' fontWeight='bold'>{discussion.author.name}</Text>
                                  <Text ml='3' fontSize="sm" opacity="0.6">{formatDiscussionDate(discussion.createdAt)}</Text>
                                </Box>
                              </Box>
                              <Box ml="3" mt="3"> {/* Add mt="3" for margin-top */}
                                <Text>{discussion.content}</Text>
                              </Box>
                              <Box ml="3" mt="3" display="flex" alignItems="center"> {/* Use display="flex" to create a flex container */}
                                <Textarea
                                  key={index}
                                  placeholder="Reply here..."
                                  value={comments[index]}
                                  onChange={(e)=>{
                                    const newComments = [...comments]
                                    newComments[index] = e.target.value
                                    setComments(newComments)
                                    }}
                                    onFocus={() => handleTextareaFocus(index)} // Track focus on textarea
                                    onBlur={() => setFocusedIndex(-1)} // Reset focusedIndex when textarea loses focus
                                  flex="1" // Use flex="1" to allow the textarea to grow and fill the available space
                                />
                                <Button ml="2" onClick={()=>handleReplySubmit(discussion._id, comments[index])}><IoSend /></Button> 
                                  
                              </Box>
                              <Box>
                                    {discussion.comments.length>0 && (
                                      <Text m='3' fontWeight='bold' textDecoration='underline'>Comments</Text>
                                    )}

                                    {discussion.comments.map(comment => (
                                        <Box m='3' key={comment._id}>
                                           <Box display='flex' alignItems='center'>
                                            <Avatar name={comment.author.name}/>
                                            <Box>
                                              <Text ml='3' fontWeight='bold'>{comment.author.name}</Text>
                                              <Text ml='3' fontSize="sm" opacity="0.6">{formatDiscussionDate(comment.createdAt)}</Text>
                                            </Box>
                                          </Box>
                                          <Box ml="3" mt="3"> {/* Add mt="3" for margin-top */}
                                            <Text>{comment.content}</Text>
                                          </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                          ))}
                          
                        </Box>
                      </Box>
                  </Box>
            </VStack>
          </Flex>
    </ChakraProvider>
  );
}

export default App;
