const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');

const baseURL = 'http://localhost:3000';
const path = require('path');


// Serve static files
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/",async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/books`);
        res.render("books",{books: response.data});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/books/:id",async (req,res)=>{
    try {
        const response = await axios.get(`${baseURL}/books/${req.params.id}`);
        res.render("book_detail",{book: response.data});
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/create",(req,res)=>{
    res.render("create_book");
});

app.post("/create",async (req,res)=>{
    try {
        const data = {title: req.body.title, author: req.body.author};
        await axios.post(`${baseURL}/books`,data);
        res.redirect("/");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/update/:id",async (req,res)=>{
    try {
        const response = await axios.get
        (`${baseURL}/books/${req.params.id}`);
        res.render("update_book",{book: response.data});
    } catch (error) {
        res.status(500).send(error.message);
    }   
});


app.post("/update/:id",async (req,res)=>{
    try {
        const data = {title: req.body.title, author: req.body.author};
        await axios.put(`${baseURL}/books/${req.params.id}`,data);
        res.redirect("/");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/delete/:id",async (req,res)=>{
    try {
        await axios.delete(`${baseURL}/books/${req.params.id}`);
        res.redirect("/");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(5500, () => {
    console.log('Server is running on http://localhost:5500');
});


