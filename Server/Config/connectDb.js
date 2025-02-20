import mongoose from "mongoose";

const connectDb = async (mongo_url) => {
  try {
    await mongoose.connect(mongo_url);
    console.log(`Mongoose connected`);
    console.log(`Mongoose connected : ${mongoose.connection.host}`);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
};

export default connectDb;
