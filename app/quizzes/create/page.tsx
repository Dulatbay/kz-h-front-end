'use client'

import Collapse from "@/components/Collapse/collapse"
import DefaultButton from "@/components/Button/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store";
import { useEffect, useId, useState } from "react";
import { addQuestion, removeQuestion, setTitle, setDescription, setShowQuestions, setLanguage } from "@/app/store/slice";
import { Variant } from "@/app/types/Variant";
import { Question } from "@/app/types/Question";
import { Dropdown, Space, Button, Checkbox } from "antd";
import type { MenuProps, CheckboxProps } from 'antd';
import styles from "@/app/styles/ultima.module.scss";
import { send } from "process";

export default function CreateQuiz(){
    const quizOptions = useSelector((state: RootState) => state.quizOptions);
    const questions = useSelector((state: RootState) => state.quizOptions.questions);
    const dispatch = useDispatch();

    function createQuiz(){
        const titleInput = document.getElementById("titleInput") as HTMLInputElement;
        const descArea = document.getElementById("descArea") as HTMLTextAreaElement;
        const previewCheckbox = document.getElementById("previewCheckbox") as HTMLInputElement;

        let title = titleInput.value.trim();
        let desc = descArea.value.trim();
        let showQuestions = previewCheckbox.checked;

        if(title.length == 0 || desc.length == 0){
            alert("Название квиза и его описание не должно быть пустым");
            return;
        }

        if(questions.length == 0){
            alert("Количество вопросов должно быть больше нуля");
            return;
        }

        dispatch(setTitle(title));
        dispatch(setDescription(desc));
        dispatch(setShowQuestions(showQuestions));
        dispatch(setLanguage('KAZ'));

        sendQuiz();
    }

    async function sendQuiz(){
        let title = useSelector((state: RootState) => state.quizOptions.title);
        let description = useSelector((state: RootState) => state.quizOptions.description);
        let showQuestions = useSelector((state: RootState) => state.quizOptions.showQuestions);
        let language = useSelector((state: RootState) => state.quizOptions.language);

        let response = await fetch('/quizzes', {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description,
                showQuestions: showQuestions,
                language: language,
                questions: questions
            }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        response = await response.json()
        console.log(JSON.stringify(response))

    }
    return (
        <div className="w-full max-w-[1200px] mx-auto flex flex-col px-8 items-center">
            <h1 className="text-xl my-6">Quiz creating</h1>
            <div className="w-full flex gap-3">
                <div className="w-1/2 flex flex-col gap-4">
                    <input id="titleInput" className="h-10 bg-[#FFFFFF24] w-full text-[#91898C] rounded-md pl-3" type="text" placeholder="Title"/>
                    <textarea id="descArea" className="h-40 bg-[#FFFFFF24] w-full text-[#91898C] rounded-md pl-3" placeholder="Description"/>
                    <AddedQuestions/>
                    <div className="flex gap-2">
                        <Checkbox id="previewCheckbox"/>
                        <label htmlFor="previewCheckbox" className="cursor-pointer select-none">Show questions before start</label>
                    </div>
                    <Button className={`w-full h-12 ${styles.button_primary}`} onClick={createQuiz}>Create Quiz</Button>
                </div>
                <div className="w-1/2">
                    <Switch/>
                </div>
            </div>
        </div>
    )
}

// function Dropdown({title, options, className}: {title: string, options: string[], className?: string}){
//     return (
//         <select defaultValue={title} className={`bg-[#FFFFFF24] flex-1 h-10 p-3 cursor-pointer ${className}`}>
//             <option className="bg-zinc-800" disabled>{title}</option>
//             {
//                 options.map((name, i) => {
//                     return (
//                         <option className="bg-zinc-800 hover:bg-slate-300 cursor-pointer" key={title + i}>{name}</option>
//                     )
//                 })
//             }
//         </select>
//     )
// }

type OptionInput = {
    id: number,
    value: string,
    correct: boolean,
}

function AddedQuestions(){
    const questions = useSelector((state: RootState) => state.quizOptions.questions);
    const dispatch = useDispatch();

    return (
        <Collapse name="Добавленные вопросы" id="addedQuestions">
            <div className="max-h-[480px] gap-2 flex flex-col overflow-y-scroll">
            {
                questions.map((question: Question, index : number) => {
                    return (
                        <div key={`question${index}`} className="flex flex-col border border-white rounded-md p-3 relative w-[calc(100%-8px)] first:mt-2">
                            <h2>{question.question}</h2>
                            {
                                question.variants.map((variant, ind) => {
                                    let optionColor = 'bg-white';
                                    if(variant.correct)
                                        optionColor = 'bg-green-500';
                                    return (
                                        <div key={`option${index}-${ind}`} className="flex items-center gap-1">
                                            <i>
                                                <div className={`${optionColor} w-2 h-2 rounded-full`}>
                                                </div>
                                            </i>
                                            {variant.text}
                                        </div>
                                    )
                                })
                            }
                            <button onClick={() => dispatch(removeQuestion(index))} className="rounded-full bg-red-600 text-white flex items-center justify-center w-4 h-4 -top-2 -right-2 absolute">
                                <svg width="12" height="10" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1.3538" y1="0.646447" x2="4.873" y2="4.16565" stroke="white"/><line x1="1.18673" y1="4.16549" x2="4.70593" y2="0.646291" stroke="white"/></svg>
                            </button>
                        </div>
                    )
                })
            }
            </div>
        </Collapse>
    )
}

function Switch(){
    
    return (
        <div className="w-full flex flex-wrap">
            <input type="checkbox" className="hidden peer" id="createTabOpened"/>
            <label htmlFor="createTabOpened" className="cursor-pointer pointer-events-none bg-[#5348F2] text-center w-1/2 peer-checked:bg-[#282828] peer-checked:pointer-events-auto select-none">
                Create question
            </label>
            <label htmlFor="createTabOpened" className="cursor-pointer bg-[#282828] text-center w-1/2 pointer-events-auto peer-checked:bg-[#5348F2] peer-checked:pointer-events-none select-none">
                Generate question
            </label>

            <div className="flex flex-col gap-2 w-full mt-8 peer-checked:hidden">
                <CreateQuestionBlock/>
            </div>

            <div className="hidden flex-col gap-2 w-full mt-8 peer-checked:flex">
                <GenerateQuestionBlock/>
            </div>
        </div>
    )
}

function CreateQuestionBlock(){
    const questions = useSelector((state: RootState) => state.quizOptions.questions);
    useEffect(()=>{
        questionInput = document.getElementById("questionInput") as HTMLInputElement;
    })
    const dispatch = useDispatch();
    let questionInput : HTMLInputElement;
    let [optionInputs, setOptionInputs] = useState([] as OptionInput[]);

    function parseQuestions(){
        for(let i = 0; i < optionInputs.length; i++){
            let inputId = `optionInput${optionInputs[i].id}`;
            let inputDOM = document.getElementById(inputId) as HTMLInputElement;     
            let inputValue = inputDOM.value;
            optionInputs[i].value = inputValue.trim();
        }

        //convert to options
        let options = [] as Variant[]
        for(let i = 0; i < optionInputs.length; i++){
            options.push({
                text: optionInputs[i].value,
                correct: optionInputs[i].correct,
            }
            );
        }

        return options;
    }
    

    function addQuestions() {
        let inputValues = parseQuestions();
        if(inputValues.length < 2){
            alert('Количество вариантов ответа должно быть больше 2');
            return;
        }

        if(inputValues.find(o => o.correct === true) == undefined){
            alert('Должен быть по крайней мере 1 правильный ответ');
            return;
        }

        if(questionInput.value.trim() === '' || inputValues.find(o => o.text === '') != undefined){
            alert('Вопрос и варианты ответов должны быть не пустыми');
            return;
        }

        

        setOptionInputs([]);
        dispatch(addQuestion({"question": questionInput.value.trim(), "durationInSeconds": 15, "topicId": '15', "level": 15, "variants": inputValues}));
    }

    function addOption(){
        if(optionInputs.length <= 3){
            let newInput = {
                'id': Math.random(),
                'value': '',
                'correct': false,
            } as OptionInput;
            setOptionInputs([...optionInputs, newInput])
        }
    }
    return (
        <>
            <h1 className="text-[#91898C] mx-auto">Question creating</h1>
            <div className="flex">
                <input id="questionInput" className="flex-1 px-2 bg-[#282828] text-[#91898C]" placeholder="Question"/>
                {/* <Dropdown className="rounded-r-md max-w-40" title="Topic" options={["Древний век", "Тюркский период"]}/> */}
            </div>
                <div className="flex flex-col w-full gap-2 mt-2">
                    {
                        optionInputs.map((optionInput, index) => {
                            let optionColor;
                            let text;
                            if(optionInput.correct) {
                                optionColor = 'bg-green-600';
                                text = 'Right';
                            }else{
                                optionColor = 'bg-red-500';
                                text = 'Wrong';
                            }
                            return (
                                <div key={`option${optionInput.id}`} className="flex w-full relative">
                                    <button onClick={() => {let temp = [...optionInputs]; temp[index].correct = !temp[index].correct; setOptionInputs(temp);}} className={`p-2 text-white w-16 ${optionColor}`}>{text}</button>
                                    <input type="text" id={`optionInput${optionInput.id}`} className="flex-1 px-2 bg-[#282828] text-[#91898C]"/>
                                    <button onClick={() => {setOptionInputs(optionInputs => optionInputs.filter((s, i) => (i != index)));}} className="w-4 h-4 absolute -top-2 -right-2 bg-red-500 rounded-full flex items-center justify-center">
                                        <svg width="12" height="10" viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="1.3538" y1="0.646447" x2="4.873" y2="4.16565" stroke="white"/>
                                            <line x1="1.18673" y1="4.16549" x2="4.70593" y2="0.646291" stroke="white"/>
                                        </svg>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <Button disabled={optionInputs.length >= 4} onClick={addOption} className={`${styles.dropdown} w-full h-10`}>+ Add option</Button>
                <Button onClick={addQuestions} className={`${styles.button_success} p-2 rounded-r-md mt-10 w-full`}>Create question</Button>
        </>
    )
}

function GenerateQuestionBlock(){
    const questions = useSelector((state: RootState) => state.quizOptions.questions);
    const dispatch = useDispatch();

    const items: MenuProps['items'] = [
        {
          label: <a href="#">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="#">2nd menu item</a>,
          key: '1',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
    ];

    return (
        <>
            <h1 className="text-[#91898C] mx-auto">Question generating</h1>
            <div className="flex">
            <Dropdown className={`h-auto rounded-r-none ${styles.dropdown}`} menu={{ items }} trigger={['click']}>
                <Button className={`${styles.dropdown}`}>
                    <Space>
                        Topics
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            <Button className={`py-2 px-3 rounded-l-none flex-1 text-start text-sm ${styles.button_success}`}>Generate question</Button>
            </div>
        </>
    )
}

function DownOutlined(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-360 280-560h400L480-360Z"/></svg>
    )
}