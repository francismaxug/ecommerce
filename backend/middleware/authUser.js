import User from "../models/userModel.js";
import appError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const authenticate = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1]
    console.log(token)
    if (!token) {
      throw new appError("Invalid authorization", 400)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const getAuser = await User.findById(decoded.user).select("-password")
    if (!getAuser) {
      throw new appError("No verification token, User not found", 404)
      // return res.status(404).json({ error: 'No verification token, User not found' });
    }
    console.log(getAuser);
    req.user = getAuser
    next()
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed" })
  }
}

export default authenticate