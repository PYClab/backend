const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = 'secret-key';

router.post('/register', async (req, res) => {
  const { username, password, avatar } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ msg: '使用者已存在' });
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed, avatar });
  await user.save();
  res.json({ msg: '註冊成功' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ msg: '帳號或密碼錯誤' });
  const token = jwt.sign({ id: user._id }, SECRET);
  res.json({ token });
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username avatar');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: '無法取得使用者列表' });
  }
});

module.exports = router;