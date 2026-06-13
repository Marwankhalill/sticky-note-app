import { Router } from "express";
import { signin, signUp } from "./user.controller.js";
import { checkEmail } from "../../middlewares/checkEmail.js";

const userRouter = Router();

userRouter.post("/signup", checkEmail, signUp);
userRouter.post("/signin", signin);

export default userRouter;
