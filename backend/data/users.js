import bcrypt from 'bcryptjs';
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    isAdmin: true,
    password: bcrypt.hashSync("12345", 10)
  },
  {
    name: "Max Code",
    email: "max@example.com",
    password: bcrypt.hashSync("12345", 10)
  },
  {
    name: "Mr Shabel",
    email: "shab@example.com",
    password: bcrypt.hashSync("12345", 10)
  }
]

export default users