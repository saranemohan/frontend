"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { OrderInput, orderSchema } from "../validation/orderSchema";
import { createOrder } from "../services/orderService";

const initialForm: OrderInput = {
    security: '',
    transactionType: '',
    quantity: 0,
    orderValue: 0,
};

/**
* 
*/
export default function ProductAddView() {

    const [formData, setFormData] = useState<OrderInput>(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: (name === 'quantity' || name === 'orderValue') ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setErrors({});
        setLoading(true);

        const validation = orderSchema.safeParse(formData);

        if (!validation.success) {
            const fieldErrors: Record<string, string> = {};
            const flat = validation.error.flatten().fieldErrors;
            (Object.keys(flat) as Array<keyof typeof flat>).forEach((key) => {
                fieldErrors[key] = flat[key]?.[0] || 'Invalid';
            });
            setErrors(fieldErrors);
            setLoading(false);
            return;
        }

        try {
            const created = await createOrder(validation.data);
            setMessage(`✅ Order added successfully.`);
            setFormData(initialForm);
        } catch (err) {
            setMessage(`Error: ${(err as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>Add</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Order</DialogTitle>
                    </DialogHeader>

                    <Label>Security</Label>
                    <Input type="text" name="security" value={formData.security} onChange={handleChange} />
                    {errors.security && <p className="text-red-500">{errors.security}</p>}

                    <Label>Transaction Type</Label>
                    <Input type="text" name="transactionType" value={formData.transactionType} onChange={handleChange} />
                    {errors.transactionType && <p className="text-red-500">{errors.transactionType}</p>}

                    <Label>Order Value</Label>
                    <Input type="text" name="orderValue" value={formData.orderValue} onChange={handleChange} />
                    {errors.orderValue && <p className="text-red-500">{errors.orderValue}</p>}

                    <Label>Quantity</Label>
                    <Input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
                    {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}

                    <DialogFooter className="flex sm:flex-col">
                        <div className="flex flex-row justify-end">
                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? "Adding..." : "Confirm"}
                            </Button>
                        </div>
                        <div>
                            {message && <p className="mt-2 text-sm">{message}</p>}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}