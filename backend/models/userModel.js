
import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },

},
  {
    timestamps: true
  })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return
  } catch (error) {
    console.log(error);
  }

})

userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password)
}
const User = model("User", userSchema);
export default User;