const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users, addUser } = require('../utils/dataStore');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret_for_exam_please_change';

// Register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = addUser({ username, password: hashed, role });
  return res.status(201).json({ message: 'User registered', user: { id: user.id, username: user.username, role: user.role } });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
  return res.status(200).json({ message: 'Login successful', authToken: token });
});

module.exports = router;
