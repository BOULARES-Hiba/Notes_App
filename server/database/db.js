import mongoose from "mongoose";


export const connectMongoose = async () => {
try {
   await mongoose.connect(process.env.MONGOOSE_LINK);
   console.log("connected");
} catch (error) {
   console.log("error when connecting to the db",error.message)
}
}
