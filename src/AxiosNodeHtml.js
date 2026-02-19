const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const baseURL = 'http://localhost:3000'; // API Server

// View Engine
app.set("views", path.join(__dirname, "../public/view"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

// ===== ROUTES =====

// Home - show all books
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/books`);
        res.render("books", { books: response.data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Cannot connect to API Server");
    }
});

// Book detail
app.get("/books/:id", async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/books/${req.params.id}`);
        res.render("book_detail", { book: response.data });
    } catch (error) {
        res.status(500).send("Book not found");
    }
});

// Create page
app.get("/create", (req, res) => {
    res.render("create_book");
});

// Create action
app.post("/create", async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            author: req.body.author
        };

        await axios.post(`${baseURL}/books`, data);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Create failed");
    }
});

// Update page
app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/books/${req.params.id}`);
        res.render("update_book", { book: response.data });
    } catch (error) {
        res.status(500).send("Cannot load book");
    }
});

// Update action
app.post("/update/:id", async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            author: req.body.author
        };

        await axios.put(`${baseURL}/books/${req.params.id}`, data);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Update failed");
    }
});

// Delete
app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(`${baseURL}/books/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Delete failed");
    }
});

// Start server
app.listen(5000, () => {
    console.log("🚀 View Server running at http://localhost:5000");
});
