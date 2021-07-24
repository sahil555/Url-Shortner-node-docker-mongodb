const mongoose = require("mongoose");


// schema for storing data into mongodb

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    clickCount: Number
});

module.exports = mongoose.model("url", urlSchema);