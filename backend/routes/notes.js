const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1: Fetch all notes using: GET "api/notes/fetchallnotes". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error...!")
    }
})

//ROUTE 2: Add a new notes using: POST "api/notes/addnote". Login Required
router.post("/addnote", fetchuser ,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be of atleast 5 Characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are errors, return bad request and errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ errors: result.array() });
        }
        let notes = await Note.create({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
        })

        res.send(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error...!")
    }
})


//ROUTE 3: Update an existing note using: PUT "api/notes/updatenote". Login Required
router.put('/updatenote/:id', fetchuser ,async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        
        //Create a new note object 
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        //Check weather note is available or not
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        //comparing userId avalaible in note.user with userId with whom user login
        //this prevent the updation of notes by other user, other than login user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed...!");
        }
        
        //Find the note to be updated and update it
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true});
        res.send(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error...!")
    }
})

//ROUTE 4: Delete an existing note using: DELETE "api/notes/deletenote". Login Required
router.delete('/deletenote/:id',fetchuser , async (req, res) => {
    try {
        //Check weather note is available or not
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        //comparing userId avalaible in note.user with userId with whom user login
        //this prevent the updation of notes by other user, other than login user
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed...!");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Status":"Note deleted Sucessfully", note:note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error...!")
    }
});

module.exports = router;