require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const { generateSQLFromVertex } = require('./vertex'); // adjust path as needed

const { GoogleGenerativeAI } = require('@google/generative-ai');
// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Use your API key from .env
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' }); // Use the correct model name

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.json()); // Middleware to parse JSON request bodies

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

// Helper function to generate JWT token
// Generate a JWT token for the user
const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET;
  console.log('JWT Secret Key:', process.env.JWT_SECRET || 'default-secret-key');
  return jwt.sign({ ...user }, secretKey, { expiresIn: '1h' });
};

// POST route for login
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to find the user by email
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error during database query' });
    }

    const user = results[0];
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the passwordGenerated JWT
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = generateToken(user);
      console.log('Generated JWT:', token);

      // Respond token
      res.json({
        message: 'Login successful',
        token
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error during password comparison' });
    }
  });
});

// Protected route example (requires authentication via session)
app.get('/users/protected', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.json({ message: 'This is a protected route.', user: req.session.user });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }
  
  res.status(500).json({ error: 'Something went wrong!' });
});


// Start the server
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });

  // Convert the callback style connection methods to promise-based
const queryAsync = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

app.post("/orders", async (req, res) => {
  try {
    const { user_id, articles, total_amount } = req.body;

    // Validate request data
    if (!user_id || !articles?.length || !total_amount) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    // Validate each article has a price
    for (const article of articles) {
      if (!article.price) {
        return res.status(400).json({ error: `Article with ID ${article.article_id} is missing a price` });
      }
    }

    // Insert into `orders` table
    const orderResult = await queryAsync(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [user_id, total_amount]
    );
    const order_id = orderResult.insertId;

    // Insert order items into `order_items` table
    for (const article of articles) {
      // Ensure price is valid before inserting
      if (article.price === null || article.price === undefined) {
        return res.status(400).json({ error: `Invalid price for article ID ${article.article_id}` });
      }

      await queryAsync(
        "INSERT INTO order_items (order_id, article_id, quantity, price) VALUES (?, ?, ?, ?)",
        [order_id, article.article_id, article.quantity, article.price]
      );
    }

    // Successful response
    res.status(201).json({ message: "Order placed successfully!", order_id, status: "pending" });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ error: "Order processing error" });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch orders for the given user, ordering by order_date
    const orders = await queryAsync(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC", // Changed to use order_date
      [user_id]
    );

    // Fetch order items for each order
    for (const order of orders) {
      const orderItems = await queryAsync(
        "SELECT oi.article_id, oi.quantity, oi.price, a.name FROM order_items oi JOIN article a ON oi.article_id = a.article_id WHERE oi.order_id = ?",
        [order.order_id]
      );
      order.items = orderItems; // Updated to "items" instead of "articles"
    }

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching orders" });
  }
});

// Departments Routes
app.get('/departments', (req, res) => {
    db.query('SELECT * FROM department', (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(200).json(results);
    });
});


app.post('/departments', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO department (name, description) VALUES (?, ?)', [name, description], (error, results) => {
        if (error) { 
            return res.status(500).json({ error });
        }
        res.status(201).json({ department_id: results.insertId, name, description });
    });
});


app.put('/departments/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        console.error('Missing required fields: name or description');
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    db.query('UPDATE department SET name = ?, description = ? WHERE department_id = ?', [name, description, id], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error });
        }
        res.status(200).json({ id, name, description });
        console.log(name)
    });
});
app.delete('/departments/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM department WHERE department_id = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(204).end();
    });
});

// New route to get categories by department ID
app.get('/departments/:id/categories', (req, res) => {
  const departmentId = req.params.id;

  const query = `
    SELECT c.category_id, c.name AS category_name
    FROM category c
    WHERE c.department_id = ?;
  `;

  db.query(query, [departmentId], (error, results) => {
      if (error) {
          console.error('Error fetching categories:', error);
          return res.status(500).json({ error: 'An error occurred while fetching categories.' });
      }
      res.status(200).json({ categories: results });
  });
});

