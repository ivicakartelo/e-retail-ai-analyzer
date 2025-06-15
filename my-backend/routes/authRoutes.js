const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Example: Hardcoded user validation (replace with your database logic)
  if (email === 'ben@example.com' && password === 'password123') {
    const user = { id: 1, name: 'Ben', email, role: 'customer' };

    // Generate a JWT token
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

module.exports = router;