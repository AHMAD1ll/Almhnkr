import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Header title={t('dashboard')} />
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>{t('welcome')}</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Customers')}
          style={styles.button}
          icon="account-group"
        >
          {t('customers')}
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Products')}
          style={styles.button}
          icon="package-variant"
        >
          {t('products')}
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Invoices')}
          style={styles.button}
          icon="receipt"
        >
          {t('invoices')}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
});

export default HomeScreen;
