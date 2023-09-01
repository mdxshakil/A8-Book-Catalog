import { UserRole } from '@prisma/client';

export type IUserSignupResponse = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  contactNo: string;
  address: string;
  profileImg: string;
  accessToken?: string;
};
