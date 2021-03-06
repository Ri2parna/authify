// perfoms the logic for the api requests form the application

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
  res.status(200).json({});
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
  res.send(req.params);
};
