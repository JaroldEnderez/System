const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://jaroldenderez69:kitchennightmares@sm-mst-construction.qx9yd2k.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function deleteInventory() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const database = client.db('SM-MST-Construction');

    // Access the collection and perform delete operation
    await database.collection('projects').deleteMany({});

    console.log('Projects deleted successfully!');
  } finally {
    // Close the client
    await client.close();
  }
}

// Run the function
deleteInventory();
