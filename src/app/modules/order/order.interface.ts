import { OrderStatus } from '@prisma/client';

export type IOrderedBook = {
  bookId: string;
  quantity: number;
};
export type IOrder = {
  userId: string;
  orderedBooks: IOrderedBook[];
  status?: OrderStatus;
  createdAt?: Date;
};

export type IAuthenticatedUser = {
  userId: string;
  role: string;
};
