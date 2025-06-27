import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  description: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
