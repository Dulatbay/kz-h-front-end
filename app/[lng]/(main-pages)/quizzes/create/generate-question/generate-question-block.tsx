import TopicDropdown from "@/app/[lng]/(main-pages)/quizzes/create/topic/topic-dropdown";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import ShowSelectedTopics from "@/app/[lng]/(main-pages)/quizzes/create/topic/show-selected-topics";
import ShowQuestions from "@/app/[lng]/(main-pages)/quizzes/create/generate-question/show-questions";
import {Select} from "antd";
import {useState} from "react";
import {addQuestion} from "@/app/store/slices/quiz-slice/slice";

export default function GenerateQuestionBlock() {
    const dispatch = useDispatch();
    const {moduleResponse} = useSelector((state: RootState) => state.quizOptions);
    const [selectedDuration, setSelectedDuration] = useState(15);

    const handleCreateQuestion = (questionId: string, question: string) => {
        dispatch(addQuestion({
            type: "GENERATE",
            question,
            questionId,
            durationInSeconds: selectedDuration,
            variants: []
        }));
    }

    return (
        <>
            <h1 className="text-[#91898C] mx-auto">Question generating</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                    <div className="flex flex-1 flex-col w-full">
                        <label className="text-sm text-gray-300">Duration</label>
                        <Select
                            value={selectedDuration}
                            onChange={(value) => setSelectedDuration(value)}
                            className="w-full"
                        >
                            <Select.Option value={-1}>NONE</Select.Option>
                            <Select.Option value={15}>15</Select.Option>
                            <Select.Option value={30}>30</Select.Option>
                            <Select.Option value={60}>60</Select.Option>
                            <Select.Option value={90}>90</Select.Option>
                            <Select.Option value={120}>120</Select.Option>
                        </Select>
                    </div>
                </div>
                <TopicDropdown modules={moduleResponse}/>
                <ShowSelectedTopics/>
                <ShowQuestions handleCreateQuestion={handleCreateQuestion}/>
            </div>
        </>
    );
}
