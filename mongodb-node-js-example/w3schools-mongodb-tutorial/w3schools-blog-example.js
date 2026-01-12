// W3schools MongoDB tutorial
// https://www.w3schools.com/mongodb/index.php

// Install Docker Desktop:
// winget install Docker.DockerDesktop

// Install Node.js:
// npm init -y
// npm install mongodb

// Run Docker Desktop:
// docker run --name mongodb -d -p 27017:27017 mongo:latest

// Run Node.js:
// node w3schools-blog-example.js

const { MongoClient } = require('mongodb');

// Connection URL
//const url = 'mongodb://admin:password@localhost:27017/?authSource=admin';
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'blog';
const collectionName = 'posts'

async function main() {
  try {

    // Connect to the server
    await client.connect();
    console.log('Connected successfully to server');

    // Select the database (will be created if it doesn't exist)
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // ********  Insert  ********

    // insertOne
    // const insertOneResult = await collection.insertOne({
    //   title: "Post Title 1",
    //   body: "Body of post.",
    //   category: "News",
    //   likes: 1,
    //   tags: ["news", "events"],
    //   date: Date()
    // });

    // console.log('Inserted document:', insertOneResult.insertedId);

    // insertMany
    // const insertManyResult = await collection.insertMany([  
    //   {
    //     title: "Post Title 2",
    //     body: "Body of post.",
    //     category: "Event",
    //     likes: 2,
    //     tags: ["news", "events"],
    //     date: Date()
    //   },
    //   {
    //     title: "Post Title 3",
    //     body: "Body of post.",
    //     category: "Technology",
    //     likes: 3,
    //     tags: ["news", "events"],
    //     date: Date()
    //   },
    //   {
    //     title: "Post Title 4",
    //     body: "Body of post.",
    //     category: "Event",
    //     likes: 4,
    //     tags: ["news", "events"],
    //     date: Date()
    //   }
    // ]);

    // console.log('Inserted documents:', insertManyResult.insertedIds);

    // ********  Find  ********

    // findOne
    // const findOneResult = await collection.findOne({ category: "News" }); 

    // console.log('Found document:', findOneResult);

    // find
    //const findResult = await collection.find().toArray();
    //const findResult = await collection.find({ category: "News" }).toArray();

    //console.log('Found document:', findResult);

    // Projection
    //const projectionResult = await collection.find({}, { projection: {title: 1, date: 1}}).toArray();
    const projectionResult = await collection
      .find()
      .project({ title: 1, date: 1, _id: 0 })
      .toArray();

    console.log('Found projection:', projectionResult);

    // ********  Update  ********

    // updateOne
    const updateOneResult = await collection.updateOne( { title: "Post Title 1" }, { $set: { likes: 42 } } );

    console.log('Updated document:', updateOneResult);

    const test = await collection.findOne({ title: "Post Title 1" });
    console.log('Check update:', test);

    // updateMany ($inc = increment)
    const updateManyResult = await collection.updateMany({}, { $inc: { likes: 1 } });

    console.log('Updated document:', updateManyResult);

    // ********  Delete  ********

    // deleteOne
    const deleteOneResult = await collection.deleteOne({ title: "Post Title 4" });

    console.log('Deleted document:', deleteOneResult);
    
    // deleteMany
    // const deleteManyResult = await collection.deleteMany({ category: "Technology" });
    // const deleteManyResult = await collection.deleteMany({ tags: "news" });

    // console.log('deleteMany result:', deleteManyResult);

    // ******** Query operators ********

  } catch (err) {

    console.error('Error occurred:', err);

  } finally {
    await client.close();
  }
}

main();