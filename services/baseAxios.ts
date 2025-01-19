import axios from 'axios';


const baseAxios = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "Accept-Language": 'KAZ'
    }
});

// function getAcceptLanguage() {
//     const lang = localStorage.getItem('acceptLanguage');
//     if (!lang) {
//         return 'kaz'
//     }
//     return lang;
// }

baseAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default baseAxios;
