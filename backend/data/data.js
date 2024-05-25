const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
  },
  {
    project_name:"SM City",
    location:"Dumaguete City",
    procuring_entity:"Something",
    contractor:"Something",
    contract:"Something",
    funds:"Something",
    isOngoing: true
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        email: "anthony@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Anthony",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
  },
];

const projects = [
  {
    project_name:"SM City",
    location:"Dumaguete City",
    procuring_entity:"Something",
    contractor:"Something",
    contract:"Something",
    funds:"Something",
    isOngoing: true
  },
  {
    project_name:"Arena Gym",
    location:"New York",
    procuring_entity:"Something",
    contractor:"Something",
    contract:"Something",
    funds:"Something",
    isOngoing: false
  },
  {
    project_name:"San Antonio Bridge",
    location:"Texas",
    procuring_entity:"Something",
    contractor:"Something",
    contract:"Something",
    funds:"Something",
    isOngoing: true
  },
]

module.exports={chats};
