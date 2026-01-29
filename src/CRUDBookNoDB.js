require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "Author 1"
    },
    {
        id: 2,
        title: "Author 2"
    },
    {
        id: 3,
        title: "Author 3"
    }
];

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
});

app.post("/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.send(newBook);
});

app.put("/books/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send("Book not found");
    book.title = req.body.title;
    res.send(book);
});

app.delete("/books/:id", (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send("Book not found");
    const deletedBook = books.splice(bookIndex, 1);
    res.send(deletedBook);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