// Categories Routes
app.get('/categories', (req, res) => {
    db.query('SELECT * FROM category', (error, results) => {
        if (error) return res.status(500).json({ error });
        console.log(results);
        res.status(200).json(results);
    });
});

app.post('/categories', (req, res) => {  // Corrected route definition
    const { department_id, name, description } = req.body;
    db.query('INSERT INTO category (department_id, name, description) VALUES (?, ?, ?)', [department_id, name, description], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(201).json({ category_id: results.insertId, department_id, name, description });
    });
});

app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM category WHERE category_id = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(204).end();
    });
});

app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { department_id, name, description } = req.body;

    if (!department_id || !name || !description) {
        console.error('Missing required fields: name or description');
        return res.status(400).json({ error: 'department_id and Name and description are required.' });
    }

    db.query('UPDATE category SET department_id = ?, name = ?, description = ? WHERE category_id = ?', [department_id, name, description, id], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error });
        }
        res.status(200).json({ id, department_id, name, description });
        console.log(id, department_id, name, description)
    });
});

// New route to get articles by category ID, including category info
app.get('/categories/:categoryId/articles', (req, res) => {
  const categoryId = req.params.categoryId;

  // Query to get category info
  const categoryQuery = `SELECT category_id, name FROM category WHERE category_id = ?`;

  // Query to get articles of that category
  const articlesQuery = `
    SELECT a.*
    FROM article a
    JOIN category_article ca ON a.article_id = ca.article_id
    WHERE ca.category_id = ?;
  `;

  db.query(categoryQuery, [categoryId], (catErr, catResults) => {
    if (catErr) {
      console.error('Error fetching category:', catErr);
      return res.status(500).json({ error: 'Error fetching category' });
    }

    if (catResults.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = catResults[0];

    db.query(articlesQuery, [categoryId], (artErr, artResults) => {
      if (artErr) {
        console.error('Error fetching articles:', artErr);
        return res.status(500).json({ error: 'Error fetching articles' });
      }

      res.status(200).json({
        category,
        articles: artResults,
      });
    });
  });
});

// Articles Routes

// Get all articles
app.get('/articles', (req, res) => {
    db.query('SELECT * FROM article', (error, results) => {
      if (error) return res.status(500).json({ error });
      res.status(200).json(results);
    });
  });

// Get article by ID including its associated categories
app.get('/article/:id', (req, res) => {
  const { id } = req.params;

  // Update the SQL query to include the 'price' field
  const query = `
    SELECT 
      a.article_id, a.name, a.description, a.image_1, a.image_2, 
      a.promotion_at_homepage_level, a.promotion_at_department_level, a.price,  -- Added price
      GROUP_CONCAT(ca.category_id) AS category_ids
    FROM 
      article a
    LEFT JOIN 
      category_article ca ON a.article_id = ca.article_id
    WHERE 
      a.article_id = ?
  `;

  db.query(query, [id], (error, results) => {
      if (error) return res.status(500).json({ error });

      if (results.length > 0) {
          const article = results[0];
          console.log(article);  // Logging the article data to the console
          
          // Process category_ids to convert them into an array of numbers
          article.category_ids = article.category_ids ? article.category_ids.split(',').map(Number) : [];
          
          // Send the article with the 'price' field
          res.status(200).json(article);
      } else {
          res.status(404).json({ message: 'Article not found' });
      }
  });
});

// New route to get associated categories
app.get('/articles/:id/categories', (req, res) => {
    const articleId = req.params.id;
  
    const query = `
      SELECT c.category_id, c.name AS category_name
      FROM category c
      JOIN category_article ca ON c.category_id = ca.category_id
      WHERE ca.article_id = ?;
    `;
  
    db.query(query, [articleId], (error, results) => {
      if (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ error: 'An error occurred while fetching categories.' });
      }
      res.status(200).json({ categories: results });
    });
  });

