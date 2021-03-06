import { Router } from 'express';
import appController from '../controllers/appController';

const appRouter = Router();

appRouter.get('/posts', appController.postList);

appRouter.get('/post/:postId', appController.postDetails);

appRouter.get('/user/:userId', (req, res) => {
  res.send(req.params);
});
appRouter.post('/user/:userId', (req, res) => {
  res.send(res.params);
});
module.exports = appRouter;
