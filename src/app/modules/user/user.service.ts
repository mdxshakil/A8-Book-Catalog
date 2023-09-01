import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ICreateUserResponse } from './user.interface';

const createUser = async (data: User): Promise<ICreateUserResponse> => {
  const hashedPassword = bcrypt.hashSync(
    data.password,
    Number(config.salt_round)
  );
  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  let accessToken = '';
  if (result) {
    accessToken = jwtHelpers.createToken(
      { userId: result.id, role: result.role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  }

  // Exclude password field from response
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...responseWithoutPassword } = result;

  return { ...responseWithoutPassword, accessToken };
};

export const UserService = {
  createUser,
};
