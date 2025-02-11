import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import PathLanguageDetector from './pathLanguageDetector'; // Импортируйте ваш собственный детектор
import {fallbackLng, languages} from '@/i18n/setting';
import {TranslationTypes} from "@/i18n/locales/TranslationTypes";
import en from "./locales/en/translation.json";
import ru from "./locales/ru/translation.json";
import kaz from "./locales/kaz/translation.json";


const languageDetector = new LanguageDetector();
languageDetector.addDetector(PathLanguageDetector);

const resources: Record<string, { translation: TranslationTypes }> = {
    en: {translation: en},
    ru: {translation: ru},
    kaz: {translation: kaz},
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng,
        supportedLngs: languages,
        detection: {
            order: ['path', 'cookie', 'navigator'],
            caches: ['cookie'],
            lookupCookie: 'i18nextLng',
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
