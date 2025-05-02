import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connnected Successfully :: ");
    } catch (error) {
        console.error(`ERROR :: ${error.message}`);
        process.exit(1);
    }
}


export default connectDB;