const express = require('express');
const authLogic = require('../../logics/v1/authLogic.js');

const loginRoute = express.Router();

loginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the email exists in the Users table
      const user = await authLogic.checkEmail(email);
  
      if (!user) {
        return res.status(401).json({ error: 'User Not Found' });
      }
  
      // Verify the provided password with the hashed password from the database
      const passwordMatch = await authLogic.validatePassword(user.password, password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect Email or ' });
      }
  
      // If passwords match, retrieve company ID from the Users table
      const companyId = user.company_id;
  
      // Retrieve user ID and ACL Array from the Companies table
      const company = await authLogic.getCompany(companyId);
  
      if (!company) {
        return res.status(500).json({ error: 'Company not found' });
      }
  
      const userId = company.user_id;
      const aclArray = company.acl_array;
  
      res.json({ success: true, companyId, userId, aclArray });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = loginRoute;