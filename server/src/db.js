import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully : Mission Accomplished");
  } catch (err) {
    console.error("DB Error:  Retry", err);
    process.exit(1);
  }
};
