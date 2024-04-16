const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//create user
const createuserCtrl = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
//login user
const loginuser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time
      });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});



const alluserlist = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
    createuserCtrl,
    loginuser,alluserlist
};
