const User = require("../models/User");
const createError = require("http-errors");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const getUsers = await User.find({});
  res.json(getUsers);
};

const getUserById = async (req, res) => {
  res.json(req.user);
};

const addUser = async (req, res, next) => {
  try {
    const newUser = new User({
      _id: req.body.id,
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.password = await bcrypt.hash(newUser.password, 10);

    const result = await newUser.save();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  delete req.body.createdAt;
  delete req.body.updatedAt;

  if (req.body.hasOwnProperty("password")) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedUser) {
      return res.json(updatedUser);
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res.json({
        message: "User deleted",
        user: deletedUser,
      });
    } else {
      throw createError(404, "User not found");
    }
  } catch (error) {
    next(createError(400, error));
  }
};

const loginProccess = async (req, res, next) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const token = await user.generateToken();
    res.json({ user: user, token: token, success: true });
    if (!user) {
      res.json({ success: false });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginProccess,
};
