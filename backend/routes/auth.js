const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_Secret = "helloworldofc$omputer";

//ROUTE 1:Create a user using: POST "/api/auth/createuser". No login required
router.post("/createuser", [
    body('name'),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be of atleast 5 charracter').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //If there are errors, return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({success, errors: result.array()});
    }
    //check weather user with this email exist
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry, user with this email already exist.' })
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
        success = true;
        res.json({success,authToken});
        // res.send(user);  
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error...!")
    }
});

//ROUTE 2:Authenticate a user using: POST "/api/auth/login". No login required
router.post("/login", [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {
    let success = false;
    //If there are errors, return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({errors: "Please try to login with correct Credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({errors: "Please try to login with correct Credentials"});
        }

        const data = {
            user: {
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_Secret);
        success = true;
        res.json({success,authToken});

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error...!");
    }
})

//ROUTE 3:Get loggedin user Details using: POST "/api/auth/getuser". Login Required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error...!");
    }
})

module.exports = router;