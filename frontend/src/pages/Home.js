import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import Background from "../assets/images/excavator-action.jpg"

function Home() {
  const history = useHistory();

 
  
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));

  //   if (user) history.push("/chats");
  // }, [history]);

  return (
    <Container maxW="100vw" 
    maxH="100vh" 
    w="100vw"
    p={0} 
    centerContent
    bgImage={`url(${Background})`}
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover" >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="50%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="" centerContent>
          SM&MST Project Management 
        </Text>
      </Box>
      <Box bg="white" w="50%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Home;