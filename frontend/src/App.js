import { Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Chatpage from './pages/Chatpage'
import Clients from './components/Dashboard/Clients'
import ProjectList from './components/Dashboard/ProjectList';
import Calendars from './components/Dashboard/Calendars';
import { ChakraProvider } from '@chakra-ui/react';
import ProjectsByStatus from './components/Dashboard/ProjectsByStatus';
import Profile from './components/Dashboard/Profile'
import Gantt from './components/Gantt/Gantt';
import Admin from './components/Admin/admin'
import CreateProject from './components/Dashboard/CreateProject';
import EditProject from './components/Miscellaneous/EditProject';
import Class from './pages/Class'
import Milestones from './pages/Milestones';
// import Progress from './components/Progress';
import TodoList from './components/Miscellaneous/TodoList';


function App() {
  return (
    <>
      <ChakraProvider>
        <Route path="/" component={Home} exact/>
        <Route path="/chats" component={Chatpage}/>
        <Route path="/clients" component={Clients}/>
        <Route path="/projects/:status" component={ProjectsByStatus} exact/>      
        <Route path="/projects" component={ProjectList} exact/>
        <Route path="/calendars" component={Calendars}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/gantt" component={Gantt}/>
        <Route path="/tasks" component={Calendars}/>
        <Route path="/create" component={CreateProject}/>
        <Route path="/edit-project/:projectId" component={EditProject} />
        <Route path="/admin" component={Admin}/>
        <Route path="/class/:projectId" component={Class}/>
      </ChakraProvider>
    </>
    )
}

export default App;
