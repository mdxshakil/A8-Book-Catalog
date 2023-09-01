import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ICreateUserResponse } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserService.createUser(data);
  const { accessToken, ...others } = result;
  //   set token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  };
  res.cookie('refreshToken', accessToken, cookieOptions);

  sendResponse<ICreateUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: others,
  });
});

export const UserController = {
  createUser,
};
