const mangoose = require('mongoose');

async function connectDB() {
    await mangoose.connect(process.env.MONGO_URI)

    console.log("Connected to DB");
    
}

module.exports = connectDB;