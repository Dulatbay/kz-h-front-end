import {useState} from "react";
import CreateQuestionBlock from "@/app/[lng]/(main-pages)/quizzes/create/create-question/create-question-block";
import GenerateQuestionBlock from "@/app/[lng]/(main-pages)/quizzes/create/generate-question/generate-question-block";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentType, setSelectedTopics} from "@/app/store/slices/quiz-slice/slice";
import {RootState} from "@/app/store/store";

export default function Switch() {
    const {currentType} = useSelector((state: RootState) => state.quizOptions);
    const dispatch = useDispatch();


    const handleQuestionTypeChange = (type: "GENERATE" | "CREATE") => {
        dispatch(setSelectedTopics([]));
        dispatch(setCurrentType(type));
    };

    return (
        <div className="w-full min-w-[320px] flex flex-col gap-2">
            <div className="flex w-full">
                <button
                    className={`flex-1 text-center py-2 text-white transition-colors duration-200 rounded-l-md  
            ${currentType === "CREATE" ? "bg-[#5B46F7]" : "bg-[#282828]"}`}
                    onClick={() => handleQuestionTypeChange("CREATE")}
                >
                    Create question
                </button>

                <button
                    className={`flex-1 text-center py-2 text-white transition-colors duration-200 rounded-r-md 
            ${currentType === "GENERATE" ? "bg-[#5B46F7]" : "bg-[#282828]"}`}
                    onClick={() => handleQuestionTypeChange("GENERATE")}
                >
                    Generate question
                </button>
            </div>

            {currentType === "CREATE" ? (
                <CreateQuestionBlock/>
            ) : (
                <GenerateQuestionBlock/>
            )}
        </div>
    );
}
