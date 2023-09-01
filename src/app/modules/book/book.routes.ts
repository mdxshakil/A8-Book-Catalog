import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';
const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:categoryId/category', BookController.getBooksByCategoryId);
router.get('/:id', BookController.getSingleBook);
router.patch('/:id', BookController.updateSingleBook);
router.delete('/:id', BookController.deleteSingleBook);
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);

export const BookRoutes = router;