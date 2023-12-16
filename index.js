const express = require("express");
const BodyParser = require("body-parser");
const cors = require('cors'); 
const morgan = require('morgan');
require('dotenv').config(); 
const app = express();
const PORT = process.env.PORT || 10001;


//v1 Imports
const authRoutes = require('./src/routes/v1/loginRoute.js');
const connectToDatabase = require('./src/services/v1/dbConnectionService.js');
const signupRoutes = require('./src/routes/v1/signupRoute.js');


//Middlewares

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/signup", signupRoutes);


//Database Connection
// connectToDatabase()
//     .then((client) => {
//         const db = client.db('auth');
//         app.listen(PORT, () => {
//             console.log(`Auth API is running on ${PORT}`);
//         });
//     })


connectToDatabase()
    .then((client) => {
        //const db = client.db('auth');
        app.listen(PORT, () => {
            console.log(`Auth API is running on ${PORT}`);
        });
    })
    .catch((error) => {
        let errorMessage = error.message;
        console.error(`Error connecting Auth Service ${errorMessage}`);
        process.exit(1);
    })




