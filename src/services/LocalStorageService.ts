import AsyncStorage from '@react-native-async-storage/async-storage';
import { Customer, Product, Invoice } from '../types';

const CUSTOMERS_KEY = 'customers';
const PRODUCTS_KEY = 'products';
const INVOICES_KEY = 'invoices';

export const LocalStorageService = {
  // Customers
  getCustomers: async (): Promise<Customer[]> => {
    const customers = await AsyncStorage.getItem(CUSTOMERS_KEY);
    return customers ? JSON.parse(customers) : [];
  },
  saveCustomers: async (customers: Customer[]) => {
    await AsyncStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  },

  // Products
  getProducts: async (): Promise<Product[]> => {
    const products = await AsyncStorage.getItem(PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
  },
  saveProducts: async (products: Product[]) => {
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  // Invoices
  getInvoices: async (): Promise<Invoice[]> => {
    const invoices = await AsyncStorage.getItem(INVOICES_KEY);
    return invoices ? JSON.parse(invoices) : [];
  },
  saveInvoices: async (invoices: Invoice[]) => {
    await AsyncStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  },
};
