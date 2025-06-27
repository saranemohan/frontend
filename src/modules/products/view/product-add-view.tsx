"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ProductInput, productSchema } from "../validation/productSchema";
import { createProduct } from "../services/productService";

const initialForm: ProductInput = {
    title: '',
    price: 0,
    description: '',
    category: "11",
    manufacture: "12",
    color: "13",
    size: "14",
    quantity: "15",
    expiry: "2026-01-02"
};

/**
* 
*/
export default function ProductAddView() {

    const [formData, setFormData] = useState<ProductInput>(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setErrors({});
        setLoading(true);

        const validation = productSchema.safeParse(formData);

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
            const created = await createProduct(validation.data);
            setMessage(`✅ Product "${created.title}" added successfully.`);
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
                        <DialogTitle>Add Product</DialogTitle>
                    </DialogHeader>

                    <Label>Title</Label>
                    <Input type="text" name="title" value={formData.title} onChange={handleChange} />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}

                    <Label>Price</Label>
                    <Input type="text" name="price" value={formData.price} onChange={handleChange} />
                    {errors.price && <p className="text-red-500">{errors.price}</p>}

                    <Label>Description</Label>
                    <Input type="text" name="description" value={formData.description} onChange={handleChange} />
                    {errors.description && <p className="text-red-500">{errors.description}</p>}

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