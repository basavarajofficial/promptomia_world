
import mongoose from 'mongoose'

let isConnected = false; //trcak the conection

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("Mongodb is already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
    }
}