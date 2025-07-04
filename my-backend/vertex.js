// vertex.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const db = require('./db'); // make sure this matches your DB connection file

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function getDatabaseSchema() {
  try {
    const [tables] = await db.promise().query("SHOW TABLES");
    const tableNames = tables.map(row => Object.values(row)[0]);

    const schemaLines = [];

    for (const table of tableNames) {
      const [columns] = await db.promise().query(`DESCRIBE \`${table}\``);
      const columnDefs = columns.map(col => `${col.Field}`).join(', ');
      schemaLines.push(`- ${table}(${columnDefs})`);
    }

    return `Database schema:\n${schemaLines.join('\n')}`;
  } catch (err) {
    console.error('Failed to get schema:', err.message);
    return 'Database schema:';
  }
}

async function generateSQLFromVertex(userPrompt) {
  const schema = await getDatabaseSchema();

  const prompt = `
    ${schema}

    Instruction: Convert the following user request into a valid SQL query.
  - The SQL dialect is MySQL.
  - Use MySQL functions only (e.g., DATE_FORMAT instead of strftime).
  - Only return the SQL query — no explanation, no markdown formatting.

    Request: "${userPrompt}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // If wrapped in markdown SQL block
    const match = text.match(/```sql\s*([\s\S]+?)\s*```/i);
    return match ? match[1].trim() : text;
  } catch (error) {
    console.error('Gemini SDK error:', error.message);
    throw new Error('Failed to extract valid SQL');
  }
}

module.exports = { generateSQLFromVertex };