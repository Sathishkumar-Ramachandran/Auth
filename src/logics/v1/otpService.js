// import express from 'express';


// //Imports
// import signupLogic from '../../logics/v1/signupLogic.js';



// let otpverifyArray = [];


// const mailOptions = {
//   from: "sathish.spacy2001@gmail.com",
//   to: email,
//   subject: "Verification",
//   html: `  <div style="background-color: #f2f2f2; padding: 20px;">
//     <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
//       <h1 style="color: #0051a0; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Double Engine</h1>
//       <p style="font-size: 18px; margin-bottom: 20px;">Your verification code is:</p>
//       <h2 style="font-size: 48px; margin-bottom: 20px;">${otp}</h2>
//       <p style="font-size: 16px;">This code will expire in one minutes.</p>
//     </div>
//   </div>`,
// };

// const OTPService = {
//     mailOptions : () => {
      
//     },
//     sendOtpToUser: async (email, otp) => {
//         console.log(email);
//         let checkinArray = otpverifyArray.filter((x) => x.Email == email);
//         if (checkinArray.length > 0) {
//           let index = otpverifyArray.findIndex((item) => item.Email == email);
//           if (index !== -1) {
//             otpverifyArray.splice(index, 1);
//           }
//         }
    
      
        
//         try {
//           const response = await MailToSend(mailOptions);
//           if (response) {
//             otpverifyArray.push({
//               Email: email,
//               otp: otp,
//               time: new Date().getTime(),
//             });
    
//             return 1;
//           } else {
//             return undefined;
//           }
//         } catch (error) {
//           return undefined;
//         }
//       },

//       verifyOTP: async (email, otp) => {
//         try {
//           const info = otpverifyArray.filter((x) => x.Email == email);
//           if (info.length > 0) {
//             if (otp == info[0].otp) {
//               if (new Date().getTime() - info[0].time <= 60000) {
//                 let index = otpverifyArray.findIndex((item) => item.Email == email);
//                 if (index !== -1) {
//                   otpverifyArray.splice(index, 1);
//                 }
//                 return 1;
//               } else {
//                 let index = otpverifyArray.findIndex((item) => item.Email == email);
//                 if (index !== -1) {
//                   otpverifyArray.splice(index, 1);
//                 }
//                 return 0;
//               }
//             } else {
//               return undefined;
//             }
//           } else {
//             return undefined;
//           }
//         } catch (e) {
//           return undefined;
//         }
//       },

// }