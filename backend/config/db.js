import mongoose from "mongoose";


const dbConnect = async function () {
  try {
    await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    console.log("Database connected successfully".cyan.underline)
  } catch (error) {
    console.log(`could not connect to database ${error.message}`.red.underline.bold);
    process.exit(1)
  }

}
export default dbConnect