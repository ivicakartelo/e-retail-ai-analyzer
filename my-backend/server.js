require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');  // <-- import db connection
const { generateSQLFromVertex } = require('./vertex');
const { generateEmbedding } = require('./features/embedding/generateEmbedding');
const ExcelJS = require('exceljs');
const app = express();
const { generateAllEmbeddings, searchSimilarPrompts } = require('./embeddingSearch');

generateAllEmbeddings(); // initialize sample data

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.json());

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
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

app.post('/articles/embedding', async (req, res) => {
  const { userPrompt } = req.body;

  try {
    const embedding = await generateEmbedding(userPrompt);
    res.status(200).json({
      message: 'Embedding generated successfully',
      vectorLength: embedding.length,
      previewVector: embedding.slice(0, 5),
    });
  } catch (err) {
    console.error('Embedding error:', err.message);
    res.status(500).json({ error: 'Failed to generate embedding' });
  }
});

app.post('/embedding/search', async (req, res) => {
  const { query } = req.body;

  try {
    const results = await searchSimilarPrompts(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Embedding search error:', err);
    res.status(500).json({ error: 'Failed to search embeddings' });
  }
});