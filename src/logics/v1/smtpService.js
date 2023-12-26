const express = require('express');
const signupLogic = require('../../logics/v1/signupLogic.js');
const { get } = require('../../routes/v1/loginRoute');


const smtpService = {
    connection: () => {

    },


    sendOTP: async () => {

    }

} 

const mailBody = {
    from: "sathish.spacy2001@gmail.com",
    to: email,
    subject: "Verification",
    html: `  <div style="background-color: #f2f2f2; padding: 20px;">
      <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
        <h1 style="color: #0051a0; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Double Engine</h1>
        <p style="font-size: 18px; margin-bottom: 20px;">Your verification code is:</p>
        <h2 style="font-size: 48px; margin-bottom: 20px;">${otp}</h2>
        <p style="font-size: 16px;">This code will expire in one minutes.</p>
      </div>
    </div>`,
  };