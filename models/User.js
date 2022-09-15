const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
      minLength: 2,
    },
    userName: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      maxLength: 20,
      minLength: 1,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Users", timestamps: true }
);

UserSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw createError(400, "Girilen email veya şifre hatalı");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw createError(400, "Girilen email veya şifre hatalı");
  }

  return user;
};

UserSchema.methods.generateToken = async function () {
  const loggedInUser = this;
  const token = await jwt.sign({ _id: loggedInUser._id }, "secretkey", {
    expiresIn: "1h",
  });

  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
