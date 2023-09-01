import prisma from '../../../shared/prisma';

export const checkUserExistency = async (id: string): Promise<boolean> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result ? true : false;
};
