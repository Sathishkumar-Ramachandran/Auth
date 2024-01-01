const express = require('express');
const authLogic = require('../../logics/v1/authLogic.js');

const loginRoute = express.Router();

loginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { signupsuccess } = req.query;

    try {
      
      // Check if the email exists in the Users table
      const user = await authLogic.checkEmail(email);
  
      if (!user && !signupsuccess) {
        return res.status(401).json({ error: 'User Not Found' });
      }
  
      // Verify the provided password with the hashed password from the database
      const passwordMatch = await authLogic.validatePassword(user.password, password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect Email or Password' });
      }
  
      // If passwords match, retrieve userID from the Users table
      const UserId = user.userID;
      const company = user.companyID
      // Retrieve user ID and ACL Array from the Companies table
      //const company = await authLogic.getCompany(companyId);
  
      if (!company) {
        return res.status(500).json({ error: 'Company not found' });
      }
  
      const userId = company.user_id;
      //const aclArray = company.acl_array;
  
      res.status(200).json({ success: true, companyId, userId });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = loginRoute;