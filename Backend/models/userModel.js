//change for the name
import mongoose from "mongoose";
import bycrpt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrpt.compare(enteredPassword, this.password);
};

//pre will lauch the function before saving the data to database
userSchema.pre("save", async function (next) {
  //checking password is modfiled
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrpt.genSalt(10);
  this.password = await bycrpt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
