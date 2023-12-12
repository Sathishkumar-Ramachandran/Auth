//const { pool } = require('./dbConnect'); // Assuming pool is exported from dbConnect
const { pool } = require("pg");
const argon2 = require('argon2');

const authLogic = {
  checkEmail: async (email) => {
    try {
      const userQuery = 'SELECT * FROM users WHERE email = $1';
      const userResult = await pool.query(userQuery, [email]);

      return userResult.rows.length > 0 ? userResult.rows[0] : null;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  },

  validatePassword: async (hashedPassword, password) => {
    try {
      return await argon2.verify(hashedPassword, password);
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
      const passwordMatch = await authLogic.validatePassword(user.password, password);

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


// const { Pool } = require('pg');
// const argon2 = require('argon2');

// const { pool, DBConnect } = require('./dbConnect');

// const checkEmail = async (email) => {
//   try {
//     const userQuery = 'SELECT * FROM users WHERE email = $1';
//     const userResult = await pool.query(userQuery, [email]);

//     return userResult.rows.length > 0 ? userResult.rows[0] : null;
//   } catch (error) {
//     console.error('Error checking email:', error);
//     throw error;
//   }
// };

// const validatePassword = async (hashedPassword, password) => {
//   try {
//     return await argon2.verify(hashedPassword, password);
//   } catch (error) {
//     console.error('Error validating password:', error);
//     throw error;
//   }
// };

// const getCompany = async (companyId) => {
//   try {
//     const companyQuery = 'SELECT user_id, acl_array FROM companies WHERE company_id = $1';
//     const companyResult = await pool.query(companyQuery, [companyId]);

//     return companyResult.rows.length > 0 ? companyResult.rows[0] : null;
//   } catch (error) {
//     console.error('Error getting company:', error);
//     throw error;
//   }
// };

// const login = async (email, password) => {
//   try {
//     // Check if the email exists in the Users table
//     const user = await checkEmail(email);

//     if (!user) {
//       return { error: 'Invalid email or password' };
//     }

//     // Verify the provided password with the hashed password from the database
//     const passwordMatch = await validatePassword(user.password, password);

//     if (!passwordMatch) {
//       return { error: 'Invalid email or password' };
//     }

//     // If passwords match, retrieve company ID from the Users table
//     const companyId = user.company_id;

//     // Retrieve user ID and ACL Array from the Companies table
//     const company = await getCompany(companyId);

//     if (!company) {
//       return { error: 'Company not found' };
//     }

//     const userId = company.user_id;
//     const aclArray = company.acl_array;

//     return { success: true, companyId, userId, aclArray };
//   } catch (error) {
//     console.error('Error during login:', error);
//     return { error: 'Internal Server Error' };
//   }
// };

// module.exports = { login };

