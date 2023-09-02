import { z } from 'zod';

const create = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object(
        {
          bookId: z.string({
            required_error: 'Book Id is required',
          }),
          quantity: z
            .number({
              required_error: 'Quantity is required',
            })
            .int(),
        },
        {
          required_error: 'Ordered book is required',
        }
      )
    ),
  }),
});

export const OrderValidation = {
  create,
};
