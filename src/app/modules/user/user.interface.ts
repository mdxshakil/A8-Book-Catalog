import { UserRole } from '@prisma/client';

export type IUserResponse = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg: string;
  accessToken?: string;
};

export type IUpdateUserResponse = {
  name: string;
  email: string;
  contactNo: string;
  address: string;
  profileImg: string;
};
