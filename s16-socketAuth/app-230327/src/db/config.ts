import mongoose from "mongoose";

export const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN!, {});
    console.log("Data base connected");
  } catch (error) {
    console.log({ error });
    throw new Error("Data base connection error");
  }
};
