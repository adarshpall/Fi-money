const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
