import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Button, message, Select} from "antd";
import {
    addQuestion,
    setSelectedTopics,
} from "@/app/store/slices/quiz-slice/slice";
import TopicDropdown from "@/app/[lng]/(main-pages)/quizzes/create/topic/topic-dropdown";
import {RootState} from "@/app/store/store";
import ShowSelectedTopics from "@/app/[lng]/(main-pages)/quizzes/create/topic/show-selected-topics";

type OptionInput = {
    id: number;
    value: string;
    correct: boolean;
};

export default function CreateQuestionBlock() {
    const ALLOWED_CORRECT_ANSWERS = 1;
    const dispatch = useDispatch();
    const [questionText, setQuestionText] = useState("");
    const [optionInputs, setOptionInputs] = useState([] as OptionInput[]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("EASY");
    const [selectedDuration, setSelectedDuration] = useState(15);
    const {selectedTopics, moduleResponse} = useSelector((state: RootState) => state.quizOptions);

    function addQuestionHandler() {
        if (optionInputs.length < 2) {
            message.error("Количество вариантов ответа должно быть больше 2");
            return;
        }
        const correctCount = optionInputs.filter((o) => o.correct).length;
        if (correctCount !== ALLOWED_CORRECT_ANSWERS) {
            message.error(`Должен быть ровно ${ALLOWED_CORRECT_ANSWERS} правильный вариант ответа`);
            return;
        }
        if (questionText.trim() === "" || optionInputs.some((o) => o.value.trim() === "")) {
            message.error("Вопрос и варианты ответов должны быть не пустыми");
            return;
        }

        const trimmedOptions = optionInputs.map((o) => o.value.trim());
        const uniqueOptions = new Set(trimmedOptions);
        if (uniqueOptions.size !== trimmedOptions.length) {
            message.error("Варианты ответа не должны повторяться");
            return;
        }

        dispatch(
            addQuestion({
                type: "CREATE",
                question: questionText.trim(),
                durationInSeconds: selectedDuration,
                topicIds: selectedTopics,
                level: selectedDifficulty as "EASY" | "MEDIUM" | "HARD",
                variants: optionInputs.map((opt) => ({
                    text: opt.value,
                    correct: opt.correct,
                })),
            })
        );

        // Сброс полей после добавления вопроса
        setQuestionText("");
        setOptionInputs([]);
        setSelectedDifficulty("EASY");
        setSelectedDuration(15);
        setSelectedTopics([]);
    }

    function addOption() {
        if (optionInputs.length < 4) {
            setOptionInputs((prev) => [...prev, {id: Math.random(), value: "", correct: false}]);
        }
    }

    return (
        <>
            <h1 className="text-[#91898C] mx-auto">Question creating</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                    {/* Выбор сложности */}
                    <div className="flex flex-1 flex-col w-full">
                        <label className="text-sm text-gray-300">Difficulty</label>
                        <Select
                            value={selectedDifficulty}
                            onChange={(value) => setSelectedDifficulty(value)}
                        >
                            <Select.Option value="EASY">EASY</Select.Option>
                            <Select.Option value="MEDIUM">MEDIUM</Select.Option>
                            <Select.Option value="HARD">HARD</Select.Option>
                        </Select>
                    </div>
                    {/* Выбор длительности */}
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

                    <div className="w-full">
                        <TopicDropdown modules={moduleResponse}/>
                    </div>
                </div>
                <div>
                    <ShowSelectedTopics/>

                </div>
                <input
                    className="bg-[#FFFFFF24] w-full text-white rounded-lg pl-3 h-11 focus:outline-none"
                    placeholder="Question"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                />

            </div>
            <div className="flex flex-col w-full gap-2 mt-2">
                {optionInputs.map((option, index) => {
                    const optionColor = option.correct ? "bg-green-600" : "bg-red-500";
                    const text = option.correct ? "Right" : "Wrong";
                    return (
                        <div key={`option${option.id}`} className="flex w-full relative">
                            <button
                                onClick={() => {
                                    setOptionInputs((prev) => {
                                        if (ALLOWED_CORRECT_ANSWERS === 1) {
                                            return prev.map((opt, i) =>
                                                i === index ? {...opt, correct: true} : {...opt, correct: false}
                                            );
                                        } else {
                                            const currentCorrectCount = prev.filter((o) => o.correct).length;
                                            if (!prev[index].correct && currentCorrectCount >= ALLOWED_CORRECT_ANSWERS) {
                                                return prev;
                                            } else {
                                                return prev.map((opt, i) =>
                                                    i === index ? {...opt, correct: !opt.correct} : opt
                                                );
                                            }
                                        }
                                    });
                                }}
                                className={`p-2 text-white w-16 ${optionColor} rounded-l`}
                            >
                                {text}
                            </button>
                            <input
                                type="text"
                                className="flex-1 px-2 bg-[#282828] text-white focus:outline-none"
                                value={option.value}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setOptionInputs((prev) =>
                                        prev.map((opt, i) => (i === index ? {...opt, value: newValue} : opt))
                                    );
                                }}
                            />
                            <button
                                onClick={() => {
                                    setOptionInputs((prev) => prev.filter((_, i) => i !== index));
                                }}
                                className="w-4 h-4 absolute -top-2 -right-2 bg-red-500 rounded-full flex items-center justify-center"
                            >
                                <svg
                                    width="12"
                                    height="10"
                                    viewBox="0 0 6 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="1.3538" y1="0.646447" x2="4.873" y2="4.16565" stroke="white"/>
                                    <line x1="1.18673" y1="4.16549" x2="4.70593" y2="0.646291" stroke="white"/>
                                </svg>
                            </button>
                        </div>
                    );
                })}
            </div>
            <Button disabled={optionInputs.length >= 4} onClick={addOption} className="w-full h-10" type={"link"}>
                + Add option
            </Button>
            <button onClick={addQuestionHandler} className="p-2 rounded-md mt-10 w-full bg-[#2CBB5D]">
                Create question
            </button>
        </>
    );
}
