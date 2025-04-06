import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MongoDB URI: " + process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully: " + conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
