const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Book = require("./models/Book");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// GET all books
app.get("/books", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});


// GET book by ISBN
app.get("/books/:isbn", async (req, res) => {
    const book = await Book.findOne({ isbn: req.params.isbn });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
});


// POST create book
app.post("/books", async (req, res) => {
    const { isbn, title, author, description } = req.body;

    const exists = await Book.findOne({ isbn });
    if (exists) return res.status(400).json({ message: "ISBN already exists" });

    const book = new Book({ isbn, title, author, description });
    await book.save();

    res.json({ message: "Book Added Successfully", book });
});


// PUT update book
app.put("/books/:isbn", async (req, res) => {
    const book = await Book.findOneAndUpdate(
        { isbn: req.params.isbn },
        req.body,
        { new: true }
    );

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book Updated", book });
});


// DELETE book
app.delete("/books/:isbn", async (req, res) => {
    const book = await Book.findOneAndDelete({ isbn: req.params.isbn });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book Deleted" });
});


app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
