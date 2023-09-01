import { UserRole } from '@prisma/client';

export type ICreateUserResponse = {
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
