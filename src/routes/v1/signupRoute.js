const express = require('express');
const authLogic = require('../../logics/v1/authLogic.js');
const signupLogic = require('../../logics/v1/signupLogic.js');
const UserVerification = require('../../logics/v1/smtpService.js');
const { default: axios } = require('axios');
const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2/index.js');

const signupRoute = express.Router();


signupRoute.post('/checkuser', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await authLogic.checkEmail(email);
        if (user) {
            return res.status(409).json({ message: 'User Already Exists' });
        }
        else {
            const validateUser = await axios.post('/validateuser', req.body );

            if(validateUser.status === 200) {
                try {
                    const sendotp = await UserVerification.sendOtpToUser(email);
                    // 
                    if (sendotp) {
                        console.log("otp sent");
                        return res.status(200).send("Please check your email for OTP");
                    }
                    else {
                        throw new Error("Error in sending otp");
                    }
                }
                catch (error) {
                    console.log("Error in sending OTP : ", error);
                }
                
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

signupLogic.post('/verifyotp', async (req, res) => {
    const { otp , email } = req.body;
    try{
        const isValidOtp = await authLogic.isValidOtp(email, otp);
        if(!isValidOtp){
            throw new Error('Invalid OTP');
            }
        else {
            // create user in the database
            const createuser = await axios.post('/createuser');
            if (createuser.status === 200) {
                // let userData = await UserModel.createUser(req.body);
                // delete the otp from the database to prevent misuse
                await UserVerification.deleteOTP(email);
                return res.status(201).json({message:"User Created Successfully"});
            }
            
            return res.status(201).json(userData);
            // const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '6h' });
            // return res.status(200).json({ token, email });
           }
        }catch(err){
                console.log(err);
                return res.status(400).json({ err: err.message })
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
            
            

