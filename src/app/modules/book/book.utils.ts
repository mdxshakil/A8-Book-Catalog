import prisma from '../../../shared/prisma';

export const checkBookExistency = async (id: string) => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result ? true : false;
};
