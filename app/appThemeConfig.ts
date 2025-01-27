import {theme} from "antd";

export const appThemeConfig = {
    token: {
        colorLink: '#D9D9D9',
        colorText: '#D9D9D9',     // Текст по умолчанию
        colorPrimary: '#1e90ff', // Основной цвет (например, для кнопок)
    },
    algorithm: theme.defaultAlgorithm,
    components: {
        Layout: {
            siderBg: '#282828',
            colorBgBody: '#1A1A1A'
        },
        Menu: {
            darkItemBg: '#282828',
        },
    }
}