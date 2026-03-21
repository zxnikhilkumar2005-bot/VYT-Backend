const express = require('express');
const multer = require("multer");
const uploadFile = require('./services/storage.service')
const postModel =require("./models/post.model")
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());


const upoload = multer({storage:multer.memoryStorage()})


app.post('/create-post', (req, res) => {
    upoload.single("image")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                message: "File upload failed",
                error: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Image file is required"
            });
        }

        try {
            const result = await uploadFile(req.file.buffer);

            const post = await postModel.create({
                image: result.url,
                caption: req.body.caption
            });

            return res.status(200).json({
                Message: "post created successfully",
                post
            });
        } catch (error) {
            return res.status(500).json({
                message: "Could not create post",
                error: error.message
            });
        }
    });
})


app.get("/posts",async (req,res) =>{
    const posts = await postModel.find()

    return res.status(200).json({
        Message: "Posts fetched successfully",
        posts
    })
})

module.exports = app;