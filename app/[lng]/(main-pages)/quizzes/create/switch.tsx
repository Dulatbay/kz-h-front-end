import {message} from "antd";
import {useState} from "react";
import CreateQuestionBlock from "@/app/[lng]/(main-pages)/quizzes/create/create-question-block";
import GenerateQuestionBlock from "@/app/[lng]/(main-pages)/quizzes/create/generate-question-block";

export default function Switch() {
    const [questionType, setQuestionType] = useState("create");

    const handleQuestionTypeChange = (e: any) => {
        const value = e.target.value;
        if (value === "generate") {
            message.info("This feature is not available yet");
            setQuestionType("create");
        } else {
            setQuestionType(value);
        }
    };

    return (
        <div className="w-full min-w-80 flex flex-col gap-2">
            {/* Для будущего можно раскомментировать радио-группу */}
            {/* <Radio.Group onChange={handleQuestionTypeChange} value={questionType}>
                <Radio value="create">Create question</Radio>
                <Radio value="generate" disabled>
                    Generate question
                </Radio>
            </Radio.Group> */}
            {questionType === "create" ? <CreateQuestionBlock/> : <GenerateQuestionBlock/>}
        </div>
    );
}
