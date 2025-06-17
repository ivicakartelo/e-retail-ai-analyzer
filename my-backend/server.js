require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const { generateSQLFromVertex } = require('./vertex'); // adjust path as needed

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.json()); // Middleware to parse JSON request bodies

// Setup session middleware
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set this to true if using https
      httpOnly: true, // Prevents JavaScript access to the cookie
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    }
  }));


// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Use your actual password
  database: 'e_retail'
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

app.post('/articles/ai', async (req, res) => {
  const { userPrompt } = req.body;

  try {
    const sql = await generateSQLFromVertex(userPrompt);
    const [results] = await db.promise().query(sql);
    res.status(200).json({ sql, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate or execute SQL' });
  }
});

const ExcelJS = require('exceljs');

app.post('/ai-excel', async (req, res) => {
  const { userPrompt } = req.body;

  try {
    const sql = await generateSQLFromVertex(userPrompt);
    const [results] = await db.promise().query(sql);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Articles');

    if (results.length > 0) {
      worksheet.columns = Object.keys(results[0]).map(key => ({
        header: key,
        key: key,
        width: 20,
      }));

      results.forEach(row => worksheet.addRow(row));
    }

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=articles.xlsx');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate Excel file' });
  }
});