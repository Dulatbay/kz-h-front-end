'use client';

import React, {ReactNode, Suspense, useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import { ArcherContainer } from "react-archer";
import { parser } from "@/app/utils/parser/parser";

const Page = () => {
    return (
        <div className="mt-10 w-full max-w-[1200px] min-w-80 mx-auto flex flex-col gap-6 px-8">
            <Suspense>
                <ShowModule />
            </Suspense>
        </div>
    );
};

const ShowModule = () => {
    const [topicContent, setTopicContent] = useState<ReactNode | null>(null);
    const searchParams = useSearchParams();
    const [relationsReady, setRelationsReady] = useState(false);

    const module = searchParams?.get("module") ?? "0";
    const topic = searchParams?.get("topic") ?? "0";

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/modules/initializer-test/${module}/topics/${topic}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch content");
                }
                const data = await response.json();
                setTopicContent(parser(data));


            } catch (error) {
                console.error("Error fetching topic content:", error);
            }
        };

        fetchContent();
    }, [module, topic]);

    if (!topicContent) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>
                Module - {module}, Topic - {topic}
            </h1>
            <ArcherContainer strokeColor="white" strokeWidth={2} endMarker={false}>
                {topicContent}
            </ArcherContainer>
        </div>
    );
};

export default Page;
