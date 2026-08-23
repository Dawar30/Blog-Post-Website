import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connection = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfuly ${conn}`);
    } catch (error) {
        console.log("could not connect",error);
    }

}

export default connection;