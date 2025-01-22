import {fallbackLng, languages} from "@/i18n/setting";

const PathLanguageDetector = {
    name: 'pathLanguageDetector',
    lookup() {
        if (typeof window !== 'undefined') {
            const pathSegments = window.location.pathname.split('/');
            const languageCode = pathSegments[1];
            console.log('Detected language code:', languageCode);
            if (languages.includes(languageCode)) {
                return languageCode;
            }
        }
        return fallbackLng;
    },
};


export default PathLanguageDetector;
