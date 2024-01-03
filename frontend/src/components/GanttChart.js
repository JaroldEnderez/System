import React from 'react';
import Chart from 'react-google-charts';

const GanttChart = () => {
  const data = [
    ['Task ID', 'Task Name', 'Start Date', 'End Date', 'Duration', 'Percent Complete', 'Dependencies'],
    ['Research', 'Find sources', new Date(2023, 1, 1), new Date(2023, 1, 5), null, 100, null],
    ['Write', 'Write paper', null, new Date(2023, 1, 9), daysToMilliseconds(3), 25, 'Research,Outline'],
    ['Cite', 'Create bibliography', null, new Date(2023, 1, 7), daysToMilliseconds(1), 20, 'Research'],
    ['Complete', 'Hand in paper', null, new Date(2023, 1, 10), daysToMilliseconds(1), 0, 'Cite,Write'],
    ['Outline', 'Outline paper', null, new Date(2023, 1, 3), daysToMilliseconds(1), 100, 'Research'],
  ];

  const options = {
    height: 300,
    criticalPath: { enabled: true, showCriticalPathStrings: true },
  };

  return <Chart chartType="Gantt" data={data} options={options} />;
};

const daysToMilliseconds = (days) => {
  return days * 24 * 60 * 60 * 1000;
};

export default GanttChart;