//New route to get no-associated categories
app.get('/articles/:id/no-associate-categories', (req, res) => {
  const articleId = req.params.id;

  const query = `
      SELECT c.category_id, c.name AS category_name
      FROM category c
      LEFT JOIN category_article ca ON c.category_id = ca.category_id AND ca.article_id = ?
      WHERE ca.category_id IS NULL
  `;

  db.query(query, [articleId], (error, results) => {
      if (error) {
          console.error('Error fetching non-associated categories:', error);
          return res.status(500).json({ error: 'An error occurred while fetching categories.' });
      }
      res.status(200).json({ categories: results });
  });
});


// Create a new article and link to a category
app.post('/articles', (req, res) => {
    const {
        name,
        description,
        image_1,
        image_2,
        promotion_at_homepage_level,
        promotion_at_department_level,
        category_ids, // Array of selected category IDs
    } = req.body;

    // Validate required fields
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    // Insert the new article
    db.query(
        'INSERT INTO article (name, description, image_1, image_2, promotion_at_homepage_level, promotion_at_department_level) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, image_1, image_2, promotion_at_homepage_level, promotion_at_department_level],
        (insertErr, results) => {
            if (insertErr) {
                return res.status(500).json({ error: insertErr });
            }

            const articleId = results.insertId; // Get the new article ID

            // Prepare the values for inserting into category_article
            const categoryArticleValues = category_ids.map((category_id) => [category_id, articleId]);

            // Insert into category_article for each selected category
            db.query(
                'INSERT INTO category_article (category_id, article_id) VALUES ?',
                [categoryArticleValues],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    }
                    res.status(201).json({ id: articleId, name });
                }
            );
        }
    );
});




// Update an existing article and its categories
app.put('/articles/:id', (req, res) => {
    const { id } = req.params;
    const {
      name,
      description,
      image_1,
      image_2,
      promotion_at_homepage_level,
      promotion_at_department_level,
      category_ids = [] // Ensure this is always an array, even if empty
    } = req.body;
  
    console.log('Received payload:', req.body); // Log the payload for debugging
  
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required.' });
    }
  
    // Update the article
    db.query(
      'UPDATE article SET name = ?, description = ?, image_1 = ?, image_2 = ?, promotion_at_homepage_level = ?, promotion_at_department_level = ? WHERE article_id = ?',
      [name, description, image_1, image_2, promotion_at_homepage_level, promotion_at_department_level, id],
      (error) => {
        if (error) return res.status(500).json({ error });
  
        // Delete existing category relations
        db.query('DELETE FROM category_article WHERE article_id = ?', [id], (err) => {
          if (err) return res.status(500).json({ error: err });
  
          // Insert new category relations if category_ids is not empty
          if (category_ids.length > 0) {
            const categoryArticleValues = category_ids.map((category_id) => [category_id, id]);
            db.query(
              'INSERT INTO category_article (category_id, article_id) VALUES ?',
              [categoryArticleValues],
              (insertErr) => {
                if (insertErr) return res.status(500).json({ error: insertErr });
                return res.status(200).json({ message: 'Article updated successfully' });
              }
            );
          } else {
            return res.status(200).json({ message: 'Article updated successfully without categories' });
          }
        });
      }
    );
  });

// Delete an article
app.delete('/articles/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM article WHERE article_id = ?', [id], (error, results) => {
        if (error) return res.status(500).json({ error });
        res.status(204).end();
    });
});
// New route to remove categories associated with an article
app.delete('/articles/:id/remove-categories', (req, res) => {
    const articleId = req.params.id;
    const { category_ids } = req.body;
  
    if (!category_ids || category_ids.length === 0) {
      return res.status(400).json({ error: 'No categories provided for removal.' });
    }
  
    const query = `DELETE FROM category_article WHERE article_id = ? AND category_id IN (?)`;
  
    db.query(query, [articleId, category_ids], (error, results) => {
      if (error) {
        console.error('Error removing categories:', error);
        return res.status(500).json({ error: 'An error occurred while removing categories.' });
      }
  
      res.status(200).json({ message: 'Categories removed successfully.' });
    });
  });
  
  //New route to insert new categories no-associated with an article
  app.post('/articles/:id/assign-categories', (req, res) => {
    const articleId = req.params.id;
    const { category_ids } = req.body;

    if (!category_ids || category_ids.length === 0) {
        return res.status(400).json({ error: 'No categories selected for assignment.' });
    }

    const categoryArticleValues = category_ids.map((category_id) => [category_id, articleId]);

    // Insert selected categories into category_article
    db.query(
        'INSERT INTO category_article (category_id, article_id) VALUES ?',
        [categoryArticleValues],
        (error, results) => {
            if (error) {
                console.error('Error assigning categories:', error);
                return res.status(500).json({ error: 'An error occurred while assigning categories.' });
            }
            res.status(201).json({ message: 'Categories assigned successfully.' });
        }
    );
});

