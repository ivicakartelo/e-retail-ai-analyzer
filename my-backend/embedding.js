// embedding.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const embeddingModel = genAI.getEmbeddingModel({ model: 'embedding-001' }); // or 'gemini-1.5-embedding'

async function generateEmbedding(userPrompt) {
  try {
    const response = await embeddingModel.embedText(userPrompt);
    const embedding = response[0].embedding;
    return embedding;
  } catch (error) {
    console.error('Embedding error:', error.message);
    throw new Error('Failed to generate embedding');
  }
}

module.exports = { generateEmbedding };