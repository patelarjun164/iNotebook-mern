const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_Secret = "helloworldofc$omputer";

//Create a user using: POST "/api/auth/createuser". No login required
router.post("/createuser", [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be of atleast 5 charracter').isLength({ min: 5 })
], async (req, res) => {
    //If there are errors, return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
    }
    //check weather user with this email exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry, user with this email already exist.' })
        }
        const salt =  bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_Secret);
        res.json({authToken});
        // res.send(user);  
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured...!")
    }
});

module.exports = router;