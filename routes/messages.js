const express = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET = 'secret-key';

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const payload = jwt.verify(token, SECRET);
    req.userId = payload.id;
    next();
  } catch {
    res.sendStatus(403);
  }
}

router.get('/', async (req, res) => {
  const messages = await Message.find().populate('author', 'username avatar').sort({ createdAt: -1 });
  res.json(messages);
});

router.post('/', auth, async (req, res) => {
  const { content } = req.body;
  const message = new Message({ content, author: req.userId });
  await message.save();
  res.json({ msg: '留言成功' });
});

router.delete('/:id', auth, async (req, res) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) return res.sendStatus(404);
  if (msg.author.toString() !== req.userId) return res.sendStatus(403);
  await msg.deleteOne();
  res.json({ msg: '刪除成功' });
});

module.exports = router;