import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n/i18n'; // Import i18n configuration

// Define custom themes to fix placeholder colors
const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3498db', // A nice blue for dark mode
    onSurfaceVariant: '#B0B0B0', // Lighter placeholder/outline for dark mode
  },
};

const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007bff', // Your primary blue for light mode
    onSurfaceVariant: '#6c757d', // A visible gray for placeholder/outline in light mode
  },
};

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
