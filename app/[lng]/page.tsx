'use client'

import React from 'react';
import {Layout, Button} from 'antd';
import {motion} from 'framer-motion';
import {
    FadeInUp,
    FadeInLeft,
    FadeInRight,
    ZoomInContainer,
    FadeInContainer
} from '@/utills/animations';
import Header from "@/components/Header/header";

const {Content} = Layout;

const HomePage: React.FC = () => {
    return (
        <Layout style={{backgroundColor: '#000'}}>
            <Header/>
            <Content className={'flex flex-col gap-64'}>
                {/* ---------- 0) HERO SECTION ---------- */}
                <section
                    id="hero"
                    className="
            h-screen w-full
            flex flex-col items-center justify-center
            text-white
            px-4 text-center
            bg-[#000]
          "
                >
                    <motion.div
                        className="max-w-3xl"
                        initial="hidden"
                        animate="visible"
                        variants={FadeInContainer}
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold mb-4"
                            variants={FadeInUp}
                        >
                            KZH – История Казахстана <br className="hidden md:block"/>
                            <span className="text-yellow-400">в Современном Формате</span>
                        </motion.h1>
                        <motion.h2
                            className="text-xl md:text-2xl mb-6 text-gray-200"
                            variants={FadeInUp}
                        >
                            Учите историю легко, интересно и доступно!
                        </motion.h2>
                    </motion.div>
                </section>

                {/* ---------- 1) ЧТО ТАКОЕ KZH? ---------- */}
                <section
                    id="what-is-kzh"
                    className="
    min-h-screen w-full
    flex flex-col items-center justify-center
    text-white
    px-4 text-center
    bg-[#000]
  "
                >
                    <motion.div
                        className="max-w-[1200px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={ZoomInContainer}
                    >
                        {/* Главный заголовок */}
                        <motion.h2 className="text-4xl font-bold mb-4" variants={FadeInUp}>
                            🏛 Что такое KZH?
                        </motion.h2>

                        {/* Описание KZH */}
                        <motion.h3
                            className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed text-[16px]"
                            variants={FadeInUp}
                        >
                            <strong>KZH</strong> – это интерактивная образовательная платформа,
                            которая делает изучение истории Казахстана простым, увлекательным и полезным.
                        </motion.h3>

                        {/* Два контейнера: слева (⚡), справа (🌍) */}
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
                            {/* Левый контейнер с молнией */}
                            <motion.div
                                className="md:w-1/2 bg-[#282828] rounded-lg p-4"
                                variants={FadeInUp}
                            >
                                <h3 className="text-xl font-semibold mb-2 flex items-left">
                                    <span className="mr-2">⚡</span> Готовитесь к ЕНТ?
                                </h3>
                                <p className="text-gray-300 mt-4">
                                    Мы поможем освоить материал быстро и эффективно!
                                </p>
                            </motion.div>

                            {/* Правый контейнер с землёй */}
                            <motion.div
                                className="md:w-1/2 bg-[#282828] rounded-lg p-4"
                                variants={FadeInUp}
                            >
                                <h3 className="text-xl font-semibold mb-2 flex items-left text-left">
                                    <span className="mr-2">🌍</span> Интересуетесь историей Казахстана?
                                </h3>
                                <p className="text-gray-300 mt-4">
                                    У нас всё <strong>чётко структурировано</strong> и удобно!
                                </p>
                            </motion.div>
                        </div>

                        {/* Второстепенный (secondary) текст внизу секции */}
                        <motion.p
                            className="text-[20px] mt-8 max-w-2xl mx-auto leading-relaxed"
                            variants={FadeInUp}
                        >
                            Изучайте историю так, как вам удобно:
                            <span className={"text-yellow-400"}> через игру, тесты, интерактивные карты и мобильное приложение!</span>
                        </motion.p>
                    </motion.div>
                </section>

                {/* ---------- 2) ИНТЕРАКТИВНЫЕ КОНСПЕКТЫ ---------- */}
                <section
                    id="notes-section"
                    className="
    min-h-screen w-full
    flex flex-col justify-center items-center
    text-white px-4 bg-[#000]
  "
                >
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={FadeInContainer}
                    >
                        {/* Заголовок и описание - в самом верху */}
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                📜 Интерактивные конспекты
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                Забудьте про скучные учебники! Наши конспекты оформлены <strong>стильно</strong>,
                                <strong>интерактивны</strong> и помогают лучше запоминать материал.
                            </motion.p>
                        </motion.div>

                        {/* Контейнер с изображением и текстовыми блоками */}
                        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
                            {/* Правая сторона - изображение конспекта */}
                            <motion.img
                                src="/images/interactive-notes.png"
                                alt="Интерактивные конспекты"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInRight}
                            />

                            {/* Левая сторона - список преимуществ */}
                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInUp}
                                >
                                    🎨 <span className="ml-2">Современный дизайн с понятной структурой и удобной навигацией</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInUp}
                                >
                                    🧠 <span className="ml-2">Эмодзи, цвета и иконки помогают ассоциативной памяти</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInUp}
                                >
                                    🔍 <span className="ml-2">Ключевая информация выделена – важные даты и события сразу в фокусе</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInUp}
                                >
                                    ✍️ <span
                                    className="ml-2">Конспекты компактные, но информативные – легко запомнить</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Финальный текст 🎯 в контейнере */}
                        <motion.div
                            className="mt-16 text-center"
                            variants={FadeInUp}
                        >
                            <p className="text-xl text-yellow-400 font-semibold">
                                🎯 Учите историю быстро, понятно и с удовольствием!
                            </p>
                        </motion.div>
                    </motion.div>
                </section>


                {/* ---------- 3) ИНТЕРАКТИВНАЯ КАРТА ---------- */}
                <section
                    id="map-section"
                    className="
    min-h-screen w-full
    flex flex-col justify-center items-center
    text-white px-4 bg-[#000]
  "
                >
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={ZoomInContainer}
                    >
                        {/* Заголовок и описание - в самом верху */}
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                🗺 Интерактивная карта истории Казахстана
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                История — это не просто текст. Визуализируйте прошлое в один клик!
                            </motion.p>
                        </motion.div>

                        {/* Контейнер с картой и текстовыми блоками */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Левая сторона - изображение карты */}
                            <motion.img
                                src="/images/map-preview.png"
                                alt="Интерактивная карта"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            {/* Правая сторона - контейнеры с текстом */}
                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    🏰 <span
                                    className="ml-2">Выбирайте год и смотрите, как менялись границы Казахстана</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    📜 <span className="ml-2">Исследуйте ключевые исторические события и культурные центры</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    🔍 <span className="ml-2">Получайте наглядное представление о развитии страны</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Финальный текст 🗺 в контейнере */}
                        <motion.div
                            className="mt-16 text-center"
                            variants={FadeInUp}
                        >
                            <p className="text-xl text-yellow-400 font-semibold">
                                🌍 Путешествуйте во времени: изучайте историю Казахстана на интерактивной карте!
                            </p>
                        </motion.div>
                    </motion.div>
                </section>


                {/* ---------- 4) ПОДГОТОВКА К ЕНТ ---------- */}
                <section
                    id="ent-section"
                    className="
    min-h-screen w-full
    flex flex-col justify-center items-center
    text-white px-4 bg-[#000]
  "
                >
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={FadeInContainer}
                    >
                        {/* Заголовок и описание - в самом верху */}
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInLeft}>
                                🎓 Подготовка к ЕНТ – сдайте экзамен уверенно!
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInRight}>
                                История Казахстана — обязательный предмет на ЕНТ, а мы сделали подготовку максимально
                                удобной:
                            </motion.p>
                        </motion.div>

                        {/* Контейнер с изображением и текстовыми блоками */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Левая сторона - изображение */}
                            <motion.img
                                src="/images/ent-prep.jpg"
                                alt="Подготовка к ЕНТ"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            {/* Правая сторона - список с ✅ */}
                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    ✅ <span
                                    className="ml-2">Чётко структурированные темы – только нужная информация</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    ✅ <span className="ml-2">Реалистичные тренировочные тесты и вопросы</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    ✅ <span className="ml-2">Личный кабинет для отслеживания прогресса</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Финальный текст 🎯 в самом низу */}
                        <motion.p
                            className="text-xl text-yellow-400 font-semibold mt-8 text-center"
                            variants={FadeInUp}
                        >
                            🎯 Учите. Практикуйтесь. Будьте готовы!
                        </motion.p>
                    </motion.div>
                </section>
                {/* ---------- 5) ГЕЙМИФИКАЦИЯ ---------- */}
                <section
                    id="gamification-section"
                    className="
    min-h-screen w-full
    flex flex-col justify-center items-center
    text-white px-4 bg-[#000]
  "
                >
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={FadeInContainer}
                    >
                        {/* Заголовок и описание - в самом верху */}
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                🎮 Учёба в формате игры
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                Обучение не должно быть скучным – у нас есть всё, чтобы сделать процесс увлекательным:
                            </motion.p>
                        </motion.div>

                        {/* Контейнер с текстом и изображением */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Левая сторона - текстовые контейнеры */}
                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInLeft}
                                >
                                    🏆 <span className="ml-2">Лидерборды и рейтинги – соревнуйтесь с друзьями и другими пользователями</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInLeft}
                                >
                                    🎯 <span className="ml-2">Система достижений – зарабатывайте награды за успехи</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInLeft}
                                >
                                    📊 <span className="ml-2">Отслеживание роста знаний – наблюдайте за своим прогрессом в реальном времени</span>
                                </motion.div>
                            </div>

                            {/* Правая сторона - изображение */}
                            <motion.img
                                src="/images/gamification.jpg"
                                alt="Геймификация"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInRight}
                            />
                        </div>

                        {/* Финальный текст 🚀 в самом низу */}
                        <motion.p
                            className="text-xl text-yellow-400 font-semibold mt-8 text-center"
                            variants={FadeInUp}
                        >
                            🚀 Учитесь, достигайте новых уровней и становитесь лучшими!
                        </motion.p>
                    </motion.div>
                </section>

                {/* ---------- 6) МОБИЛЬНОЕ ПРИЛОЖЕНИЕ ---------- */}
                <section
                    id="mobile-section"
                    className="
    min-h-screen w-full
    flex flex-col justify-center items-center
    text-white px-4 bg-[#000]
  "
                >
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={FadeInContainer}
                    >
                        {/* Заголовок и описание - в самом верху */}
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInLeft}>
                                📲 Мобильное приложение – учитесь где угодно
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInRight}>
                                Формат скроллинга вопросов – как лента соцсетей, удобно и быстро.
                            </motion.p>
                        </motion.div>

                        {/* Контейнер с изображением и текстовыми блоками */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Левая сторона - изображение */}
                            <motion.img
                                src="/images/mobile-app.png"
                                alt="Мобильное приложение KZH"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            {/* Правая сторона - текстовые контейнеры */}
                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    📌 <span className="ml-2">Доступ в любое время – дома, в дороге, перед сном</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInRight}
                                >
                                    📌 <span className="ml-2">Синхронизация с веб-версией – начните на телефоне, продолжите на компьютере</span>
                                </motion.div>
                            </div>
                        </div>

                        {/* Финальный текст 💡 в самом низу */}
                        <motion.p
                            className="text-xl text-yellow-400 font-semibold mt-8 text-center"
                            variants={FadeInUp}
                        >
                            💡 История теперь всегда под рукой!
                        </motion.p>
                    </motion.div>
                </section>

                {/* ---------- 7) ИСТОРИЯ ДЛЯ ВСЕХ ---------- */}
                <section
                    id="global-section"
                    className="
    min-h-screen w-full
    flex flex-col justify-center items-center
    text-white px-4 bg-[#000]
  "
                >
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={FadeInContainer}
                    >
                        {/* Заголовок и описание - в самом верху */}
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                🌍 История Казахстана для всех
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                История Казахстана — это не только про нас, но и про весь мир.
                                Благодаря <strong>интернационализации</strong> на нашем сайте,
                                изучать историю могут люди из разных стран.
                            </motion.p>
                        </motion.div>

                        {/* Контейнер с изображением и текстовыми блоками */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Левая сторона - изображение */}
                            <motion.img
                                src="/images/global-history.png"
                                alt="Интернационализация истории Казахстана"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            {/* Правая сторона - текстовые контейнеры */}
                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInUp}
                                >
                                    📌 <span className="ml-2">Изучайте историю Казахстана на разных языках</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInUp}
                                >
                                    📌 <span className="ml-2">Погружайтесь в культуру и наследие Казахстана через международные источники</span>
                                </motion.div>

                                <motion.div
                                    className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                    variants={FadeInUp}
                                >
                                    📌 <span className="ml-2">Учите историю через адаптированные материалы для разных стран</span>
                                </motion.div>
                            </div>
                        </div>


                    </motion.div>
                </section>


                {/* ---------- 8) CTA SECTION ---------- */}
                <section
                    id="cta-section"
                    className="
            h-screen w-full
            flex flex-col items-center justify-center
            text-white
            px-4 text-center
            bg-[#000]
          "
                >
                    <motion.div
                        className="max-w-3xl"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        variants={FadeInContainer}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-4"
                            variants={FadeInUp}
                        >
                            🚀 Присоединяйтесь к KZH уже сейчас!
                        </motion.h2>
                        <motion.p
                            className="text-lg md:text-xl mb-6 text-gray-300 leading-relaxed"
                            variants={FadeInUp}
                        >
                            Начните свой путь в историю Казахстана прямо сегодня:
                            учите, исследуйте, играйте и развивайтесь вместе с нами!
                        </motion.p>
                        <motion.div
                            className="mt-16 text-center"
                            variants={FadeInUp}
                        >
                            <p className="text-xl text-yellow-400 font-semibold">
                                💎 История – это не прошлое. Это то, что мы понимаем сегодня.
                            </p>
                        </motion.div>
                        <motion.div className="mt-4" variants={FadeInUp}>
                            <button
                                className="mx-2 border-2 border-yellow-400 text-yellow-400
                                            rounded-lg px-12 py-4 font-semibold
                                            transition-all duration-700 ease-in-out
                                            hover:bg-yellow-400 hover:text-white
                                            text-xl
                                            "
                            >
                                Учить историю!
                            </button>

                        </motion.div>
                    </motion.div>
                </section>
            </Content>
        </Layout>
    );
};

export default HomePage;
