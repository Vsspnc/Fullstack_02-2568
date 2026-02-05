const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// make sure this folder exists: ./Database
const db = new sqlite3.Database('./Database/Book.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

app.use(express.json());

// CREATE TABLE
db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL
    )
`);

app.get('/', (req, res) => {
    res.send('Welcome to the Book API using SQLite!');
});


// GET all books
app.get('/books', (req, res) => {
    db.all('SELECT * FROM books', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// GET book by id
app.get('/books/:id', (req, res) => {
    db.get(
        'SELECT * FROM books WHERE id = ?',
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(row);
        }
    );
});

// CREATE book
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
    }

    db.run(
        'INSERT INTO books (title, author) VALUES (?, ?)',
        [title, author],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                id: this.lastID,
                title,
                author
            });
        }
    );
});

// UPDATE book
app.put('/books/:id', (req, res) => {
    const { title, author } = req.body;

    db.run(
        'UPDATE books SET title = ?, author = ? WHERE id = ?',
        [title, author, req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json({ message: 'Book updated' });
        }
    );
});

// DELETE book
app.delete('/books/:id', (req, res) => {
    db.run(
        'DELETE FROM books WHERE id = ?',
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json({ message: 'Book deleted' });
        }
    );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port at http://localhost:${port}`);
});
