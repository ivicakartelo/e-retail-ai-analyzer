const { generateEmbedding } = require('./features/embedding/generateEmbedding');
const cosineSimilarity = require('./utils/cosineSimilarity');

// Sample data with placeholder embeddings
const sampleData = [
  {
    id: 1,
    text: 'How to grow tomatoes',
    embedding: [], // will fill later
  },
  {
    id: 2,
    text: 'Indoor plant care tips',
    embedding: [],
  },
  {
    id: 3,
    text: 'Total sales by quarter',
    embedding: [],
  },
  {
    id: 4,
    text: 'Resale cars',
    embedding: [],
  },
];

async function generateAllEmbeddings() {
  console.log('🔄 Generating embeddings for sample data...');
  
  for (let item of sampleData) {
    item.embedding = await generateEmbedding(item.text);
    console.log(`✅ Embedding generated for: "${item.text}"`);
    console.log(item.embedding.slice(0, 5), '...'); // Preview first 5 numbers
  }

  console.log('✅ All embeddings generated.\n');
}


async function searchSimilarPrompts(query) {
  const queryEmbedding = await generateEmbedding(query);

  const results = sampleData
    .map(item => ({
      id: item.id,
      text: item.text,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return results;
}

module.exports = { generateAllEmbeddings, searchSimilarPrompts };