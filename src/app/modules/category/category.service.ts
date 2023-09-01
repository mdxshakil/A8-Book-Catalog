import { Category } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { checkCategoryExistency } from './category.utils';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();
  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
  }
  return result;
};

const updateSingleCategory = async (
  id: string,
  payload: Category
): Promise<Category | null> => {
  const isExists = await checkCategoryExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
  }
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSingleCategory = async (id: string): Promise<Category | null> => {
  const isExists = await checkCategoryExistency(id);
  if (!isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');
  }
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