// Search for articles and category by name or description
app.get('/search', (req, res) => {
  const { query } = req.query; // Get the search query from the request's query parameter

  if (!query) {
      return res.status(400).json({ error: 'Search query is required.' });
  }

  // SQL query to search for articles by name or description
  const articleSearchQuery = `
      SELECT a.*, GROUP_CONCAT(ca.category_id) AS category_ids
      FROM article a
      LEFT JOIN category_article ca ON a.article_id = ca.article_id
      WHERE a.name LIKE ? OR a.description LIKE ?
      GROUP BY a.article_id;
  `;

  // Escape the query to avoid SQL injection
  const searchTerm = `%${query}%`;

  db.query(articleSearchQuery, [searchTerm, searchTerm], (error, articleResults) => {
      if (error) {
          console.error('Error searching for articles:', error);
          return res.status(500).json({ error: 'An error occurred while searching for articles.' });
      }

      // Process the result to format category_ids into an array
      articleResults.forEach((article) => {
          article.category_ids = article.category_ids ? article.category_ids.split(',').map(Number) : [];
      });

      // SQL query to search for categories by name or description
      const categorySearchQuery = `
          SELECT * FROM category
          WHERE name LIKE ? OR description LIKE ?;
      `;

      db.query(categorySearchQuery, [searchTerm, searchTerm], (error, categoryResults) => {
          if (error) {
              console.error('Error searching for categories:', error);
              return res.status(500).json({ error: 'An error occurred while searching for categories.' });
          }

          // Return the search results for both articles and categories
          res.status(200).json({
              articles: articleResults,
              categories: categoryResults,
          });
      });
  });
});

// Helper function for handling database queries with Promises
const queryDb = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.query(query, params, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });

