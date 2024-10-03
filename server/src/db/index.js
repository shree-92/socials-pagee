import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config({path:"./.env"})

const connectionStr = process.env.MONGODB_URI
const dbConnect = async () => {
    try {
        const connectionResponse  = await mongoose.connect(connectionStr);
        console.log(`connection to mongoDB was successful and the host is ${connectionResponse.connection.host}`);
        
    } catch (error) {
        console.log( error,"connection to mongoDB failed");
        process.exit(1)
    }
}

export default dbConnect;