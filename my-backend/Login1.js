// login.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e_retail'
});

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the user by email
    const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.user_id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    return res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = login;