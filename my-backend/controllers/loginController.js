const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e_retail',
});

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query the user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // Compare hashed password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        'your-secret-key',
        { expiresIn: '1h' }
      );

      return res.json({
        message: 'Login successful',
        token,
        user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role },
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = login;