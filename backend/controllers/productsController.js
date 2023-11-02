import Product from ".././models/productModel.js"
import appError from "../utils/appError.js"
import asyncHandler from "express-async-handler"
export const allProducts = asyncHandler(async (req, res, next) => {

  const products = await Product.find({})
  // throw new appError("something went wrong", 404)
  res.json(products)
})

export const getAproduct = asyncHandler(async (req, res, next) => {

  const product = await Product.findById(req.params.id)
  try {
    if (product) {
      res.json(product)
      return
    }
    if (!product) {
      throw new appError("product not found", 404)
    }
  } catch (error) {
    next(error)
  }

})