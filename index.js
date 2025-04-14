const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/upload', require('./routes/upload'));
  
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ 成功連接到 MongoDB Atlas!');
    app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
  })
  .catch((err) => console.error('❌ 連線失敗:', err));
