const mongoose = require('mongoose');

const postContentSchema = new mongoose.Schema({
  postBody: String,
});

const PostContent = mongoose.model('postcontent', postContentSchema);

module.exports = PostContent;
