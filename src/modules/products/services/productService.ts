import { Product } from '../model/product';
import { ProductInput } from '../validation/productSchema';

const API_URL = 'https://api.example.com/products'; // External API

export async function createProduct(input: ProductInput): Promise<Product> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`, // if needed
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API error');
  }

  return await res.json();
}
