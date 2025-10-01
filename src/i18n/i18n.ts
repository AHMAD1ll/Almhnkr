import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import ar from './locales/ar.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: I18nManager.isRTL ? 'ar' : 'en', // Set language based on device's RTL status
    fallbackLng: 'en',
    compatibilityJSON: 'v3', // Important for react-native
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
