'use client'

import React, {useEffect} from 'react';
import {useSearchParams} from "next/navigation";
import {parser} from "@/app/utils/parser/parser";


const Page = () => {
    const [topicContent, setTopicContent] = React.useState<any>();
    const searchParams = useSearchParams();
    let module = searchParams.get("module") ?? 0;
    let topic = searchParams.get("topic") ?? 0;

    useEffect(() => {
        // fetch(`http://35.244.23.124:8080/api/modules/initializer-test/${module}/topics/${topic}`)
        //     .then(res => res.json())
        //     .then(data => setTopicContent(data))

        fetch(`http://localhost:8080/api/modules/initializer-test/${module}/topics/${topic}`)
            .then(res => res.json())
            .then(data => setTopicContent(data))

    }, [])

    if(!topicContent)
        return "loading...";

    return (
        <div className="mt-10 w-full max-w-[1200px] min-w-80 mx-auto flex flex-col gap-6 px-8">
            <h1>Module - {module}, topic - {topic}</h1>
            <div className={"content"}>
                {
                    parser(topicContent)
                }
            </div>
        </div>
    );
};

export default Page;