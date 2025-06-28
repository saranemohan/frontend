import { z } from 'zod';

export const orderSchema = z.object({
    security: z.string().min(1, 'Security is required'),
    transactionType: z.string().min(1, 'Transaction Type is required'),
    quantity: z.number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    }),
    orderValue: z.number({
        required_error: 'Order value is required',
        invalid_type_error: 'Order value must be a number',
    })
});

export type OrderInput = z.infer<typeof orderSchema>;
