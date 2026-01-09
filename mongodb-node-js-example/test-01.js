const { MongoClient } = require('mongodb');

// Connection URL
// Format: mongodb://<username>:<password>@localhost:27017/?authSource=admin
//const url = 'mongodb://admin:password@localhost:27017/?authSource=admin';
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'school';

async function main() {
  try {
    // 1. Connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    
    // 2. Select the database (will be created if it doesn't exist)
    const db = client.db(dbName);
    const collection = db.collection('students');

    // 3. INSERT: Add a document
    const insertResult = await collection.insertOne({
      name: "John Doe",
      age: 25,
      major: "Computer Science"
    });
    console.log('Inserted document:', insertResult.insertedId);

    // 4. READ: Find the document we just inserted
    const findResult = await collection.findOne({ name: "John Doe" });
    console.log('Found document:', findResult);

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // 5. Always close the connection
    await client.close();
  }
}

main();