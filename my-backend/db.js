// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // e.g., 'root'
  password: '', // e.g., ''
  database: 'e_retail'           // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Database connected');
  }
});

module.exports = db;