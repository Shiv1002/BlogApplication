import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "BlogApplication",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Connection with ${process.env.MONGODB_URI} success🔥`);
    })
    .catch((e) => {
      console.log(e.message);
    });
};
