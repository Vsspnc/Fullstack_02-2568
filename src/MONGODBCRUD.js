const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect(
  "mongodb://admin:CVAnqv99709@node86134-fs-visitsak2.th.app.ruk-com.cloud:11842",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ===== Schema & Model =====
const bookSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

const Book = mongoose.model('Book', bookSchema);

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("Hello Book CRUD World! by Visitsak Phenongchum");
});

// CREATE
app.post('/books', async (req, res) => {
  try {
    const lastBook = await Book.findOne().sort({ id: -1 });
    const nextId = lastBook ? lastBook.id + 1 : 1;

    const book = new Book({
      id: nextId,
      title: req.body.title,
      author: req.body.author
    });

    await book.save();
    res.status(201).json(book);   // ✅ แก้ตรงนี้
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// READ ALL
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// READ ONE
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ id: Number(req.params.id) }); // ✅ แปลงเป็น Number
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// UPDATE
app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { id: Number(req.params.id) },   // ✅ แปลงเป็น Number
      req.body,
      { new: true }
    );

    if (!book) return res.status(404).send("Book not found");
    res.json(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE
app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ id: Number(req.params.id) }); // ✅ แปลงเป็น Number
    if (!book) return res.status(404).send("Book not found");
    res.json({ message: "Book deleted", book });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
