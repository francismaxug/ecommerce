import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" })
  return token
}

export default generateToken