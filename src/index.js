import e from "express";
import { json } from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import ErrorHandler from "./utils/ErrorHandler.js";

const app = e();
const PORT = process.env.PORT || 3000;

app.use(json());

app.get("/", (req, res) => {
  res.status(200).send("Hello world!!");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
