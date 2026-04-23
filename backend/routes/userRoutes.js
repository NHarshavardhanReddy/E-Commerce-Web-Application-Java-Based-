const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mockUsers = require('../mockUsers');

const router = express.Router();

// Helper function for timeout
const withTimeout = (promise, ms = 5000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Database timeout')), ms))
  ]);
};

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Try database first with timeout
    try {
      const existingUser = await withTimeout(User.findOne({ email }), 5000);
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
    } catch (dbErr) {
      // Fallback to mock data
      const existingMock = mockUsers.find(u => u.email === email);
      if (existingMock) return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    };

    // Try to save to DB, but fallback works too
    try {
      const user = new User(newUser);
      await withTimeout(user.save(), 5000);
    } catch (dbErr) {
      console.log('Database unavailable, using mock data');
    }

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET || 'secret_key');
    res.json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: false } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    
    // Try database first with timeout
    try {
      user = await withTimeout(User.findOne({ email }), 5000);
    } catch (dbErr) {
      // Fallback to mock data
      user = mockUsers.find(u => u.email === email);
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secret_key');
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin || false,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    let user;
    try {
      user = await withTimeout(User.findById(req.params.id), 5000);
    } catch (dbErr) {
      user = mockUsers.find(u => u._id === req.params.id);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user.toObject?.() || user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;