export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface InvoiceItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  date: string;
  totalAmount: number;
  items: InvoiceItem[];
}
