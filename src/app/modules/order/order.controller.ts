import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const orderedBooks = req.body.orderedBooks;
  const orderData: IOrder = {
    userId: user?.userId,
    orderedBooks,
  };
  const result = await OrderService.createOrder(orderData);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userData = {
    userId: user?.userId,
    role: user?.role,
  };
  const result = await OrderService.getAllOrder(userData);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrived successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const user = req.user;
  const userData = {
    userId: user?.userId,
    role: user?.role,
  };
  const result = await OrderService.getSingleOrder(orderId, userData);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
};
