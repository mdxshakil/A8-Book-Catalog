import { User } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { responseWithoutPassword } from '../user/user.utils';

const getUserProfile = async (
  userId: string
): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exists');
  }
  const resultWithoutPassword = responseWithoutPassword(result, 'password');
  return resultWithoutPassword;
};

export const ProfileService = {
  getUserProfile,
};
