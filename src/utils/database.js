import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongodb already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;

    console.log("MongoDb Is Connected");
  } catch (err) {
    console.log(err);
  }
};
