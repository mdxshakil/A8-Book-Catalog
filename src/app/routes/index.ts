import express from 'express';
import { testRoutes } from '../modules/test';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/test',
    routes: testRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
