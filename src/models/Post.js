const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: String,
  title: String,
  subTitle: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  captionImageUrl: String,
  body: String,
});

const Post = mongoose.model('Post', postSchema)
module.exports = Post