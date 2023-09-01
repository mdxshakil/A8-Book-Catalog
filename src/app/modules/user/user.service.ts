import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUpdateUserResponse, IUserResponse } from './user.interface';
import { checkUserExistency } from './user.utils';

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
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getSingleUser = async (id: string): Promise<IUserResponse | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: IUpdateUserResponse
): Promise<IUpdateUserResponse | null> => {
  const isExists = await checkUserExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const deleteSingleUser = async (id: string): Promise<IUserResponse | null> => {
  const isExists = await checkUserExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const result = await prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
