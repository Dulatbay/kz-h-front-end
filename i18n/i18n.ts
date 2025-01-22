import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import PathLanguageDetector from './pathLanguageDetector'; // Импортируйте ваш собственный детектор
import {fallbackLng, languages} from '@/i18n/setting';

const languageDetector = new LanguageDetector();
languageDetector.addDetector(PathLanguageDetector);

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: fallbackLng,
        supportedLngs: languages,
        detection: {
            order: ['pathLanguageDetector', 'localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
