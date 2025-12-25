const mongoose = require('mongoose');
const dotenv = require ('dotenv');

dotenv.config();

const mondoURI = process.env.MONGO_URI; //getting mongoDB URI from .env

const connectToMongo = async () => {
    try {
        await mongoose.connect(mondoURI);
        console.log("MongoDB Connected Successfully.");
    } catch (error) {
        console.log("Could't Connect to MongoDB.\n", error.message);
    }
}

module.exports = connectToMongo;