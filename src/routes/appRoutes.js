import { Router } from 'express';
import appController from '../controllers/appController';

const appRouter = Router();

appRouter.get('/posts', appController.postList);
appRouter.get('/post/:postId', appController.postDetails);
appRouter.get('/:post/:postId/comments', appController.postComments);

appRouter.get('/user/:userId', appController.userDetails);
appRouter.post('/user/:userId', appController.setUserDetails);
appRouter.post('/:user/post', appController.createPost);

module.exports = appRouter;
