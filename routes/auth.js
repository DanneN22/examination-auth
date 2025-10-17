const express = require('express');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePasswords } = require('../utils/hash');


const router = express.Router();


const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'secret_for_exam_please_change';


router.post('/register', async (req, res) => {
const { username, password, role } = req.body;
if (!username || !password || !role) return res.status(400).json({ message: 'Missing fields' });


const exists = users.find(u => u.username === username);
if (exists) return res.status(409).json({ message: 'User already exists' });


const hashed = await hashPassword(password);
const newUser = { id: Date.now().toString(), username, password: hashed, role };
users.push(newUser);


res.status(201).json({ message: 'User registered successfully' });
});


router.post('/login', async (req, res) => {
const { username, password } = req.body;
if (!username || !password) return res.status(400).json({ message: 'Missing fields' });


const user = users.find(u => u.username === username);
if (!user) return res.status(401).json({ message: 'Invalid credentials' });


const ok = await comparePasswords(password, user.password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '2h' });
res.status(200).json({ message: 'Login successful', authToken: token });
});


module.exports = { router, users };