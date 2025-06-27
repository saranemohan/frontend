import { z } from 'zod';

export const productSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    price: z.coerce.number().positive('Price must be greater than 0'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().optional(),
    manufacture: z.string().optional(),
    color: z.string().optional(),
    size: z.string().optional(),
    quantity: z.string().optional(),
    expiry: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
