import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateAdminToken from '../utils/generateAdminToken.js';

const credentials = {
  email: "admin@gmail.com",
  password: "12345",
  _id: "61024896"
};

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === credentials.email && password === credentials.password) {
    console.log("Token creation");
    const adminToken = generateAdminToken(res, credentials._id);
    res.status(201).json({
      _id: credentials._id,
      email: credentials.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  console.log("Admin logout");
  res.cookie("jwtAdmin", "", {
    httpOnly: true,
    expires: new Date(),
  });
  res.status(200).json({ message: "Admin logged out" });
});

const getAllUser = asyncHandler(async (req, res) => {
  const userData = await User.find({}, { name: 1, email: 1, profileImageName: 1 });
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(400);
    throw new Error("Error in fetching data");
  }
});

const updateUserData = asyncHandler(async (req, res) => {
  const { userId, name, email } = req.body;
  const user = await User.findById(userId);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const deleted = await User.findByIdAndDelete(userId);

  if (deleted) {
    res.status(200).json({ success: true, message: "User Deleted Successfully" });
  } else {
    res.status(404).json({ success: false, message: "User deletion failed" });
  }
});

const addNewUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User alredy exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  }
});

export { authAdmin, logoutAdmin, addNewUser, deleteUser, updateUserData, getAllUser };
