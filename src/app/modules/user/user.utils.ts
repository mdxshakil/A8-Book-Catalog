import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

export const checkUserExistency = async (id: string): Promise<boolean> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result ? true : false;
};

// Exclude password field from user
export const responseWithoutPassword = (user: User, key: string) => {
  delete user[key as keyof User];
  return user;
};
