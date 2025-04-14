const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dnlppblgs',
  api_key: '655889347228829',
  api_secret: '57KOABiawPKKmhRgtJQBcJ87DZQ',
});

module.exports = cloudinary;
