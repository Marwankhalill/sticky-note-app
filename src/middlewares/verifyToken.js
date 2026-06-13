import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const verifyToken = async (req, res, next) => {
  let { token } = req.headers;
  jwt.verify(token, "Fairouz", async (err, decoded) => {
    // if (err) return res.status(401).json({ message: "invalid Token", err });
    if (err) return next(new AppError("invalid Token", 401));
    req.user = decoded;
    next();
  });
};
