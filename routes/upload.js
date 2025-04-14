const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'avatars', // 圖片儲存在 cloudinary 的資料夾
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

router.post('/', upload.single('avatar'), (req, res) => {
  // 回傳圖片網址
  res.json({ url: req.file.path });
});

router.get('/ping', (req, res) => {
  res.send("✅ Upload router is working");
});

module.exports = router;
