const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const obj = {
        title: "ardfvdfvjun",
        description: "lorem32"
    }
    res.json(obj);
})

module.exports = router;