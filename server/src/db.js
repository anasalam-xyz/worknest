import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const mondoURI = process.env.MONGO_URI; //getting mongoDB URI from .env

const connectToMongo = async () => {
    try {
        await connect(mondoURI);
        console.log("MongoDB Connected Successfully.");
    } catch (error) {
        console.log("Could't Connect to MongoDB.\n", error.message);
    }
}

export default connectToMongo;