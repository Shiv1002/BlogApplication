import e from "express";
import { json } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectDB } from "../data/database.js";
import userRouter from "./routes/UserRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = e();
const PORT = process.env.PORT || 3000;

app.use(json());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!!");
});

app.use("/users", userRouter);

app.use(errorMiddleware);

// connect with DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} 🔥`);
});
