import User from "../models/userModel.js"
import appError from "../utils/appError.js"
import generateToken from "../utils/token.js"
import asyncHandler from "express-async-handler"
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  try {
    if (!user) {
      throw new appError("invalid credentials", 404)
    }
    const matchPassword = await user.comparePasswords(password)
    if (!matchPassword) {
      throw new appError("invalid credentials", 404)
    }
    const payload = {
      user: user._id
    }
    const token = generateToken(payload)
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token
    })

  } catch (error) {
    next(error)
  }

})

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    const exist = await User.findOne({ email })
    if (exist) {
      throw new appError("user already exist", 401)
    }
    const result = new User({
      name,
      email,
      password
    })
    await result.save()
    const payload = {
      user: result._id
    }
    const token = generateToken(payload)
    res.status(200).json({
      id: result._id,
      name: result.name,
      email: result.email,
      isAdmin: result.isAdmin,
      token: token
    })
    console.log(result)
  } catch (error) {
    next(error)
  }

})
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)


  try {
    if (!user) {
      throw new appError("validation error", 401)
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,

    })


  } catch (error) {
    next(error)
  }


})

export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const { name, email, password } = req.body

  try {
    if (!user) {
      throw new appError("validation error", 401)
    }

    user.name = name || user.name
    user.email = email || user.email

    if (password) {
      user.password = password
    }

    const result = await user.save()
    const payload = {
      user: result._id
    }
    const token = generateToken(payload)
    res.status(200).json({
      id: result._id,
      name: result.name,
      email: result.email,
      isAdmin: result.isAdmin,
      token: token
    })


  } catch (error) {
    next(error)
  }


})