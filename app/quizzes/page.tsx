'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Quizzes(){
    class Tag {
        "type": string;
        "value": string;
        "query_value": string;
    }

    let [activeTags, setActiveTags] = useState([] as Tag[]);

    const [searchText, setSearchText] = useState("");

    class Quiz{
        "id": string;
        "title": string;
        "status": boolean;
        "average": number;
        "difficulty": number;
        "questions": number;
        "verified": boolean;
    }

    const [quizzes, setQuizzes] = useState([] as Quiz[]);

    const [language, setLanguage] = useState("RU");
    const token = "";

    useEffect(() => {
        const fetchQuizzes = async () => { 
            try { 
                
                let url = `${process.env.API_URL}/quizzes?page=0&size=20&searchText=${searchText}`;

                for(let tag of activeTags){
                    url += `&${tag.type}=${tag.query_value}`;
                }

                const response = await fetch(url, 
                    {
                        headers: {
                            "Accept-Language": language,
                        }
                    }
                ); 
                const data = await response.json();
                setQuizzes(data.content);

                // console.log("Parsed: " + url);
            } catch (error) { 
                console.error('Error fetching quiz data:', error); 
            } 
        };

        fetchQuizzes();
    });

    function toggleTag({type, tag, query_value} : {type : string, tag: string, query_value: string}){
        const tagsArr = [...activeTags];

        if(activeTags.some(t => t.value === tag)){
            const filteredTags = tagsArr.filter(t => tag !== t.value);
            setActiveTags(filteredTags);
        }else{
            tagsArr.push({"type": type, "value": tag, query_value: query_value})
            setActiveTags(tagsArr);
        }
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>){ 
        setSearchText(e.target.value); 
    }

    return (
        <div className="mt-10 w-full max-w-[1200px] min-w-80 mx-auto flex flex-col gap-6 px-8">
            <h1 className="text-4xl">Quizzes</h1>
            <div className="flex flex-wrap w-full gap-2">

                <Dropdown onSelect={(tag) => toggleTag({ type: "topics", tag, query_value: `"${tag}"`})} title="Topics" options={["Древний век", "Тюркский период"]}/>
                <Dropdown onSelect={(tag) => toggleTag({ type: "level", tag, query_value: tag.toUpperCase()})} title="Difficulty" options={["Easy", "Medium", "Hard"]}/>
                <Dropdown onSelect={(tag) => toggleTag({ type: "status", tag, query_value: tag == "Solved" ? "true" : "false"})} title="Status" options={["Solved", "Not solved"]}/>
                
                <div className="flex flex-1">
                    <SearchBar onSearch={handleSearch}/>
                    <PickOne/>
                </div>
            </div>
            <div className="w-full flex flex-wrap gap-2">
                {
                    activeTags.map((tag, j) => {
                        return (
                            <div key={`tag${j}`} className="bg-zinc-600 rounded-md p-2 flex justify-between gap-2 items-center">
                                <h2 className="text-base">{tag.value}</h2>
                                <button onClick={() => toggleTag({type:tag.type, tag:tag.value, query_value: tag.query_value})} className="rounded-full bg-zinc-800 w-4 h-4 flex items-center justify-center">
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
            <div className="flex flex-col">
                <div className="flex gap-3">
                    <h1 className="text-2xl">Showing results in </h1>
                    <select onChange={(lang) => setLanguage(lang.target.value.split(' ')[0])} className="bg-[#FFFFFF24] text-center px-1 py-2 rounded-md"> 
                        <option className="bg-zinc-800">RU 🇷🇺</option>
                        <option className="bg-zinc-800">KAZ 🇰🇿</option>
                        <option className="bg-zinc-800">EN 🇬🇧</option>
                    </select>
                </div>
            </div>
            
            <div className="w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <table cellPadding={6} className="gap-3 w-full">
                <colgroup>
                    <col className="w-20"/>
                    <col className="w-1/2 min-w-80"/>
                    <col className="min-w-24"/>
                    <col className="min-w-24"/>
                    <col className="min-w-24"/>
                </colgroup>
                    <tbody>
                        <tr className="border-b-zinc-800 border-b-2 text-[#7E7E7E]">
                            <td>Status</td>
                            <td>Title</td>
                            <td>Average</td>
                            <td>Difficulty</td>
                            <td>Questions</td>
                        </tr>
                        
                        {
                            quizzes.map((row, i) => {
                                let colorClass = 'text-[#00B8A3]';
                                let difficulty = 'Easy';
                                switch(row.difficulty){
                                    case 0:
                                        colorClass = 'text-[#00B8A3]';
                                        difficulty = 'Easy';
                                        break;
                                    case 1:
                                        colorClass = 'text-yellow-500';
                                        difficulty = 'Medium';
                                        break;
                                    case 2:
                                        colorClass = 'text-red-500';
                                        difficulty = 'Hard';
                                        break;
                                    default:
                                        colorClass = 'text-white';
                                        difficulty = 'Undef';
                                        break;
                                }
                                return (
                                    <tr key={"row" + i} className="odd:bg-zinc-800">
                                        <td>
                                            {row.status ? (<SolvedMark/>) : (<></>)}</td>
                                        <td><a href={`/quizzes/${row.id}/preview`}>{row.title}</a></td>
                                        <td>{43}%</td>
                                        <td className={colorClass}>{difficulty}</td>
                                        <td>{row.questions}</td>
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
        <select className="bg-[#FFFFFF24] flex-1 md:max-w-36 h-10 p-3 rounded-md cursor-pointer"  value={title} onChange={(e) => onSelect(e.target.value)}>
            <option className="bg-zinc-800" disabled>{title}</option>
            {
                options.map((name, i) => {
                    return (
                        <option className="bg-zinc-800 hover:bg-slate-300 cursor-pointer" key={title + i}>{name}</option>
                    )
                })
            }
        </select>
    )
}

function SearchBar({ onSearch }: { onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }){
    return (
        <div className="flex h-10 flex-1 min-w-48">
            <input className="bg-[#FFFFFF24] w-full text-[#91898C] rounded-lg pl-3" type="text" placeholder="Search" onChange={onSearch}/>
        </div>
    )
}

function PickOne(){
    const router = useRouter();
    async function pickRandom() {
        await fetch(`${process.env.API_URL}/quizzes/random`).then((response) => response.json()).then((data) => {
            router.push(`/quizzes/${data.id}/preview`);
        });
    }

    return (
        <button onClick={pickRandom} className="flex gap-2 items-center px-2">
            <div className="w-8">
                <svg width="32" height="32" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </div>
            <h3 className="text-[#2CBB5D] text-md text-nowrap max-[400px]:hidden">Pick one</h3>
        </button>
    )
}

function SolvedMark(){
    return (
        <svg className="ml-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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