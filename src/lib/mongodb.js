import mongoose from "mongoose";

export const connectMongoDb=async()=>{
    try{
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
        console.log("Mongodb Connected")
        return true
    }catch(error){
        console.log("Connection Error", error)
        process.exit(1)
    }
}