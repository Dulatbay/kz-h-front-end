'use client'

import {useEffect, useState} from 'react';
import {ModuleDetailResponse} from "@/services/module/types";
import {fetchModuleByNumber} from "@/services/module/modulesService";
import {useParams,} from "next/navigation";
import Loader from "@/components/Loader/loader";
import Link from "next/link";
import {useTranslation} from 'react-i18next';
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import LevelButton from "@/components/LevelButton/level-button";
import Head from "@/components/ModuleHeader/module-head";

export default function ModuleDetail() {
    const number = useParams().number;

    const [moduleData, setModuleData] = useState<ModuleDetailResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        if (!number) return;
        const loadModule = async () => {
            try {
                const data: ModuleDetailResponse = await fetchModuleByNumber(number as string);
                setModuleData(data);
            } catch (err) {
                setError('Ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        loadModule();
    }, [number]);

    if (loading) return <div className={"max-w-[900px] mx-auto flex justify-center mt-16"}><Loader/></div>
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col w-full max-w-[480px] mx-auto">
            {moduleData && (
                <>
                    <Head
                        active={moduleData.active}
                        topic={moduleData.name}
                        number={moduleData.number}
                        text={t('module-page.module')}
                    />
                    <div className="flex flex-col gap-3 py-3">
                        {Array.from({length: moduleData.topicsCount}).map((_, index) => {
                            const isActive = index < moduleData.firstActive;
                            let colClass;
                            if (index % 4 === 0) {
                                colClass = 'col-start-3';
                            } else if (index % 8 === 1 || index % 8 === 3) {
                                colClass = 'col-start-2';
                            } else if (index % 8 === 2) {
                                colClass = 'col-start-1';
                            } else if (index % 8 === 5 || index % 8 === 7) {
                                colClass = 'col-start-4';
                            } else {
                                colClass = 'col-start-5';
                            }

                            return (
                                <div
                                    key={`floor-${index}`}
                                    className="w-full grid grid-cols-5 pl-2 pr-8"
                                >
                                    <div className={colClass}>
                                        <LevelButton
                                            current={index + 1 == moduleData?.currentActiveTopicNumber}
                                            topicNumber={index}
                                            moduleNumber={moduleData.number - 1}
                                            active={isActive || index + 1 == moduleData.currentActiveTopicNumber}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {
                        (moduleData.active && moduleData.topicsCount == moduleData.firstActive) ?
                            (<div
                                className={"bg-[#2CBB5D] w-full rounded-3xl p-4 flex flex-col justify-center mt-32 mb-8 min-h-20 cursor-pointer"}>
                                <Link className="text-xl sm:text-xl text-center"
                                      href={`/learn/${moduleData.number + 1}`}>{t('module-page.goToNextModule')}</Link>
                            </div>) : (
                                <div
                                    className={"bg-[#282828] w-full rounded-3xl p-8 flex flex-col justify-center mt-32 mb-8 cursor-not-allowed"}>
                                    <h3 className="text-xl sm:text-xl text-center">
                                        {t('module-page.notFinishedAlert')}
                                    </h3>
                                </div>
                            )
                    }

                </>
            )}
        </div>
    );
}