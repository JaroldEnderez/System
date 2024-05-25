import { Box, Textarea, Flex, Input, Button, Avatar } from "@chakra-ui/react";
import { UserAuth } from '../Context/UserProvider'
import axios from 'axios'
import { useState } from "react";

const DiscussionBox = ({projectId}) => {
  const { user } = UserAuth();
  const [newPost, setNewPost] = useState('')
  console.log("ProjectId:", projectId)
  console.log(newPost)
  console.log("User: ",user._id)
  
  const handleCreatePost = async () => {
    try{
      const response = await axios.post(`/api/discussions`, {
        projectId: projectId,
        content: newPost,
        author: user._id,
      })
      console.log("Post created successfully:", response.data);
      setNewPost('')
    }catch(error){
      console.error("Error creating post: ", error)
    }
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" width='100%' display='flex' alignItems='center' mb='20px'>
          <Avatar name={user.name} size="sm" mr="2" />
          <Textarea 
          placeholder="Post an announcement..." 
          
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          />
      
          <Button colorScheme="blue" onClick={handleCreatePost} ml='4'>Post</Button>

    </Box>
  );
};

export default DiscussionBox;
