import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, List, FAB } from 'react-native-paper';
import Header from '../components/Header';
import { LocalStorageService } from '../services/LocalStorageService';
import { Invoice, Customer } from '../types';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

const InvoiceListScreen: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { t } = useTranslation();

  const loadData = async () => {
    const [loadedInvoices, loadedCustomers] = await Promise.all([
      LocalStorageService.getInvoices(),
      LocalStorageService.getCustomers(),
    ]);
    setInvoices(loadedInvoices);
    setCustomers(loadedCustomers);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : t('unknownCustomer');
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t('delete'),
      t('areYouSureDeleteInvoice'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            const updatedInvoices = invoices.filter(i => i.id !== id);
            await LocalStorageService.saveInvoices(updatedInvoices);
            setInvoices(updatedInvoices);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('invoices')} showBackButton />
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>{t('noInvoicesFound')}</Text>}
        renderItem={({ item }) => (
          <List.Item
            title={`${t('invoiceNumber')} ${item.id.substring(0, 8)}`}
            description={`${t('invoiceTo')}: ${getCustomerName(item.customerId)}\n${t('date')}: ${item.date} | ${t('total')}: ${item.totalAmount.toFixed(2)}`}
            left={props => <List.Icon {...props} icon="receipt" />}
            right={() => <Button onPress={() => handleDelete(item.id)}>{t('delete')}</Button>}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // This should navigate to a new screen to create an invoice
          // For now, we'll just log it.
          console.log('Navigate to Create Invoice Screen');
          Alert.alert('Coming Soon', 'This will open the new invoice screen.');
        }}
        label={t('newInvoice')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
});

export default InvoiceListScreen;
