import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { checkUserExistency, responseWithoutPassword } from './user.utils';

const getAllUser = async (): Promise<Partial<User>[]> => {
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

const getSingleUser = async (id: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }

  // Exclude password field from response
  const resultWithoutPasword = responseWithoutPassword(result, 'password');

  return resultWithoutPasword;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User> | null> => {
  const isExists = await checkUserExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
  // Exclude password field from response
  const resultWithoutPasword = responseWithoutPassword(result, 'password');

  return resultWithoutPasword;
};

const deleteSingleUser = async (id: string): Promise<Partial<User> | null> => {
  const isExists = await checkUserExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found');
  }
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  // Exclude password field from response
  const resultWithoutPasword = responseWithoutPassword(result, 'password');

  return resultWithoutPasword;
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
