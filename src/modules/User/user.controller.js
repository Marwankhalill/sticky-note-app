import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";

const signUp = catchError(async (req, res) => {
  let user = await User.insertMany(req.body);
  user[0].password = undefined;
  res.status(201).json({ message: "User added successfully", user });
});

const signin = catchError(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    // return res.status(401).json({ message: "invalid Email or Password" });
    return next(new AppError("invalid Email or Password", 401));

  jwt.sign(
    { userId: user._id, name: user.name, role: user.role },
    "Fairouz",
    (err, token) => {
      res.json({ message: `Hi ${user.name}`, token });
    },
  );
});

export { signUp, signin };
