process.on("uncaughtException", () => {
  console.log("error in code");
});
import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import userRouter from "./src/modules/User/user.routes.js";
import noteRouter from "./src/modules/Note/note.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { globalError } from "./src/middlewares/globalError.js";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", userRouter);
app.use("/notes", noteRouter);

app.use((req, res, next) => {
  //   res.status(404).json({ message: `${req.originalUrl} route not found ` });
  next(new AppError(`${req.originalUrl} route not found from AppError`, 404));
});

app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.log("error:", err);
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
