'use client';

import React, {ReactNode, Suspense, useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {ArcherContainer} from "react-archer";
import {parser} from "@/utills/parser/parser";
import Loader from "@/components/Loader/loader";
import {fetchTopicByParams} from "@/services/module/modulesService";
import {HttpException} from "@/utills/exceptions";
import {TopicDetailResponse} from "@/services/module/types";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import {message} from "antd";

const Page = () => {
    return (
        <div className="mt-10 w-full max-w-[1200px] min-w-80 mx-auto flex flex-col gap-6 sm:px-8 px-0">
            <Suspense fallback={<Loader/>}>
                <ShowModule/>
            </Suspense>
        </div>
    );
};

const NavigationButton = ({
                              direction,
                              title,
                              subtitle,
                              onClick,
                              disabled,
                              passed,
                          }: {
    direction: 'prev' | 'next';
    title: string;
    subtitle: string;
    onClick: () => void;
    disabled: boolean;
    passed: boolean;
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-between gap-4 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 h-24 max-w-80  ${
                disabled
                    ? 'border border-dashed border-[#91898C] text-[#91898C] cursor-not-allowed'
                    : `${direction == 'prev' ? "text-white text-opacity-80  border-2 border-dashed border-[#3A3A3A] bg-[#212121]"
                        : "bg-[#094319] text-white  border border-dashed border-[#3DBA60]"}`
            }`

            }
        >
            {direction === 'prev' && (
                <span className="text-2xl"><ArrowLeftOutlined/></span>
            )}
            <div className="flex flex-col text-left">
                <h4 className={`text-xl font-bold line-clamp-1 ${direction == 'prev' ? 'text-opacity-80' : ''}`}>{title || 'No topic'}</h4>
                <p className={`text-sm text-gray-400 line-clamp-1 ${direction == 'prev' ? 'text-opacity-80' : ''}`}>
                    {subtitle}
                </p>
                {passed && <span className="text-green-400">(Passed)</span>}
            </div>
            {direction === 'next' && (
                <span className="text-2xl"><ArrowRightOutlined/></span>
            )}
        </button>
    );
};

const ShowModule = () => {
    const router = useRouter();
    const [topicContent, setTopicContent] = useState<ReactNode | null>(null);
    const [topicResponse, setTopicResponse] = useState<TopicDetailResponse | null>(null);
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);

    const module = searchParams?.get("module") ?? 0;
    const topic = searchParams?.get("topic") ?? 0;

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true)
                const response = await fetchTopicByParams(module as string, topic as string, "RU")
                setTopicContent(parser(response.content));
                setTopicResponse(response)
            } catch (error) {
                if (error instanceof HttpException) {
                    console.log(error);
                    router.push(`/error?status=${error.status}&message=${error.message}`);
                }
            } finally {
                setLoading(false)
            }
        };

        fetchContent();
    }, [module, topic]);

    const handlePrevious = () => {
        const module = topicResponse?.prev?.moduleNumber;
        const topic = topicResponse?.prev?.topicNumber;

        if (!module || !topic) {
            message.error("No available topic")
        } else {
            router.push(`?module=${module - 1}&topic=${topic - 1}`);
        }
    };

    const handleNext = () => {
        const module = topicResponse?.next?.moduleNumber;
        const topic = topicResponse?.next?.topicNumber;

        if (!module || !topic) {
            message.error("No available topic")
        } else {
            router.push(`?module=${module - 1}&topic=${topic - 1}`);
        }
    };

    if (loading)
        return <Loader/>

    return (
        <div className={'mb-32'}>
            <ArcherContainer strokeColor="white" strokeWidth={2} endMarker={false}>
                {topicContent}
            </ArcherContainer>
            <div className="flex justify-between items-center mt-8 flex-wrap">
                <NavigationButton
                    direction="prev"
                    title={topicResponse?.prev?.topicName || 'No previous topic'}
                    subtitle={topicResponse?.prev?.moduleName || ''}
                    onClick={handlePrevious}
                    disabled={!topicResponse?.prev}
                    passed={topicResponse?.prev?.passed || false}
                />
                <NavigationButton
                    direction="next"
                    title={topicResponse?.next?.topicName || 'No next topic'}
                    subtitle={topicResponse?.next?.moduleName || ''}
                    onClick={handleNext}
                    disabled={!topicResponse?.next}
                    passed={topicResponse?.next?.passed || false}
                />
            </div>
        </div>
    );
};

export default Page;
