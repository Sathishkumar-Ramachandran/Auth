import { Client } from 'pg';
import { pool } from '../../config/dbConnection.js';

async function connectToDatabase() {
  const client = new Client(pool);

  try {
    await client.connect();
      console.log('Auth DB Connection Estalished');
      return client;
   
    
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    throw error;
  }
}

export default connectToDatabase;