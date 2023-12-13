const express = require('express');
const argon = require('argon2');
const { pool } = require("pg");
const { password } = require('../../config/dbConnection');
const { v4: uuidv4 } = require('uuid');


const signupLogic = {
    hashPassword: async (password) => {
        try {
            const hashedPassword = await argon2.hash(password);
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
    createUser: () => {
        const userId = uuidv4();
        
    },
}