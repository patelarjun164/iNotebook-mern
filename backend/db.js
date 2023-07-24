const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://hackmech007:1111arjun@cluster0.tzmxqm3.mongodb.net/iNotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connect to mongo secucessfully..!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;
