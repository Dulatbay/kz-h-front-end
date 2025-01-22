'use client';

import React, {ReactNode, Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {ArcherContainer} from "react-archer";
import {parser} from "@/utills/parser/parser";
import Loader from "@/components/Loader/loader";
import {fetchTopicByParams} from "@/services/module/modulesService";

const Page = () => {
    return (
        <div className="mt-10 w-full max-w-[1200px] min-w-80 mx-auto flex flex-col gap-6 sm:px-8 px-0">
            <Suspense fallback={<Loader/>}>
                <ShowModule/>
            </Suspense>
        </div>
    );
};

const ShowModule = () => {
    const [topicContent, setTopicContent] = useState<ReactNode | null>(null);
    const searchParams = useSearchParams();

    const module = searchParams?.get("module") ?? 0;
    const topic = searchParams?.get("topic") ?? 0;

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetchTopicByParams(module as string, topic as string, "RU")
                setTopicContent(parser(response));

            } catch (error) {
                console.error("Error fetching topic content:", error);
            }
        };

        fetchContent();
    }, [module, topic]);

    return (
        <div>
            <ArcherContainer strokeColor="white" strokeWidth={2} endMarker={false}>
                {topicContent}
            </ArcherContainer>
        </div>
    );
};

export default Page;
