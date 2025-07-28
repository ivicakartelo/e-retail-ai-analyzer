const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small", // Or use "text-embedding-ada-002"
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("OpenAI Embedding Error:", error.message);
    throw new Error("Failed to generate embedding");
  }
}

module.exports = { generateEmbedding };