import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, List, Dialog, Portal, TextInput, FAB } from 'react-native-paper';
import Header from '../components/Header';
import { LocalStorageService } from '../services/LocalStorageService';
import { Product } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

const ProductListScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const { t } = useTranslation();

  const loadProducts = async () => {
    const loadedProducts = await LocalStorageService.getProducts();
    setProducts(loadedProducts);
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const showDialog = (product?: Product) => {
    if (product) {
      setCurrentProduct(product);
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
    } else {
      setCurrentProduct(null);
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
    }
    setIsDialogVisible(true);
  };

  const hideDialog = () => setIsDialogVisible(false);

  const handleSave = async () => {
    if (!name || !price || !stock) {
      Alert.alert(t('fillAllFields'));
      return;
    }
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedPrice) || isNaN(parsedStock)) {
      Alert.alert(t('priceAndStockNumbers'));
      return;
    }

    const updatedProducts = currentProduct
      ? products.map(p => p.id === currentProduct.id ? { ...p, name, description, price: parsedPrice, stock: parsedStock } : p)
      : [...products, { id: uuidv4(), name, description, price: parsedPrice, stock: parsedStock }];
        
    await LocalStorageService.saveProducts(updatedProducts);
    setProducts(updatedProducts);
    hideDialog();
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      t('delete'),
      t('areYouSureDeleteProduct'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            const updatedProducts = products.filter(p => p.id !== id);
            await LocalStorageService.saveProducts(updatedProducts);
            setProducts(updatedProducts);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title={t('products')} showBackButton />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>{t('noProductsFound')}</Text>}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`${t('productPrice')}: ${item.price} | ${t('productStock')}: ${item.stock}`}
            left={props => <List.Icon {...props} icon="package-variant" />}
            right={() => (
              <View style={styles.actions}>
                <Button onPress={() => showDialog(item)}>{t('editProduct')}</Button>
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
          <Dialog.Title>{currentProduct ? t('editProduct') : t('addProduct')}</Dialog.Title>
          <Dialog.Content>
            <TextInput label={t('productName')} value={name} onChangeText={setName} mode="outlined" style={styles.input} />
            <TextInput label={t('productDescription')} value={description} onChangeText={setDescription} mode="outlined" style={styles.input} />
            <TextInput label={t('productPrice')} value={price} onChangeText={setPrice} mode="outlined" keyboardType="numeric" style={styles.input} />
            <TextInput label={t('productStock')} value={stock} onChangeText={setStock} mode="outlined" keyboardType="numeric" style={styles.input} />
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

export default ProductListScreen;
