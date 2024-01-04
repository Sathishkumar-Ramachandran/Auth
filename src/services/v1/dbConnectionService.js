const { Client } = require('pg');
const dbConfig = require('../../config/dbConnection.js');

async function connectToDatabase() {
  const client = new Client(dbConfig);

  try {
    const dbconnect = await client.connect();
    if (dbconnect) {
      console.log('Auth DB Connection Estalished');
      return client;
    }
    else {
      throw Error("Failed to Connect Database");
    }
    
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

module.exports = connectToDatabase;