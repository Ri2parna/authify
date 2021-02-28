import { Router } from 'express';
import appController from '../controllers/appController';

const appRouter = Router();

appRouter.get('/posts', appController.postList);

module.exports = appRouter;
