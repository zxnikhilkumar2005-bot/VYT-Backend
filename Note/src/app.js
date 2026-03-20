const express = require("express");

const app = express();
app.use(express.json());

const notes = [];
/* POST /notes */
app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message: "Note created successfully"
    }) 

})

/* GET /notes */
app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:"Notes retrieved successfully",
        notes: notes
    })
})
/*delete /notes/index */
app.delete("/notes/:index",(req,res)=>{
    const index = req.params.index
    delete notes[index]

    res.status(200).json({
        message:"Note deleted successfully"
    })
})

app.patch('/notes/:index',(req,res)=>{
    const index = req.params.index
    const description = req.body.description
    const testle = req.body.testle
    notes[index].testle = testle
    notes[index].description = description
    res.status(200).json({
        message:"Note updated successfully"
    })
})

module.exports = app;