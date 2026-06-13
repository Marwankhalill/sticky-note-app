import bcrypt from "bcrypt";
import { User } from "../../database/models/user.model.js";

export const checkEmail = async (req, res, next) => {
  let isFound = await User.findOne({ email: req.body.email });
  if (isFound) {
    return res.status(409).json({ message: "This email already exist" });
  }
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
