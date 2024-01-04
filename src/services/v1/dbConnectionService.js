const { Client } = require('pg');
const dbConfig = require('../../config/dbConnection.js');

async function connectToDatabase() {
  const client = new Client(dbConfig);

  try {
    await Client.connect();
    console.log('Auth DB Connection Estalished');
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

module.exports = connectToDatabase;