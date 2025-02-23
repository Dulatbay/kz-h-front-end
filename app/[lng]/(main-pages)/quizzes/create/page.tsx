'use client'

import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    addQuestion,
    setTitle,
    setDescription,
    setShowQuestions,
    setLanguage,
} from "@/app/store/slices/quiz-slice/slice";
import {Button, Checkbox, Dropdown, MenuProps, message, Select, Space} from "antd";
import {RootState} from "@/app/store/store";
import {HttpException} from "@/utills/exceptions";
import {useRouter} from "next/navigation";
import {createQuiz} from "@/services/quiz/quizService";
import {Variant} from "@/services/game/types";
import AddedQuestions from "@/app/[lng]/(main-pages)/quizzes/create/added-questions";
import Switch from "@/app/[lng]/(main-pages)/quizzes/create/switch";


export type CreateQuestion = {
    type: "CREATE";
    question: string;
    topicIds: string[];
    level: "EASY" | "MEDIUM" | "HARD";
    durationInSeconds: number;
    variants: Variant[];
};

export type GenerateQuestion = {
    type: "GENERATE";
};

export type Question = CreateQuestion | GenerateQuestion;

export default function CreateQuiz() {
    const dispatch = useDispatch();
    const router = useRouter();
    const questions = useSelector((state: RootState) => state.quizOptions.questions);
    const title = useSelector((state: RootState) => state.quizOptions.title);
    const description = useSelector((state: RootState) => state.quizOptions.description);
    const showQuestions = useSelector((state: RootState) => state.quizOptions.showQuestions);
    const language = useSelector((state: RootState) => state.quizOptions.language);



    function createQuizButtonHandle() {
        if (title.trim().length === 0 || description.trim().length === 0) {
            message.error("Название квиза и его описание не должно быть пустым");
            return;
        }
        if (questions.length === 0) {
            message.error("Количество вопросов должно быть больше нуля");
            return;
        }

        createQuiz(title, description, showQuestions, language, questions)
            .then(() => {
                message.info("Quiz created successfully");
                router.push("/quizzes");
            })
            .catch((error) => {
                if (error instanceof HttpException) message.error(error.message);
                else message.error("Error while creating quiz");
            });
    }


    return (
        <div className="w-full max-w-[1200px] mx-auto flex flex-col px-8 items-center">
            <div className="flex items-center gap-2">
                <h1 className="text-xl my-6">Quiz creating</h1>
                <select
                    className="bg-[#282828] rounded text-white p-2 text-center h-fit"
                    value={language}
                    onChange={(e) => {
                        dispatch(setLanguage(e.target.value))
                    }}
                >
                    <option value="kaz">🇰🇿</option>
                    <option value="ru">🇷🇺</option>
                    <option value="en">🇺🇸</option>
                </select>
            </div>
            <div className="w-full flex gap-8 flex-wrap">
                <div className="flex flex-col gap-4 flex-1 min-w-80">
                    <input
                        className="h-10 bg-[#FFFFFF24] w-full text-white rounded-md pl-3 focus:outline-none"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => dispatch(setTitle(e.target.value))}
                    />
                    <textarea
                        className="h-40 bg-[#FFFFFF24] w-full text-white rounded-md pl-3 pt-3 focus:outline-none"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => dispatch(setDescription(e.target.value))}
                    />
                    <AddedQuestions/>
                    <div className="flex gap-2">
                        <Checkbox
                            checked={showQuestions}
                            onChange={(e) => dispatch(setShowQuestions(e.target.checked))}
                        />
                        <label className="cursor-pointer select-none">Show questions before start</label>
                    </div>
                    <Button className="w-full h-12" onClick={createQuizButtonHandle} type={"primary"}>
                        Create Quiz
                    </Button>
                </div>
                <div className="flex-1">
                    <Switch/>
                </div>
            </div>
        </div>
    );
}






