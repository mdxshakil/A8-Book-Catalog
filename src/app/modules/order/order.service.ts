import { Order, UserRole } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import {
  IAuthenticatedUser,
  IOrder,
  IOrderFetchCondition,
} from './order.interface';
import { checkBooksExistency, checkOrderExistency } from './order.utils';

const createOrder = async (data: IOrder) => {
  // Extract the bookIds from the orderedBooks array
  const bookIds = data?.orderedBooks.map(item => item.bookId);
  //check all the book selected by user exists or not
  const isExists = await checkBooksExistency(bookIds);

  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book does not exists');
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
  if (role === UserRole.customer) {
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

const getSingleOrder = async (
  orderId: string,
  user: IAuthenticatedUser
): Promise<Order | null> => {
  const { userId, role } = user;
  //check if the order exists or not
  const isExists = checkOrderExistency(orderId);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order does not exists');
  }

  const whereConditions: IOrderFetchCondition = {
    id: orderId, //always match with orderId, whatever the userRole is
  };

  //if user is not admin, match userId with the order's userId
  if (role !== UserRole.admin) {
    whereConditions['userId'] = userId;
  }

  const result = await prisma.order.findUnique({
    where: whereConditions,
  });

  //throw error in case the order's userId doesnot match with customers id
  if (user.role !== UserRole.admin && userId !== result?.userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
