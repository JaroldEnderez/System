import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { filter } from '@chakra-ui/react';

export default class Gantt extends Component {

  // instance of gantt.dataProcessor
  dataProcessor = null;

  initZoom() {
    gantt.ext.zoom.init({
      levels: [
        {
          name: 'Hours',
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' },
            { unit: 'hour', step: 1, format: '%H' }
          ]
        },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'week', step: 1, format: 'Week #%W' },
            { unit: 'day', step: 1, format: '%d %M' }
          ]
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' }
          ]
        }
      ]
    });
  }

  setZoom(value) {
    if(!gantt.ext.zoom.getLevels()){
      this.initZoom();
    }
    gantt.ext.zoom.setLevel(value);
  }

  initGanttDataProcessor() {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    const onDataUpdated = this.props.onDataUpdated;
    this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id)
            .then(result => {
              // If onDataUpdated returns a permanent id of the created item, you can return it from here
              // resolve({id: result});
              resolve({id:result});
            })
            .catch(error => {
              reject(error);
            });
        } else {
          resolve();
        }
      });
    });
  }
  

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.projectId !== prevProps.projectId) {
      // Clear existing Gantt chart data
      console.log("Project ID changed to: ",this.props.projectId)
      gantt.clearAll();
      // Fetch and load data for the new project
      this.fetchProjectData();
    }
  }

  componentDidMount() {
    gantt.config.date_format = "%Y-%m-%d %H:%i";
  gantt.init(this.ganttContainer);
  this.initGanttDataProcessor();

  // Then fetch and load project data
  this.fetchProjectData();
  }
  

  fetchProjectData() {
    const { projectId } = this.props;
    console.log("The project ID I will fetch is: ", projectId)
    console.log('Project ID: ', projectId);
    // Fetch projects
    gantt.clearAll()
    fetch(`/api/project/${projectId}`)
      .then(response => response.json())
      .then(async (projectData) => {
        // Assuming projectData is an object representing the specific project
  
        // Fetch tasks for the selected project
        const response = await fetch(`/api/project/${projectId}/tasks`);
        const tasksReferenceIDs = await response.json();
        console.log('task reference: ', tasksReferenceIDs);
        // Fetch detailed task information using the reference IDs
        const detailedTasksPromises = tasksReferenceIDs.map(async (taskReferenceID) => {
          try {
            // Fetch detailed task information using the reference ID
            console.log('task reference id: ', taskReferenceID);
            const taskResponse = await fetch(`/api/tasks/${taskReferenceID}`);
            //when deleted tasks are retrieved, they are returned as null
            const taskData = await taskResponse.json();
            // Assuming taskData is a single task object
            const formattedTask = {
              ...taskData,
              start_date: new Date(taskData.start_date).toISOString().split('T')[0],
              progress: parseFloat(taskData.progress.$numberDecimal) || 0,
            };
  
            return formattedTask;
          } catch (error) {
            return null; // Handle error case
          }
        });
        // Wait for all detailedTasksPromises to resolve
        console.log('detailed task promises: ', detailedTasksPromises);
        const allTasks = await Promise.all(detailedTasksPromises);
        console.log("All Tasks for" ,projectId,": ", allTasks)
  
        // Filter out null values from the tasks array
        const filteredTasks = allTasks.filter(task => task !== null);  
        console.log("Filtered Tasks: ",filteredTasks)
        // Initialize Gantt chart with new data
        gantt.init(this.ganttContainer);
        // Parse data for the selected project's tasks
        gantt.parse({ data: filteredTasks, links: [] });
      })
      .catch(error => {
        console.error('Error fetching project or tasks:', error);
      });
}

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div
        ref={(input) => { this.ganttContainer = input }}
        style={{ width: '100%', height: '100%' }}
      ></div>
    );
  }
}
