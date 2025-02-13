'use client';

import { useRouter, usePathname } from 'next/navigation';
import i18n from 'i18next';
import React from "react";

const LanguageSelector = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        // Меняем язык в i18next
        i18n.changeLanguage(newLang);

        // Обновляем URL: заменяем сегмент языка в начале пути
        // Допустим, поддерживаемые коды: en, ru, kaz
        const newPath = pathname.replace(/^\/(en|ru|kaz)/, `/${newLang}`);

        // Если в пути язык отсутствует, можно добавить его в начало:
        // const newPath = pathname.match(/^\/(en|ru|kaz)/)
        //   ? pathname.replace(/^\/(en|ru|kaz)/, `/${newLang}`)
        //   : `/${newLang}${pathname}`;

        router.push(newPath);
    };

    return (
        <select
            className="bg-[#282828] text-white p-2 text-center"
            value={i18n.language}
            onChange={handleChange}
        >
            <option value="kaz">🇰🇿</option>
            <option value="ru">🇷🇺</option>
            <option value="en">🇺🇸</option>
        </select>
    );
};

export default LanguageSelector;
