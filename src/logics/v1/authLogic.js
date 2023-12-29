const { pool } = require("../../config/dbConnection.js");
const argon2 = require('argon2');

const authLogic = {
  checkEmail: async (email) => {
    try {
      const userQuery = 'SELECT * FROM users WHERE email = $1';
      const userResult = await pool.query(userQuery, [email]);
      return userResult.rows.length > 0 ? userResult.rows[0] : null;
    } 
    
    catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  },

  hashPassword: async (password) => {
    try {
      const salt = await argon2.generateSalt();
      const hashedPassword = await argon2.hash(password, { salt });
      return { hashedPassword, salt };
    } catch (error) {
      console.error(`Error hashing password ${error}`);
      throw error;
    }
  },

  validatePassword: async (hashedPassword, password, salt) => {
    try {
      const isValid = await argon2.verify(hashedPassword, password, { salt });
      return isValid;
    } catch (error) {
      console.error('Error validating password:', error);
      throw error;
    }
  },

  getCompany: async (companyId) => {
    try {
      const companyQuery = 'SELECT user_id, acl_array FROM companies WHERE company_id = $1';
      const companyResult = await pool.query(companyQuery, [companyId]);
      return companyResult.rows.length > 0 ? companyResult.rows[0] : null;
    } catch (error) {
      console.error('Error getting company:', error);
      throw error;
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the email exists in the Users table
      const user = await authLogic.checkEmail(email);

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Verify the provided password with the hashed password from the database
      const passwordMatch = await authLogic.validatePassword(user.password, password, user.salt);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
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
  },
};

module.exports = authLogic;