// Get all users (excluding soft-deleted users)
app.get('/users', async (req, res) => {
  try {
    const users = await queryDb('SELECT * FROM users WHERE deleted_at IS NULL');
    res.status(200).json(users);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Add a new user
app.post('/users', async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    delivery_name,
    delivery_street,
    delivery_city,
    delivery_state,
    delivery_country,
    delivery_zip_code,
    billing_name,
    billing_street,
    billing_city,
    billing_state,
    billing_country,
    billing_zip_code,
  } = req.body;

  // Validate required fields dynamically
  const requiredFields = [name, email, password, role, delivery_street, billing_street];
  if (requiredFields.some((field) => !field)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Check if email already exists
    const existingUser = await queryDb('SELECT email FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    const result = await queryDb(
      `INSERT INTO users (name, email, password, role, 
        delivery_name, delivery_street, delivery_city, delivery_state, delivery_country, delivery_zip_code,
        billing_name, billing_street, billing_city, billing_state, billing_country, billing_zip_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        role,
        delivery_name,
        delivery_street,
        delivery_city,
        delivery_state,
        delivery_country,
        delivery_zip_code,
        billing_name,
        billing_street,
        billing_city,
        billing_state,
        billing_country,
        billing_zip_code,
      ]
    );

    res.status(201).json({ user_id: result.insertId });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Update an existing user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    role,
    delivery_name,
    delivery_street,
    delivery_city,
    delivery_state,
    delivery_country,
    delivery_zip_code,
    billing_name,
    billing_street,
    billing_city,
    billing_state,
    billing_country,
    billing_zip_code,
  } = req.body;

  try {
    // Check if user exists
    const userExists = await queryDb('SELECT user_id FROM users WHERE user_id = ?', [id]);
    if (userExists.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user in DB
    await queryDb(
      `UPDATE users SET name = ?, email = ?, role = ?, 
        delivery_name = ?, delivery_street = ?, delivery_city = ?, delivery_state = ?, delivery_country = ?, delivery_zip_code = ?,
        billing_name = ?, billing_street = ?, billing_city = ?, billing_state = ?, billing_country = ?, billing_zip_code = ?
        WHERE user_id = ?`,
      [
        name,
        email,
        role,
        delivery_name,
        delivery_street,
        delivery_city,
        delivery_state,
        delivery_country,
        delivery_zip_code,
        billing_name,
        billing_street,
        billing_city,
        billing_state,
        billing_country,
        billing_zip_code,
        id,
      ]
    );

    res.status(204).end(); // No content on success
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Soft delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if user exists
    const userExists = await queryDb('SELECT user_id FROM users WHERE user_id = ?', [id]);
    if (userExists.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Soft delete the user
    await queryDb('UPDATE users SET deleted_at = NOW() WHERE user_id = ?', [id]);

    res.status(204).end(); // No content on success
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Endpoint to create PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  const { total_amount, order_id } = req.body; // Use total_amount instead of amount

  try {
    // Convert total_amount to cents (Stripe requires amounts in cents)
    const amountInCents = Math.round(total_amount);

    // Create PaymentIntent with metadata (order_id)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,  // Total amount in cents
      currency: 'usd',  // You can change this to the desired currency
      metadata: { order_id },  // Attach order_id to metadata
    });

    // Respond with the clientSecret to confirm payment
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    // Handle any errors and return a 500 response
    res.status(500).send({ error: error.message });
  }
});

app.get('/orders/:order_id', async (req, res) => {
  const { order_id } = req.params;  // Retrieve order_id from the URL parameters
  console.log(order_id)
  try {
    // Query the database to get the order details based on the order_id
    const orderQuery = "SELECT * FROM orders WHERE order_id = ?";
    const [order] = await queryAsync(orderQuery, [order_id]);
    console.log(order)
    console.log(JSON.stringify(order, null, 2));
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Respond with the order details
    res.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/payment-success', async (req, res) => {
  const { paymentIntentId, order_id } = req.body;

  try {
    // Assuming you're updating the order status to 'paid' after a successful payment
    const updateOrderQuery = "UPDATE orders SET status = 'paid' WHERE order_id = ?";
    await queryAsync(updateOrderQuery, [order_id]);

    console.log(`✅ Payment successful for Order ${order_id} with PaymentIntent: ${paymentIntentId}`);

    // Respond with a success message
    res.status(200).send({ message: 'Payment successful!' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to handle AI recommendations
app.post('/recommend', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Generate content using the Gemini model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Send the response back to the frontend
    res.json({ recommendations: text.split('\n').filter((line) => line.trim() !== '') });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Error while fetching recommendations' });
  }
});

// Add these endpoints after your existing routes but before the server starts

// Helper function to build comment tree (for nested comments)
function buildCommentTree(comments) {
  // Create a map of comments by their ID
  const commentMap = new Map();
  comments.forEach(comment => {
    comment.replies = [];  // Initialize replies array for each comment
    commentMap.set(comment.comment_id, comment);
  });

  // Root array for top-level comments
  let rootComments = [];

  // Loop through comments to construct the tree structure
  comments.forEach(comment => {
    if (comment.parent_comment_id === null) {
      // If parent_comment_id is null, it's a top-level comment
      rootComments.push(comment);
    } else {
      // Otherwise, find the parent and add the comment to its replies
      const parentComment = commentMap.get(comment.parent_comment_id);
      if (parentComment) {
        parentComment.replies.push(comment);
      }
    }
  });

  return rootComments;
}

// Get approved comments for an article
app.get('/article/:articleId/comments', async (req, res) => {
  try {
    const result = await queryAsync(`
      SELECT c.*, u.name AS username
      FROM article_comments c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.article_id = ? 
        AND c.is_approved = 1 
        AND c.deleted_at IS NULL
      ORDER BY c.created_at DESC
    `, [req.params.articleId]);

    // Log the full result object
    console.log("Fetched result:", result);

    // Check if the result has the comments in a property (e.g., result.rows)
    const comments = result.rows || result; // Adjust based on your query result structure
    
    if (Array.isArray(comments)) {
      const commentTree = buildCommentTree(comments);
      res.json(commentTree);
    } else {
      throw new Error('Comments data is not in an expected array format');
    }

  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Post a new comment (protected route)
app.post('/article/:articleId/comments', async (req, res) => {
  try {
    const { text, userId, rating = null } = req.body;
    
    // Validate required fields
    if (!text || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1-5' });
    }

    // Insert into database with all fields
    const result = await queryAsync(
      `INSERT INTO article_comments 
       (article_id, user_id, comment_text, rating, is_approved, created_at) 
       VALUES (?, ?, ?, ?, 0, NOW())`, // Default to pending approval (0)
      [req.params.articleId, userId, text, rating]
    );

    // Return the created comment
    const [comment] = await queryAsync(
      `SELECT * FROM article_comments WHERE comment_id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      comment: {
        comment_id: comment.comment_id,
        article_id: comment.article_id,
        user_id: comment.user_id,
        comment_text: comment.comment_text,
        rating: comment.rating,
        created_at: comment.created_at
      }
    });

  } catch (err) {
    console.error('Comment submission error:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get comment count for an article
app.get('/article/:articleId/comments/count', async (req, res) => {
  try {
    const [result] = await queryAsync(`
      SELECT COUNT(*) as count 
      FROM article_comments 
      WHERE article_id = ? 
        AND is_approved = 1 
        AND deleted_at IS NULL
    `, [req.params.articleId]);
    
    res.json({ count: result[0].count });
  } catch (err) {
    console.error('Error fetching comment count:', err);
    res.status(500).json({ error: 'Failed to fetch comment count' });
  }
});

// TODO: Improve logic - using ORDER BY RAND() temporarily for random related articles.
// In future, replace with smarter logic (e.g. "frequently bought together", same category, etc.)
app.get('/api/article/:articleId/related', (req, res) => {
  const { articleId } = req.params;

  const sql = `
    SELECT a.article_id, a.name, a.price, a.image_1
    FROM article a
    WHERE a.deleted_at IS NULL
      AND a.article_id != ? 
    ORDER BY RAND() 
    LIMIT 4
  `;

  db.query(sql, [articleId], (err, result) => {
    if (err) {
      console.error('Error fetching related articles:', err);
      return res.status(500).json({ error: 'Failed to fetch related articles' });
    }

    res.json(result);
  });
});

// ✅ Route to get formatted product recommendations
app.post('/api/gemini', async (req, res) => {
  const { prompt } = req.body;

  // Wrap the user prompt with formatting instructions
  const formattedPrompt = `
Format the following request as HTML for a product recommendation section on an e-commerce site.
Use readable HTML structure: <h2> for title, <p> for summary, and <ul><li> for list items.
Make it skimmable and clear for shoppers.

Request: "${prompt}"
`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.0-flash-exp',
    });

    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ reply: 'Error generating HTML content from Gemini.' });
  }
});

app.get('/api/departments/:departmentId/articles', async (req, res) => {
  const { departmentId } = req.params;

  console.log('Incoming departmentId:', departmentId); // ← Log this!

  try {
    const articles = await queryAsync(
      `
      SELECT DISTINCT a.*
      FROM article a
      JOIN category_article ca ON a.article_id = ca.article_id
      JOIN category c ON ca.category_id = c.category_id
      WHERE c.department_id = ?
        AND a.deleted_at IS NULL
      ORDER BY a.article_id DESC
      `,
      [departmentId]
    );

    res.json(articles);
  } catch (err) {
    console.error('Error fetching department articles:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
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