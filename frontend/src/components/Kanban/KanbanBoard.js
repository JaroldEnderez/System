import React, { useEffect } from 'react';
import { getData } from './getData.js';
import {kanban} from './kanban.js'

const KanbanBoard = () => {
    const { kanban, Toolbar, defaultEditorShape } = kanban;
const { cards, links, rows,
    columns,
    users } = getData();

const cardShape = {
    label: true,
    description: true,
    progress: true,
    comments: true,
    votes: true,
    start_date: true,
    end_date: true,
    users: {
        show: true,
        values: users,
    },
    priority: {
        show: true,
        values: [
            { id: 1, color: "#FF5252", label: "High", value: 1 },
            { id: 2, color: "#FFC975", label: "Medium", value: 2 },
            { id: 3, color: "#65D3B3", label: "Low", value: 3 },
        ],
    },
    color: true,
    menu: true,
    cover: true,
    attached: false,
};

const board = new kanban("#root", {
    columns,
    cards,
    rows,
    links,
    rowKey: "type",
    cardShape,
    editorShape: [
        ...defaultEditorShape,
        {
            type: "links",
            key: "links",
            label: "Links",
        },
        {
            type: "comments",
            key: "comments",
            label: "Comments",
            config: {
                placement: "editor",
            },
        },
    ],
    currentUser: 1,
});

new kanban.Toolbar("#toolbar", {
    api: board.api,
});
 
  return (
    <div id="kanban_container" style={{ width: '100%', height: '600px' }}>
    </div>
  );
};

export default KanbanBoard;
