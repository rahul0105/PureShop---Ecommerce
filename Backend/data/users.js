import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: true,
  },
  {
    name: "Harshit Raj",
    email: "harshit@email.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: false,
  },
  {
    name: "Rahul das",
    email: "das@email.com",
    password: bcrypt.hashSync("123456", 12),
    isAdmin: false,
  },
];

export default users;
