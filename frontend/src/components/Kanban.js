import React from 'react';
import Board from 'react-trello';

const Kanban = () => {
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Planned Tasks',
        cards: [
          { id: 'Card1', title: 'Task 1', description: 'Description of Task 1' },
          { id: 'Card2', title: 'Task 2', description: 'Description of Task 2' },
        ],
      },
      {
        id: 'lane2',
        title: 'In Progress',
        cards: [],
      },
      {
        id: 'lane3',
        title: 'Completed',
        cards: [],
      },
    ],
  };

  return <Board data={data} />;
};

export default Kanban;