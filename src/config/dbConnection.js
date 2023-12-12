require('dotenv').config();

module.exports = {
    user: process.env.USER ||'prdn',
    host: process.env.HOST || localhost,
    database: process.env.DATABASE || 'users',
    password: process.env.PASSWORD || 'Sathish@123',
    port: 5432,
  };