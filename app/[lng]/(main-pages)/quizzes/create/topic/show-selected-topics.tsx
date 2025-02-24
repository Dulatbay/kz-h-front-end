import {setSelectedTopics} from "@/app/store/slices/quiz-slice/slice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";

export default function ShowSelectedTopics() {
    const {selectedTopics, moduleResponse} = useSelector((state: RootState) => state.quizOptions);
    const dispatch = useDispatch();

    return <>
        <div className={"flex flex-row gap-4 flex-wrap"}>
            {selectedTopics.map((topicId) => {
                let topicName = "";
                console.log(topicId);
                moduleResponse.forEach((module) => {
                    const found = module.topics.find((t) => t.topicId === topicId);
                    if (found) topicName = found.topicName;
                });
                return (
                    <div
                        key={topicId}
                        className={"bg-zinc-700 p-2 rounded cursor-pointer"}
                        onClick={() => {
                            dispatch(setSelectedTopics(selectedTopics.filter((id) => id !== topicId)));
                        }}
                    >
                        {topicName} ×
                    </div>
                );
            })}
        </div>
    </>
}