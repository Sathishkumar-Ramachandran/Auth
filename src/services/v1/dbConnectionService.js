const { Client } = require('pg');
const { pool } = require('../../config/dbConnection.js');


async function connectToDatabase() {
  const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DaB_DATABASE || 'users',
    password: process.env.DB_PASSWORD || 'Sathish@2001',
    port: process.env.DB_PORT || 5432,
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 200
  });

  try {
    await client.connect();
      console.log('Auth DB Connection Estalished');
      return client;
   
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

module.exports = connectToDatabase;