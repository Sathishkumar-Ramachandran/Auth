// authMiddleware.js
const { verify } = require('jsonwebtoken');


function authenticate(req, res, next) {
  // Check for a JWT token in the Authorization header
  const jwtToken = req.header('Authorization');

  if (jwtToken) {
    verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Unauthorized - Invalid token' });
      }

      req.user = user;
      next();
    });
  } else if (req.session && req.session.user) {
    // If no JWT token, check for a session-based user
    req.user = req.session.user;
    next();
  } else {
    return res.status(401).json({ error: 'Unauthorized - No authentication token provided' });
  }
}

module.exports = authenticate;