import { Order } from '../model/order';
import { OrderInput } from '../validation/orderSchema';

const API_URL = 'http://localhost:6001/api/order/create'; // External API

export async function createOrder(input: OrderInput): Promise<Order> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWZjZGViZTJlNzcxNWEzOGNjYTAwZiIsImlkZW50aXR5Ijoicm92ZTRAdGVjaGZyaWFyLmNvbSIsImlhdCI6MTc1MTEwOTQ4OSwiZXhwIjoxNzUxMTYzNDg5fQ.jqHJ71qlHeOReYYxBlGXe2pJbe9MImxYLHQAwNhmERU`, // if needed
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API error');
  }

const json = await res.json();
return json.data;
}
