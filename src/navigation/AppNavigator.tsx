import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CustomerListScreen from '../screens/CustomerListScreen';
import ProductListScreen from '../screens/ProductListScreen';
import InvoiceListScreen from '../screens/InvoiceListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Customers" component={CustomerListScreen} />
      <Stack.Screen name="Products" component={ProductListScreen} />
      <Stack.Screen name="Invoices" component={InvoiceListScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
