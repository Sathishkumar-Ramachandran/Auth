const express = require('express');
const argon = require('argon2');


const { pool } = require("../../config/dbConnection.js");
const { v4: uuidv4 } = require('uuid');


const signupLogic = {
    hashPassword: async (password) => {
        try {
            const salt = await argon.generateSalt();
            const hashedPassword = await argon.hash(password, { salt });
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



    createUser: async (companyId, email, password) => {
        const userId = uuidv4();
        try {
            // Example: Insert user into a PostgreSQL database
            const client = await pool.connect();
            const result = await client.query('INSERT INTO users (companyId, email, password) VALUES ($1, $2, $3)', [companyId, email, password]);
            console.log('User created successfully:', result.rows);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }    
        
    },
}

module.exports = signupLogic;