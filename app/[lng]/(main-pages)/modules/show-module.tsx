import {useRouter, useSearchParams} from "next/navigation";
import {TopicDetailResponse} from "@/services/module/types";
import {fetchTopicByParams} from "@/services/module/modulesService";
import {parser} from "@/utills/parser/parser";
import {HttpException} from "@/utills/exceptions";
import {message} from "antd";
import Loader from "@/components/Loader/loader";
import {ArcherContainer} from "react-archer";
import NavigationButton from "@/app/[lng]/(main-pages)/modules/navigation-button";
import {ReactNode, useEffect, useState} from "react";
import SubmitTopicButton from "@/app/[lng]/(main-pages)/modules/submit-topic-button";

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
                const response = await fetchTopicByParams(module as string, topic as string)
                setTopicContent(parser(response.content));
                setTopicResponse(response)
            } catch (error) {
                if (error instanceof HttpException) {
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

    const handleNext = async () => {
        const module = topicResponse?.next?.moduleNumber;
        const topic = topicResponse?.next?.topicNumber;

        if (!module || !topic) {
            message.error("No available topic")
            return;
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
            <div className="flex justify-center items-center mt-8 flex-wrap gap-16">
                <NavigationButton
                    direction="prev"
                    title={topicResponse?.prev?.topicName || 'No previous topic'}
                    subtitle={topicResponse?.prev?.moduleName || ''}
                    onClick={handlePrevious}
                    disabled={!topicResponse?.prev || (!topicResponse?.prev?.availableToPass && !topicResponse.prev?.passed)}
                    passed={topicResponse?.prev?.passed || false}
                    nextAvailable={topicResponse?.prev?.availableToPass || topicResponse?.prev?.passed}
                    nextPassed={topicResponse?.prev?.passed || false}
                />
                {
                    topicResponse?.current.availableToPass ?
                        <SubmitTopicButton moduleNumber={topicResponse.current.moduleNumber}
                                           topicNumber={topicResponse.current.topicNumber}
                                           onSubmitSuccess={handleNext}/> :
                        <NavigationButton
                            direction="next"
                            title={topicResponse?.next?.topicName || 'No next topic'}
                            subtitle={topicResponse?.next?.moduleName || ''}
                            onClick={handleNext}
                            disabled={!topicResponse?.next || (!topicResponse?.next?.availableToPass && !topicResponse.next?.passed)}
                            passed={topicResponse?.next?.passed || false}
                            nextAvailable={topicResponse?.next?.availableToPass || topicResponse?.next?.passed}
                            nextPassed={topicResponse?.next?.passed || false}
                        />
                }
            </div>
        </div>
    );
};


export default ShowModule;