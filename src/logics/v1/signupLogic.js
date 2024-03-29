const express = require('express');
const { generateSalt, hash} = require('argon2');
const { pool } = require('../../config/dbConnection.js');
const uuidv4 = require('uuid');
const axios = require('axios');




const signupLogic = {
    hashPassword: async (password) => {
        try {
            const salt = await generateSalt();
            const hashedPassword = await hash(password, { salt });
            return { hashedPassword, salt };
        }
        catch (error) {
            console.error('Error Hashing Password:', error);
            throw error;
        }
    },
    generateOTP: () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString()
    },
    
    createUser: async (email, hashedPassword) => {
        const userId = uuidv4().v4();
        try {
            // Example: Insert user into a PostgreSQL database
            const client = await pool.connect();
            const result = await client.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
            console.log('User created successfully:', result.rows);
            //return success status code
            return res.status(200).json({message:"User Created Successfully"});
            
            // return {email, hashedPassword};
           

            
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }    
        
    },

}


module.exports = signupLogic;