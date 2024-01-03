import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Chatpage from './pages/Chatpage'
import Clients from './components/Dashboard/Clients'
import ProjectList from './components/Dashboard/ProjectList';
import Calendars from './components/Dashboard/Calendars';
import { ChakraProvider } from '@chakra-ui/react';
import Pending from './components/Dashboard/Pending';
import Paused from './components/Dashboard/Paused';
import ProjectsByStatus from './components/Dashboard/ProjectsByStatus';
import GanttChart from './components/GanttChart';

function App() {
  return (
    <>
      <ChakraProvider>
        <Route path="/" component={Home} exact/>
        <Route path="/chats" component={Chatpage}/>
        <Route path="/clients" component={Clients}/>
        <Route path="/projects/:status" component={ProjectsByStatus} />      
        <Route path="/projects" component={ProjectList} exact/>
        <Route path="/calendars" component={Calendars}/>
        <Route path="/pending" component={Pending}/>
        <Route path="/paused" component={Paused}/>
        <Route path="/gantt" component={GanttChart}/>
      </ChakraProvider>
    </>
  )
}

export default App;
