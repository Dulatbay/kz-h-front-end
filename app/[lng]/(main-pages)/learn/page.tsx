'use client'

import {useEffect, useState} from "react";
import {fetchLastTopic, fetchModules} from "@/services/module/modulesService";
import {getImageUrl} from "@/utills/getHistoryData";
import {LastTopicResponse, ModuleResponse} from "@/services/module/types";
import '@/i18n/i18n';
import {useTranslation} from "react-i18next";
import Module from "@/components/Module/module";
import Link from "next/link";

export default function LearnPage() {
    return (
        <>
            <Head/>
            <Modules/>
        </>
    );
}

const Head = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [lastTopic, setLastTopic] = useState<LastTopicResponse | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const lastTopic = await fetchLastTopic();
            setLastTopic(lastTopic);
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="bg-[#252b32] h-80 flex justify-center items-center px-4">
                <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col gap-2 items-center">
                        <svg width="129" height="129" viewBox="0 0 129 129" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.0938 88.6875V36.2812C9.95544 36.2812 7.90471 37.1307 6.3927 38.6427C4.88069 40.1547 4.03125 42.2054 4.03125 44.3438V100.781C4.03125 102.92 4.88069 104.97 6.3927 106.482C7.90471 107.994 9.95544 108.844 12.0938 108.844H49.9069C42.3558 103.598 33.3819 100.785 24.1875 100.781C20.98 100.781 17.9039 99.5071 15.6359 97.2391C13.3679 94.9711 12.0938 91.895 12.0938 88.6875ZM116.906 36.2812V88.6875C116.906 91.895 115.632 94.9711 113.364 97.2391C111.096 99.5071 108.02 100.781 104.812 100.781C95.618 100.785 86.6442 103.598 79.0931 108.844H116.906C119.045 108.844 121.095 107.994 122.607 106.482C124.119 104.97 124.969 102.92 124.969 100.781V44.3438C124.969 42.2054 124.119 40.1547 122.607 38.6427C121.095 37.1307 119.045 36.2812 116.906 36.2812Z"
                                fill="#5046E5"/>
                            <path
                                d="M24.1875 20.1562C23.1183 20.1562 22.093 20.581 21.337 21.337C20.581 22.093 20.1562 23.1183 20.1562 24.1875V88.6875C20.1562 89.7567 20.581 90.782 21.337 91.538C22.093 92.294 23.1183 92.7188 24.1875 92.7188C36.3152 92.7314 48.0809 96.8522 57.5662 104.409L60.4688 106.747V20.8819C59.176 20.4125 57.8127 20.1672 56.4375 20.1562H24.1875ZM108.844 88.6875V24.1875C108.844 23.1183 108.419 22.093 107.663 21.337C106.907 20.581 105.882 20.1562 104.812 20.1562H72.5625C71.1873 20.1672 69.824 20.4125 68.5312 20.8819V106.747L71.4337 104.409C80.9191 96.8522 92.6848 92.7314 104.812 92.7188C105.882 92.7188 106.907 92.294 107.663 91.538C108.419 90.782 108.844 89.7567 108.844 88.6875Z"
                                fill="white"/>
                        </svg>
                        <h1 className="text-lg"><strong>KzH</strong> {t('learn-page.learning')}</h1>
                    </div>
                    <h4 className="text-base">{t('learn-page.description')}</h4>
                </div>
            </div>
            {
                (loading || !lastTopic) ? <SkeletonTopic/> :
                    <LastTopicCard lastTopic={lastTopic}/>
            }
        </>
    );
};

const SkeletonTopic = () => {
    return (
        <div className="h-80 w-full flex justify-center items-center relative px-4 z-10">
            <div className="h-20 w-full bg-[#252b32] absolute top-0 -z-10"></div>
            <div
                className="w-[480px] aspect-video relative flex flex-col justify-between p-6 cursor-pointer border-2 rounded-3xl border-gray-500 overflow-hidden animate-pulse bg-[#282828]">
                <div className="h-full w-full bg-gray-600 rounded-lg"></div>
                <div className="flex flex-col gap-2 mt-4">
                    <div className="w-3/4 h-6 bg-gray-600 rounded"></div>
                    <div className="w-1/2 h-5 bg-gray-600 rounded"></div>
                </div>
            </div>
        </div>
    );
};

const LastTopicCard = ({lastTopic}: { lastTopic: LastTopicResponse }) => (
    <div className="h-80 w-full flex justify-center items-center relative px-4 z-10">
        <div className="h-20 w-full bg-[#252b32] absolute top-0 -z-10"></div>
        <Link href={`/modules?module=${lastTopic.moduleNumber - 1}&topic=${lastTopic.topicNumber - 1}`}
              className="w-[480px] aspect-video relative flex flex-col justify-between p-6 cursor-pointer border-2 rounded-3xl border-gray-500 overflow-hidden">
            <img src={getImageUrl(lastTopic.imageUrl)}
                 className="w-full h-full inset-0 brightness-[40%] absolute aspect-video object-cover object-bottom -z-10"
                 alt={""}/>
            <h3 className="text-yellow-200 text-2xl ml-auto">
                {lastTopic.percent}%
            </h3>
            <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{lastTopic.topicName}</h2>
                <h3 className="text-sm text-gray-400">{lastTopic.moduleName}</h3>
            </div>
        </Link>
    </div>
);

function Modules() {
    const [modules, setModules] = useState<ModuleResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const {t} = useTranslation();

    useEffect(() => {
        const loadModules = async () => {
            try {
                const data: ModuleResponse[] = await fetchModules();
                setModules(data);
            } catch (err) {
                setError('Ошибка при загрузке модулей');
            } finally {
                setLoading(false);
            }
        };
        loadModules();
    }, []);

    if (loading || !modules) return <SkeletonModules/>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col w-full max-w-[900px] mx-auto gap-4 px-4 py-16">
            <h2 className="text-xl md:text-2xl">{t('learn-page.modules')}</h2>
            <div className="flex flex-col gap-10">
                {modules.map((module, i) => <Module module={module} key={i}/>)}
            </div>
        </div>
    );
}

const SkeletonModules = () => {
    const {t} = useTranslation();

    return <div className="max-w-[900px] mx-auto flex flex-col justify-center mt-16 gap-6">
        <h2 className="text-xl md:text-2xl">{t('learn-page.modules')}</h2>

        {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-96 bg-[#282828] animate-pulse rounded-lg"></div>
        ))}
    </div>
};
