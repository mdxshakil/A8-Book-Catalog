import prisma from '../../../shared/prisma';
import { IUserResponse } from './user.interface';

const getAllUser = async (): Promise<IUserResponse[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

export const UserService = {
  getAllUser,
};
