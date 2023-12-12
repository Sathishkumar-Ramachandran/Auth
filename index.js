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


app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(cors());
app.use(morgan('dev'));
connectToDatabase()
    .then((client) => {
        app.use("/api/v1/auth", authRoutes);
        app.listen(PORT, () => {
            console.log(`Auth API is running on ${PORT}`);
        });
    })
    .catch((error) => {
        let errorMessage = error.message;
        console.error(`Error connecting Auth Service ${errorMessage}`);
        process.exit(1);
    })




