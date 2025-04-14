'use client'

import React from 'react';
import {Layout} from 'antd';
import {motion} from 'framer-motion';
import {
    FadeInUp,
    FadeInLeft,
    FadeInRight,
    ZoomInContainer,
    FadeInContainer
} from '@/utills/animations';
import Header from "@/components/Header/header";
import Link from "next/link";
import {getImageUrl} from "@/utills/getHistoryData";
import {useTranslation} from "react-i18next";

const {Content} = Layout;

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className={'overflow-x-hidden bg-black'}>
            <Header/>
            <Content className={'flex flex-col md:gap-0 gap-32'}>
                {/* ---------- 0) БАСТЫ БӨЛІМ ---------- */}
                <section
                    id="hero"
                    className="h-screen w-full flex flex-col items-center justify-center text-white px-4 text-center bg-[#000]">
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
                            {t('welcome-page.hero.titleLine1')}<br/>
                            <span className="text-yellow-400">
                        {t('welcome-page.hero.titleLine2')}
                    </span>
                        </motion.h1>
                        <motion.h2
                            className="text-xl md:text-2xl mb-6 text-gray-200"
                            variants={FadeInUp}
                        >
                            {t('welcome-page.hero.subtitle')}
                        </motion.h2>
                    </motion.div>
                </section>

                <section
                    id="what-is-kzh"
                    className="min-h-screen w-full flex flex-col items-center justify-center text-white px-4 text-center bg-[#000]"
                >
                    <motion.div
                        className="max-w-[1200px]"
                        initial="hidden"
                        whileInView="visible"
                        variants={ZoomInContainer}
                    >
                        <motion.h2 className="text-4xl font-bold mb-4" variants={FadeInUp}>
                            {t('welcome-page.whatIsKzh.title')}
                        </motion.h2>

                        <motion.h3
                            className="text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed text-[16px]"
                            variants={FadeInUp}
                        >
                            <strong>KZH</strong> – {t('welcome-page.whatIsKzh.description')}
                        </motion.h3>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
                            <motion.div className="md:w-1/2 bg-[#282828] rounded-lg p-4" variants={FadeInUp}>
                                <h3 className="text-xl font-semibold mb-2 flex items-left">
                                    <span className="mr-2">⚡</span> {t('welcome-page.whatIsKzh.card1Title')}
                                </h3>
                                <p className="text-gray-300 mt-4">{t('welcome-page.whatIsKzh.card1Text')}</p>
                            </motion.div>

                            <motion.div className="md:w-1/2 bg-[#282828] rounded-lg p-4" variants={FadeInUp}>
                                <h3 className="text-xl font-semibold mb-2 flex items-left text-left">
                                    <span className="mr-2">🌍</span> {t('welcome-page.whatIsKzh.card2Title')}
                                </h3>
                                <p className="text-gray-300 mt-4">{t('welcome-page.whatIsKzh.card2Text')}</p>
                            </motion.div>
                        </div>

                        <motion.p className="text-[20px] mt-8 max-w-2xl mx-auto leading-relaxed" variants={FadeInUp}>
                            {t('welcome-page.whatIsKzh.footerText')}
                            <span className="text-yellow-400">{t('welcome-page.whatIsKzh.footerHighlight')}</span>
                        </motion.p>
                    </motion.div>
                </section>


                <section
                    id="notes-section"
                    className="min-h-screen w-full flex flex-col justify-center items-center text-white px-4 bg-[#000]"
                >
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        variants={FadeInContainer}
                    >
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                {t('welcome-page.interactiveNotes.title')}
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                {t('welcome-page.interactiveNotes.description.part1')}
                                <strong>{t('welcome-page.interactiveNotes.description.highlight1')}</strong>,
                                <strong>{t('welcome-page.interactiveNotes.description.highlight2')}</strong> {t('welcome-page.interactiveNotes.description.part2')}
                            </motion.p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
                            <motion.img
                                src={getImageUrl('welcome-page/interactive.webp')}
                                alt={t('welcome-page.interactiveNotes.imageAlt')}
                                className="w-[450px] md:w-[500px] antialiased object-center object-cover rounded-md shadow-lg"
                                variants={FadeInRight}
                            />

                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInUp}>
                                    🎨 <span className="ml-2">{t('welcome-page.interactiveNotes.features.design')}</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInUp}>
                                    🧠 <span
                                    className="ml-2">{t('welcome-page.interactiveNotes.features.memoryAid')}</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInUp}>
                                    🔍 <span
                                    className="ml-2">{t('welcome-page.interactiveNotes.features.highlighting')}</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInUp}>
                                    ✍️ <span className="ml-2">{t('welcome-page.interactiveNotes.features.brief')}</span>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div className="mt-16 text-center" variants={FadeInUp}>
                            <p className="text-xl text-yellow-400 font-semibold">
                                {t('welcome-page.interactiveNotes.cta')}
                            </p>
                        </motion.div>
                    </motion.div>
                </section>


                {/* ---------- 3) ИНТЕРАКТИВТІ КАРТА ---------- */}
                <section
                    id="map-section"
                    className="min-h-screen w-full flex flex-col justify-center items-center text-white px-4 bg-[#000]">
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        variants={ZoomInContainer}
                    >
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                🗺 Қазақстан тарихының интерактивті картасы
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                Тарих - бұл тек мәтін емес. Өткенді бір шертумен көз алдыңызға елестетіңіз!
                            </motion.p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <motion.img
                                src={`${getImageUrl("welcome-page/map.webp")}`}
                                alt="Интерактивті карта"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    🏰 <span className="ml-2">Жылды таңдап, Қазақстанның шекаралары қалай өзгергенін қараңыз</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    📜 <span
                                    className="ml-2">Негізгі тарихи оқиғалар мен мәдени орталықтарды зерттеңіз</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    🔍 <span className="ml-2">Елдің дамуы туралы көрнекі түсінік алыңыз</span>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div className="mt-16 text-center" variants={FadeInUp}>
                            <p className="text-xl text-yellow-400 font-semibold">
                                🌍 Уақытпен саяхаттаңыз: Қазақстан тарихын интерактивті картадан үйреніңіз!
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ---------- 4) ҰБТ-ҒА ДАЙЫНДЫҚ ---------- */}
                <section
                    id="ent-section"
                    className="min-h-screen w-full flex flex-col justify-center items-center text-white px-4 bg-[#000]">
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        variants={FadeInContainer}
                    >
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInLeft}>
                                🎓 ҰБТ-ға дайындық - емтиханды сенімді тапсырыңыз!
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInRight}>
                                Қазақстан тарихы - ҰБТ-дағы міндетті пән, ал біз дайындықты мүмкіндігінше ыңғайлы еттік:
                            </motion.p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <motion.img
                                src={`${getImageUrl("welcome-page/ent.webp")}`}
                                alt="ҰБТ-ға дайындық"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    ✅ <span className="ml-2">Тақырыптар жүйелі - тек қажетті ақпарат</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    ✅ <span className="ml-2">Шынайы жаттығу тесттері мен сұрақтар</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    ✅ <span className="ml-2">Прогресті бақылауға арналған жеке кабинет</span>
                                </motion.div>
                            </div>
                        </div>

                        <motion.p className="text-xl text-yellow-400 font-semibold mt-8 text-center"
                                  variants={FadeInUp}>
                            🎯 Оқыңыз. Жаттығыңыз. Дайын болыңыз!
                        </motion.p>
                    </motion.div>
                </section>

                {/* ---------- 5) ОЙЫН ФОРМАТЫНДА ОҚУ ---------- */}
                <section
                    id="gamification-section"
                    className="min-h-screen w-full flex flex-col justify-center items-center text-white px-4 bg-[#000]">
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        variants={FadeInContainer}
                    >
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                🎮 Ойын форматында оқу
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                Оқу қызықсыз болуы керек емес - бізде процессті қызықты ету үшін барлығы бар:
                            </motion.p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInLeft}>
                                    🏆 <span className="ml-2">Лидерлер кестесі мен рейтингтер - достармен және басқа пайдаланушылармен бәсекелесіңіз</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInLeft}>
                                    🎯 <span
                                    className="ml-2">Жетістіктер жүйесі - табыстар үшін марапаттар жинаңыз</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInLeft}>
                                    📊 <span className="ml-2">Білімнің өсуін бақылау - прогресіңізді нақты уақытта бақылаңыз</span>
                                </motion.div>
                            </div>

                            <motion.img
                                src={`${getImageUrl("welcome-page/game.webp")}`}
                                alt="Ойын форматында оқу"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInRight}
                            />
                        </div>

                        <motion.p className="text-xl text-yellow-400 font-semibold mt-8 text-center"
                                  variants={FadeInUp}>
                            🚀 Оқыңыз, жаңа деңгейлерге жетіңіз және үздік болыңыз!
                        </motion.p>
                    </motion.div>
                </section>

                {/* ---------- 6) МОБИЛЬДІ ҚОСЫМША ---------- */}
                <section
                    id="mobile-section"
                    className="min-h-screen w-full flex flex-col justify-center items-center text-white px-4 bg-[#000]">
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        variants={FadeInContainer}
                    >
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInLeft}>
                                📲 Мобильді қосымша - қалаған жерде оқыңыз
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInRight}>
                                Сұрақтарды скроллау форматы - әлеуметтік желілер лентасы сияқты, ыңғайлы және жылдам.
                            </motion.p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <motion.img
                                src={`${getImageUrl("welcome-page/mobile.webp")}`}
                                alt="Мобильді қосымша KZH"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    📌 <span
                                    className="ml-2">Кез келген уақытта қол жетімді - үйде, жолда, ұйқы алдында</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInRight}>
                                    📌 <span className="ml-2">Веб-нұсқамен синхрондау - телефонда бастап, компьютерде жалғастырыңыз</span>
                                </motion.div>
                            </div>
                        </div>

                        <motion.p className="text-xl text-yellow-400 font-semibold mt-8 text-center"
                                  variants={FadeInUp}>
                            💡 Тарих енді әрдайым қолыңызда!
                        </motion.p>
                    </motion.div>
                </section>

                {/* ---------- 7) ҚАЗАҚСТАН ТАРИХЫ БАРЛЫҒЫ ҮШІН ---------- */}
                <section
                    id="global-section"
                    className="min-h-screen w-full flex flex-col justify-center items-center text-white px-4 bg-[#000]">
                    <motion.div
                        className="max-w-5xl w-full"
                        initial="hidden"
                        whileInView="visible"
                        variants={FadeInContainer}
                    >
                        <motion.div className="text-center mb-8">
                            <motion.h2 className="text-4xl font-bold mb-2" variants={FadeInUp}>
                                🌍 Қазақстан тарихы барлығы үшін
                            </motion.h2>
                            <motion.p className="text-gray-300 text-lg" variants={FadeInUp}>
                                Қазақстан тарихы - бұл тек біз үшін емес, бүкіл әлем үшін.
                                Біздің сайттағы <strong>интернационализация</strong> арқылы,
                                әр түрлі елдердегі адамдар тарихты үйрене алады.
                            </motion.p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <motion.img
                                src={`${getImageUrl("welcome-page/everyone.webp")}`}
                                alt="Қазақстан тарихының интернационализациясы"
                                className="w-[450px] md:w-[500px] rounded-md shadow-lg"
                                variants={FadeInLeft}
                            />

                            <div className="flex flex-col gap-4 w-full md:max-w-lg">
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInUp}>
                                    📌 <span className="ml-2">Қазақстан тарихын әр түрлі тілдерде үйреніңіз</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInUp}>
                                    📌 <span className="ml-2">Халықаралық дереккөздер арқылы Қазақстан мәдениеті мен мұрасына үңіліңіз</span>
                                </motion.div>
                                <motion.div className="bg-[#282828] p-4 rounded-lg shadow-md flex items-center"
                                            variants={FadeInUp}>
                                    📌 <span className="ml-2">Әр түрлі елдерге бейімделген материалдар арқылы тарихты үйреніңіз</span>
                                </motion.div>
                            </div>
                        </div>
                        <motion.div className="mt-8 text-center" variants={FadeInUp}>
                            <p className="text-xl text-yellow-400 font-semibold">
                                🌐 Қазақстан тарихын бүкіл әлемге ашамыз!
                            </p>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ---------- 8) ҚОСЫЛУ ҮШІН СЕКЦИЯСЫ ---------- */}
                <section
                    id="cta-section"
                    className="h-screen w-full flex flex-col items-center justify-center text-white px-4 text-center bg-[#000]">
                    <motion.div
                        className="max-w-3xl"
                        initial="hidden"
                        whileInView="visible"
                        variants={FadeInContainer}
                    >
                        <motion.h2 className="text-4xl md:text-5xl font-bold mb-4" variants={FadeInUp}>
                            🚀 Қазірден KZH-ға қосылыңыз!
                        </motion.h2>
                        <motion.p className="text-lg md:text-xl mb-6 text-gray-300 leading-relaxed" variants={FadeInUp}>
                            Қазақстан тарихына саяхатыңызды дәл қазір бастаңыз:
                            бізбен бірге оқыңыз, зерттеңіз, ойнаңыз және дамыңыз!
                        </motion.p>
                        <motion.div className="mt-16 text-center" variants={FadeInUp}>
                            <p className="text-xl text-yellow-400 font-semibold">
                                💎 Тарих - бұл өткен емес. Бұл біздің бүгін түсінгеніміз.
                            </p>
                        </motion.div>
                        <motion.div className="mt-8" variants={FadeInUp}>
                            <Link
                                className="mx-2 border-2 border-yellow-400 text-yellow-400 rounded-lg px-12 py-4 font-semibold transition-all duration-700 ease-in-out hover:bg-yellow-400 hover:text-white text-xl"
                                href="/learn"
                            >
                                Тарихты үйрену!
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>
            </Content>
        </div>
    );
};

export default HomePage;