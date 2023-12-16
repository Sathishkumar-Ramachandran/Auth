const express = require('express');
const authLogic = require('../../logics/v1/authLogic.js');
const signupLogic = require('../../logics/v1/signupLogic.js');

const signupRoute = express.Router();

signupRoute.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await authLogic.checkEmail(email);
        if(user) {
            return res.status(401).json({error: 'User Already Exists'})
        }
        else {
            //Hash Password
            try {
            const hashPassword = await signupLogic.hashPassword(password);
            }
            catch (error) {
                console.error('Error During Hashing Password:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            //write

        }
    }
    catch {

    }
});


module.exports = signupRoute;