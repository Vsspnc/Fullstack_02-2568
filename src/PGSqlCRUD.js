// Description: Node Express REST API with Sequelize and PostgreSQL CRUD Book
require('dotenv').config({ debug: true });

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json());

// PostgreSQL connection
const dbUrl = 'postgres://webadmin:BHOxar76301@node84920-fs-visitsak2.th.app.ruk-com.cloud:11765/Books';

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: console.log, // ดู SQL log
});

// Define Model
const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Test connection + Sync DB
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');

    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );

  } catch (error) {
    console.error('❌ Unable to connect to database:', error);
  }
}

startServer();

// Routes
app.get("/", (req, res) => {
  res.send("Hello Book CRUD World! by Visitsak Phenongchum");
});

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.json(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create book
app.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update book
app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    await book.update(req.body);
    res.json(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete book
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send('Book not found');

    await book.destroy();
    res.send('Book deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});
