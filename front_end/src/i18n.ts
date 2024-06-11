import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from '@/assets/locales/en/translation.json';
import translationVI from '@/assets/locales/vi/translation.json';

const i18n = i18next.createInstance();
const fallbackLng = 'vi';
const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: fallbackLng,
    fallbackLng: fallbackLng,
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

export default i18n;
