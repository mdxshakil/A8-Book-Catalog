import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .refine(price => price >= 0, {
        message: 'Price can not be negative',
      }),
    publicationDate: z.string({
      required_error: 'Publication date is required',
    }),
    categoryId: z.string({
      required_error: 'Category is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    price: z.number().optional(),
  }),
});

export const BookValidation = {
  create,
  update,
};
