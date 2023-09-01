import { Book, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { checkCategoryExistency } from '../category/category.utils';
import { bookSearchableFields } from './book.constant';
import { IBookFilterOptions } from './book.interface';
import { checkBookExistency } from './book.utils';

const createBook = async (data: Book): Promise<Book> => {
  const isCategoryExists = await checkCategoryExistency(data.categoryId);
  if (!isCategoryExists) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Selected category does not exists'
    );
  }
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBooks = async (
  paginationOptions: IPaginationOptions,
  filterOptions: IBookFilterOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { search, ...filter } = filterOptions;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filter).length > 0) {
    andConditions.push({
      AND: Object.entries(filter).map(([field, value]) => {
        if (field === 'minPrice') {
          return {
            price: {
              gte: value,
            },
          };
        }
        if (field === 'maxPrice') {
          return {
            price: {
              lte: value,
            },
          };
        }
        if (field === 'category') {
          return {
            categoryId: {
              equals: value,
            },
          };
        }
      }),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions as Prisma.BookWhereInput,
    include: {
      category: true,
    },
    take: size,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.book.count({
    where: whereConditions as Prisma.BookWhereInput,
  });
  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  paginationFields: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationFields);

  const isCategoryExists = await checkCategoryExistency(categoryId);

  if (!isCategoryExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid category id');
  }

  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
    },
    take: size,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.book.count({
    where: {
      categoryId,
    },
  });

  const totalPage = Math.ceil(total / size);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid book id');
  }
  return result;
};

const updateSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const isExists = await checkBookExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid book id');
  }
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteSingleBook = async (id: string): Promise<Book | null> => {
  const isExists = await checkBookExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid book id');
  }
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
