import generateJwtToken from "../lib/generateJwtToken.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, password, email } = req.body;
  const profilePic = req.file;
  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Checking if user alreaty exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic: profilePic?.path || null,
    });
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {}
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // Checking if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const jwtToken = await generateJwtToken(user.id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: jwtToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logOut = async (req, res) => {
  return res.status(200).json({ message: "User logged out successfully" });
};

export const checkAuth = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.status(200).json(user);
};
