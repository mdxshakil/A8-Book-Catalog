import prisma from '../../../shared/prisma';

export const checkBooksExistency = async (
  bookIds: string[]
): Promise<boolean> => {
  const books = await prisma.book.findMany({
    where: {
      id: {
        in: bookIds,
      },
    },
  });
  return books.length === bookIds.length;
};

export const checkOrderExistency = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return result ? true : false;
};
