const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connect to mongo secucessfully..!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;