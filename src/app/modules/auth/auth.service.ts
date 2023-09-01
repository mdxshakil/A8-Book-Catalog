import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginData } from './auth.interface';
import {
  checkUserExistency,
  comparePassword,
  hashPassword,
  responseWithoutPassword,
} from './auth.utils';

const createUser = async (data: User): Promise<Partial<User>> => {
  const hashedPassword = hashPassword(data.password);
  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  // Exclude password field from response
  const userDataWithoutPasword = responseWithoutPassword(result, 'password');

  return userDataWithoutPasword;
};

const loginUser = async (loginData: ILoginData): Promise<string> => {
  // check user exists or not
  const isUserExists = await checkUserExistency(loginData.email);
  if (!isUserExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials');
  }
  //check password matches or not
  const isPasswordMatched = comparePassword(
    loginData.password,
    isUserExists.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid credentials');
  }
  // generate token
  const token = jwtHelpers.createToken(
    { userId: isUserExists.id, role: isUserExists.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return token;
};

export const AuthService = {
  createUser,
  loginUser,
};
