const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.name}! You have access to this route.` });
});

module.exports = router;