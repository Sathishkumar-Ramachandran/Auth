const express = require('express');
const authLogic = require('../../logics/v1/authLogic.js');
const signupLogic = require('../../logics/v1/signupLogic.js');

const signupRoute = express.Router();

signupRoute.post('/createuser', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await authLogic.checkEmail(email);
        if(user) {
            return res.status(401).json({error: 'User Already Exists'})
        }
        else {
            //Hash Password
            let hashedPassword = await authLogic.hashPassword(password);
            //Create User in Database
            const newUser = await signupLogic.addNewUser(email, hashedPassword);
            try {
                //generate otp
                const otp = await signupLogic.generateOTP();
                //send email with the OTP to the registered Email ID
                await authLogic.sendOTPEmail(email, otp);
                //return json object containing _id and generated OTP
                return res.status(201).json({"OTP" : otp});
            } catch (err) {
                console.log("Error Sending Mail", err);
                return res.status(503).json({ error: 'Mail Service is Down' });
            }
            const hashPassword = await signupLogic.hashPassword(password);
            }
        }
        catch (e) {
            console.log("Internal Error Occured");
            return res.status(500).json({ error: e.message })
            }
        });
module.exports = signupRoute;
            
            

