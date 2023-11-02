import express from "express"
import { loginUser, updateUser, registerUser, getUserProfile } from "../controllers/userController.js"
import authenticate from "../middleware/authUser.js"
const router = express.Router()
router.post("/login", loginUser)
router.post("/register", registerUser)
router.route("/profile").get(authenticate, getUserProfile).put(authenticate, updateUser)

export default router