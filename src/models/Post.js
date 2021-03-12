const mongoose = require('mongoose');
const PostContent = require('../models/PostContent');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  username: String,
  postId: mongoose.SchemaTypes.ObjectId,
  title: String,
  subTitle: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  captionImageUrl: String,
  body: String,
});

postSchema.pre('save', async function (next) {
  await PostContent.create({ postBody: this.body }).then((data) => {
    this.postId = data._id;
  });
  next(); // the middleware halts otherwise
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
