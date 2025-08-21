const { OpenAI } = require("openai");
require("dotenv").config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Arrow function version
const generateEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small", // or "text-embedding-ada-002"
      input: text,
    });
    // Return the first embedding vector
    return response.data[0].embedding;
  } catch (error) {
    console.error("OpenAI Embedding Error:", error.message);
    throw new Error("Failed to generate embedding");
  }
};

// Export functions and client
module.exports = { generateEmbedding, openai };