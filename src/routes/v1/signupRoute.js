const express = require('express');
const authLogic = require('../../logics/v1/authLogic.js');
const signupLogic = require('../../logics/v1/signupLogic.js');
const UserVerification = require('../../logics/v1/smtpService.js');
const { default: axios } = require('axios');
const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2/index.js');

const signupRoute = express.Router();


signupLogic.post('/checkuser', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await authLogic.checkEmail(email);
        if (user) {
            return res.status(409).json({ message: 'User Already Exists' });
        }
        else {
            const validateUser = await axios.post('/validateuser', req.body );

            if(validateUser.status === 200) {
                const sendOTP = '';
                // send verification email to the newly created account
                // let verifyLink = `http://localhost:3000/verify?id=${newUser.data._id}&token=${newUser
                // .data.verificationToken}`;
                // UserVerification.sendMail(email, "Account Verification", verifyLink);
                // return res.status(201).json(newUser.data);
                // }
                //Route the user to login and auto login and redirect to dashboard
                return res.status(200).json({ messagee: 'User Created Successfully'}).redirect(`${process.env.CLIENT_URL}/login`);
                
            }

            return res.status(200).json({ message: 'User Does not Exists'});
        }

    }
    catch (error) {
        console.error('Error checking user:', error);
        return res.status(500).json({ error: 'Internal Server Error'})
    }
})



signupRoute.post('/createuser', async (req, res) => {
    const {email, password} = req.body;

    try {
        
            const hashedPassword = await authLogic.hashPassword(password);
            //Create User in Database
            try {
                const newUser = await signupLogic.addNewUser(email, hashedPassword);
                return res.status(200).redirect(`/login?signupSuccess=true`);
            }
            catch (error) {
                console.log("Database Error", error);
            }
        }
                    // }
    catch (e) {
        console.log("Internal Error Occured");
        return res.status(500).json({ error: e.message })
    }
});





signupRoute.get('/validateuser', async (req, res) => {
    const {email, password, userOTP} = req.body;
    try{
        const result = await UserVerification.verifyOTP(email, userOTP);
        if(!result){
            throw "Invalid OTP";
            }
        else{
            try {
                const hashedPassword = await signupLogic.hashPassword(password);
                const newUser = await signupLogic.createUser(email, hashedPassword);
                console.log(`User Created Successfully with ${email} `);
                return res.status(200).end()
            }

           catch (error) {
                return res.status(401).json({error: error.message});
           }
        }
    }
    catch(e){
        return res.status(401).json({error: e.message})
    }
})


                
module.exports = signupRoute;
            
            

