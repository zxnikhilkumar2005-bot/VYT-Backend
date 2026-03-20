const mongoose =require("mongoose");

async function connectDB() {
    await mongoose.connect("mongodb+srv://yt:vcRkgTSXcKWXJdgd@yt-backend.0uu8irn.mongodb.net/halley")
    console.log("connected to database");
}

module.exports = connectDB;