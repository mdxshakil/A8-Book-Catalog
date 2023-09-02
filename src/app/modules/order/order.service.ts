import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IOrder } from './order.interface';
import { checkBooksExistency } from './order.utils';

const createOrder = async (data: IOrder) => {
  // Extract the bookIds from the orderedBooks array
  const bookIds = data?.orderedBooks.map(item => item.bookId);
  //check all the book selected by user exists or not
  const isExists = await checkBooksExistency(bookIds);

  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid book id');
  }

  const result = await prisma.order.create({
    data,
  });

  return result;
};

export const OrderService = {
  createOrder,
};
