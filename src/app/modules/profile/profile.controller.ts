import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProfileService.getUserProfile(user?.userId);

  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrived successfully',
    data: result,
  });
});

export const ProfileController = {
  getUserProfile,
};
