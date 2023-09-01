import prisma from '../../../shared/prisma';

export const checkCategoryExistency = async (id: string): Promise<boolean> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result ? true : false;
};
