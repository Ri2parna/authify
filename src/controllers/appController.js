// perfoms the logic for the api requests form the application
const Post = require('../models/Post');
const PostContent = require('../models/PostContent');
// error handler function
const handleErrors = (err) => {
  // test
};

/* Endpoint: /posts: returns a list of posts 
content of each card ==> 
{
  postId
  title
  subTitle
  authorName
  captionImageUrl
  createdAt
}
*/
module.exports.postList = (req, res) => {
  try {
    Post.find()
      .limit(10)
      .then((data) => res.status(200).json(data));
  } catch (err) {
    console.log(err);
    res.send(401).json({ error: 'Error fetching data from the database' });
  }
};

/* Endpoint: /post/:postId : returns the details of a particular post
Returns: {
  postId
  createdAt
  updatedAt
  captionImageUrl
  likes
  comments
}
 */
module.exports.postDetails = (req, res) => {
  let postId = req.params.postId;
  try {
    PostContent.findOne({ _id: postId }).then((data) =>
      res.status(201).json(data)
    );
  } catch (err) {
    console.log(err);
  }
};

/*
Endpoint: /post/:postId/comments
Returns:
{
  commentId,
  createdAt,
  comment,
  author,
  updatedAt
}
*/
module.exports.postComments = (req, res) => {
  res.send(req.params);
};

/*
Endpoint: /post/:postId/comments
Returns: Status code 201 - Created
*/
module.exports.createPost = (req, res) => {
  const { userId, username, title, subTitle, body } = req.body;
  Post.create({ userId, username, title, subTitle, body })
    .then((data) => res.status(201).json(data))
    .catch((err) => {
      console.log(err); // handleErrors instead of just logging them
      res
        .status(401)
        .json({ error: 'Could not save the post, there was an error' });
    });
};

module.exports.userDetails = (req, res) => {
  res.send(req.params);
};

module.exports.setUserDetails = (req, res) => {
  res.send(res.params);
};
