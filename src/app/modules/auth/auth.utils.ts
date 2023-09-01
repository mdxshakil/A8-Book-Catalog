import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../shared/prisma';

export const hashPassword = (password: string): string => {
  const hashedPassword = bcrypt.hashSync(password, Number(config.salt_round));
  return hashedPassword;
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

// Exclude keys from user
export const responseWithoutPassword = (user: User, key: string) => {
  delete user[key as keyof User];
  return user;
};

export const checkUserExistency = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return result;
};
