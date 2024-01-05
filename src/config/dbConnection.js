const { Pool } = require('pg');
const dotenv = require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DaB_DATABASE || 'users',
    password: process.env.DB_PASSWORD || 'Sathish@123',
    port: process.env.DB_PORT || 5432,
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // how long to wait when connecting a new client
});

module.exports = pool;
