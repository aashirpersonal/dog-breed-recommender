// scripts/importToMongoDB.js

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const fs = require('fs');

async function importData() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('dogBreedRecommender');
    const collection = db.collection('dogBreeds');

    const data = JSON.parse(fs.readFileSync('dog_breeds.json', 'utf8'));

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

importData();