'use client'

import { useState } from "react";

export default function Quizzes(){
    let [activeTags, setActiveTags] = useState([] as string[]);

    const rows = [
        {
            'solved': true,
            'id' : 1,
            'title': 'Независимый Казахстан',
            'progress': 70.6,
            'difficulty': 'Easy',
            'questionsAmount': 25,
        },
        {
            'solved': false,
            'id' : 2,
            'title': 'Тема номер 2',
            'progress': 32.5,
            'difficulty': 'Hard',
            'questionsAmount': 21,
        },
        {
            'solved': false,
            'id' : 3,
            'title': 'Тема номер 3',
            'progress': 66.5,
            'difficulty': 'Medium',
            'questionsAmount': 12,
        }
    ]

    function toggleTag({type, tag} : {type : string, tag: string}){
        if(activeTags.includes(tag)){
            setActiveTags(activeTags.filter(t => tag !== t))
        }else{
            setActiveTags([...activeTags, tag])
        }

        console.log(activeTags)
    }

    return (
        <div className="mt-10 w-1/2 min-w-80 mx-auto flex flex-col gap-6 p-2">
            <h1 className="text-4xl">Quizzes</h1>
            <div className="flex w-full justify-start gap-3 flex-wrap">
                <Dropdown onSelect={(tag) => toggleTag({ type: "Topics", tag})} title="Topics" options={["Древний век", "Тюркский период"]}/>
                <Dropdown onSelect={(tag) => toggleTag({ type: "Difficulty", tag})} title="Difficulty" options={["Easy", "Medium", "Hard"]}/>
                <Dropdown onSelect={(tag) => toggleTag({ type: "Status", tag})} title="Status" options={["Solved", "Not solved"]}/>
                <SearchBar/>
                <PickOne/>
            </div>
            <div className="w-full flex flex-wrap gap-2">
                {
                    activeTags.map((tag, j) => {
                        return (
                            <div key={"tag" + tag} className="bg-zinc-600 rounded-md p-2 flex justify-between gap-2 items-center">
                                <h2 className="text-base">{tag}</h2>
                                <button onClick={() => toggleTag({type:"", tag})} className="rounded-full bg-zinc-800 w-4 h-4 flex items-center justify-center">
                                    <svg width="8" height="8" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.00024 1L4.35343 4.35319" stroke="white" strokeLinecap="round"/>
                                        <path d="M1 4.35303L4.35319 0.999839" stroke="white" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full overflow-x-scroll">
                <table cellPadding={6} className="gap-3 w-full">
                    <tbody>
                        <tr className="border-b-zinc-800 border-b-2">
                            <td className="">Status</td>
                            <td>Title</td>
                            <td>Average</td>
                            <td>Difficulty</td>
                            <td>Questions</td>
                        </tr>
                        
                        {
                            rows.map((row, i) => {
                                let colorClass = '';
                                switch(row.difficulty){
                                    case 'Easy':
                                        colorClass = 'text-[#00B8A3]';
                                        break;
                                    case 'Medium':
                                        colorClass = 'text-yellow-500';
                                        break;
                                    case 'Hard':
                                        colorClass = 'text-red-500';
                                        break;
                                    default:
                                        colorClass = 'text-white';
                                        break;
                                }
                                return (
                                    <tr key={"row" + i} className="odd:bg-zinc-800">
                                        <td>
                                            {row.solved ? (<SolvedMark/>) : (<></>)}</td>
                                        <td>{row.title}</td>
                                        <td>{row.progress}%</td>
                                        <td className={colorClass}>{row.difficulty}</td>
                                        <td>{row.questionsAmount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 
            </div>
        </div>
    )
}

function Dropdown({title, options, onSelect}: {title: string, options: string[], onSelect : (tag:string) => void}){
    return (
        <select className="bg-[#FFFFFF24] w-32 h-10 p-3 rounded-md cursor-pointer" value={title} defaultValue={title} >
            <option className="bg-zinc-800" disabled>{title}</option>
            {
                options.map((name, i) => {
                    return (
                        <option onClick={() => onSelect(name)} className="bg-zinc-800 hover:bg-slate-300 cursor-pointer" key={title + i}>{name}</option>
                    )
                })
            }
        </select>
    )
}

function SearchBar(){
    return (
        <div className="flex h-10">
            <input className="bg-[#FFFFFF24] max-w-96 w-full text-[#91898C] rounded-lg pl-3" type="text" placeholder="Search"/>
        </div>
    )
}

function PickOne(){
    return (
        <button className="flex gap-2 items-center">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="25" height="25" rx="12.5" fill="#2CBB5D"/>
                <g clipPath="url(#clip0_33_93)">
                <path d="M15.25 11.1249V9.74992C14.7917 9.74992 13.7338 9.66375 13.1848 10.7656L11.2515 14.6435C10.7863 15.5767 9.83342 16.1666 8.79025 16.1666H7V15.2499H8.79025C9.48554 15.2499 10.1208 14.8567 10.4311 14.2343L12.3643 10.3563C12.9858 9.10917 14.0483 8.83325 15.25 8.83325V7.45825L18 9.29159L15.25 11.1249ZM10.9128 11.7318L11.4248 10.7042C10.8587 9.56796 10.096 8.83325 8.79025 8.83325H7V9.74992H8.79025C10.1066 9.74992 10.4604 10.8238 10.9128 11.7318ZM18 15.7083L15.25 13.8749V15.2499C13.5175 15.2499 13.408 14.6825 12.7035 13.269L12.1911 14.2961C12.659 15.2353 13.1536 16.1666 15.25 16.1666V17.5416L18 15.7083Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_33_93">
                <rect width="11" height="11" fill="white" transform="translate(7 7)"/>
                </clipPath>
                </defs>
            </svg>
            <h3 className="text-[#2CBB5D] text-md">Pick one</h3>
        </button>
    )
}

function SolvedMark(){
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_33_141)">
            <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#2CBB5D" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 3.33782C8.47088 2.48698 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48698 8.47088 3.33782 7" stroke="#2CBB5D" strokeLinecap="round"/>
        </g>
        <defs>
            <clipPath id="clip0_33_141">
                <rect width="24" height="24" fill="white"/>
            </clipPath>
        </defs>
        </svg>

    )
}