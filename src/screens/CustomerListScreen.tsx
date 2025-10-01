import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, List, Dialog, Portal, TextInput, FAB } from 'react-native-paper';
import Header from '../components/Header';
import { LocalStorageService } from '../services/LocalStorageService';
import { Customer } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

const CustomerListScreen: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { t } = useTranslation();

  const loadCustomers = async () => {
    const loadedCustomers = await LocalStorageService.getCustomers();
    setCustomers(loadedCustomers);
  };

  useFocusEffect(
    useCallback(() => {
      loadCustomers();
    }, [])
  );

  const showDialog = (customer?: Customer) => {
    if (customer) {
      setCurrentCustomer(customer);
      setName(customer.name);
      setEmail(customer.email);
      setPhone(customer.phone);
      setAddress(customer.address);
    } else {
      setCurrentCustomer(null);
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    }
    setIsDialogVisible(true);
  };

  const hideDialog = () => setIsDialogVisible(false);

  const handleSave = async () => {
    if (!name) {
      Alert.alert(t('fillAllFields'));
      return;
    }

    const updatedCustomers = currentCustomer
      ? customers.map(c => c.id === currentCustomer.id ? { ...c, name, email, phone, address } : c)
      : [...customers, { id: uuidv4(), name, email, phone, address }];
        
    await LocalStorageService.saveCustomers(updatedCustomers);
    setCustomers(updatedCustomers);
    hideDialog();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t('delete'),
      t('areYouSureDeleteCustomer'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            const updatedCustomers = customers.filter(c => c.id !== id);
            await LocalStorageService.saveCustomers(updatedCustomers);
            setCustomers(updatedCustomers);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('customers')} showBackButton />
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>{t('noCustomersFound')}</Text>}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`${item.phone || ''} - ${item.email || ''}`}
            left={props => <List.Icon {...props} icon="account" />}
            right={() => (
              <View style={styles.actions}>
                <Button onPress={() => showDialog(item)}>{t('editCustomer')}</Button>
                <Button onPress={() => handleDelete(item.id)}>{t('delete')}</Button>
              </View>
            )}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => showDialog()}
      />
      <Portal>
        <Dialog visible={isDialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>{currentCustomer ? t('editCustomer') : t('addCustomer')}</Dialog.Title>
          <Dialog.Content>
            <TextInput label={t('customerName')} value={name} onChangeText={setName} mode="outlined" style={styles.input} />
            <TextInput label={t('customerEmail')} value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" style={styles.input} />
            <TextInput label={t('customerPhone')} value={phone} onChangeText={setPhone} mode="outlined" keyboardType="phone-pad" style={styles.input} />
            <TextInput label={t('customerAddress')} value={address} onChangeText={setAddress} mode="outlined" style={styles.input} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{t('cancel')}</Button>
            <Button onPress={handleSave}>{t('save')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
  input: { marginBottom: 10 },
  actions: { flexDirection: 'row', alignItems: 'center' },
});

export default CustomerListScreen;
