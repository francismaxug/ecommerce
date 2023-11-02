import express from 'express'
const app = express();
app.use(express.json());
import colors from 'colors'
import dotenv from "dotenv"
dotenv.config()
import { customError } from './middleware/customError.js';
import dbConnect from './config/db.js';
import products from "./routes/products.js"
import userRoutes from "./routes/userRoutes.js"
import appError from './utils/appError.js';
const PORT = process.env.PORT || 8000

dbConnect()
app.use("/api", products)
app.use("/api", userRoutes)


app.use("*", (req, res, next) => {
  // const err = new Error("hey!!! There is an error")
  // res.status(404)
  // next(err)
  throw new appError("hey!!! There is an error", 404)
})


app.use(customError)

// app.get("/api/products/:id", (req, res) => {
//   const product = products.find(p => p.id === req.params.id)
//   res.json(product)
// })







app.listen(PORT, (req, res) => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port, ${PORT}`.yellow.underline);
})