const express = require('express');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

app.use(express.json());

// Add the protected routes
app.use('/api', protectedRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});