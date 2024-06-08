import connctMongo from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();

const mongoStore = connctMongo.create({
  mongoUrl: process.env.MONGODB_URI,
  dbName: "BlogApplication",
  ttl: Date.now() + 30 * 60, // 30 minutes
});

export default mongoStore;
