const { generateEmbedding } = require('./features/embedding/generateEmbedding');
const cosineSimilarity = require('./utils/cosineSimilarity');

// Sample data with longer text chunks (to embed later)
const sampleData = [
  {
    id: 1,
    text: `Tomatoes are best grown in warm weather with plenty of sunlight. 
    They require nutrient-rich soil, regular watering, and support stakes 
    as they grow taller. Gardeners often start tomato seeds indoors and 
    transplant them once the frost risk has passed.`,
    embedding: [], // will fill later
  },
  {
    id: 2,
    text: `Indoor plants thrive when placed near natural light sources. 
    Most houseplants prefer moderate watering, meaning the soil should be 
    slightly dry before the next watering. Overwatering is a common mistake 
    that leads to root rot. Dusting the leaves also helps them absorb more light.`,
    embedding: [],
  },
  {
    id: 3,
    text: `The company’s total sales by quarter have shown steady growth. 
    For example, Q1 had $150,000 in revenue, Q2 increased to $200,000, and 
    Q3 reached $250,000. Analysts predict that Q4 will surpass $300,000, 
    showing strong demand for seasonal products.`,
    embedding: [],
  },
  {
    id: 4,
    text: `Resale cars are previously owned vehicles that are sold through 
    dealerships or private sellers. Buyers should carefully inspect mileage, 
    accident history, and maintenance records before purchasing. Certified 
    pre-owned programs often include warranties for extra peace of mind.`,
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