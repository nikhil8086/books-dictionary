const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    author: String,
    description: String
});

module.exports = mongoose.model("Book", BookSchema);
