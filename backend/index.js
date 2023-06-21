const express = require('express');
const connectToMongo = require("./db");
connectToMongo();

const app = express();
const port = 3000;

app.get("/", (req,res)=> {
    res.send("Hello World 1234");
})

app.listen(port, ()=> {
    console.log("App listening at port " + port);
})