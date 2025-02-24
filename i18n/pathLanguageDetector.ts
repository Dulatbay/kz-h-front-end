import {fallbackLng, languages} from "@/i18n/setting";

const PathLanguageDetector = {
    name: 'pathLanguageDetector',
    lookup() {
        if (typeof window !== 'undefined') {
            const pathSegments = window.location.pathname.split('/');

            if (pathSegments.length >= 2) {
                const languageCode = pathSegments[1];
                if (languages.includes(languageCode)) {
                    return languageCode;
                }
            }

            console.log(navigator)
            const systemLanguage = navigator.language.split('-')[0];
            if (languages.includes(systemLanguage)) {
                return systemLanguage;
            }
        }
        return fallbackLng;
    },
};


export default PathLanguageDetector;
