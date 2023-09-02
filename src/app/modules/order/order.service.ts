import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IAuthenticatedUser, IOrder } from './order.interface';
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

const getAllOrder = async (user: IAuthenticatedUser): Promise<Order[]> => {
  const { userId, role } = user;

  let whereConditions = {};

  //if role is customer, send only specific orders otherwise send all orders
  if (role === 'customer') {
    whereConditions = {
      userId,
    };
  }

  const result = await prisma.order.findMany({
    where: whereConditions,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
          contactNo: true,
          profileImg: true,
        },
      },
    },
  });
  return result;
};
export const OrderService = {
  createOrder,
  getAllOrder,
};
