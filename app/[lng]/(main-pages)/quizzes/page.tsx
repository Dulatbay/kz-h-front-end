'use client';

import React, {useEffect, useRef, useState} from "react";
import {ConfigProvider, MenuProps, Pagination, Space, theme, Dropdown, Select, Button} from "antd";
import Loader from "@/components/Loader/loader";
import {fetchQuizzes} from "@/services/quiz/quizService";
import {QuizCardResponse} from "@/services/quiz/types";
import {HttpException} from "@/utills/exceptions";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {CheckOutlined, DownOutlined, Loading3QuartersOutlined, LoadingOutlined} from "@ant-design/icons";
import {fetchModules} from "@/services/module/modulesService";
import {ModuleResponse} from "@/services/module/types";
import {label} from "framer-motion/client";
import {ItemType, MenuItemGroupType, MenuItemType} from "antd/es/menu/interface";
import Link from "next/link";

const {Option, OptGroup} = Select;

export default function Quizzes() {

    const [activeTags, setActiveTags] = useState<{ type: string; value: string; query_value: string }[]>([]);
    const [searchText, setSearchText] = useState("");
    const [quizzes, setQuizzes] = useState<QuizCardResponse[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const {t} = useTranslation();
    const [paginationParams, setPaginationParams] = useState({pageNumber: 0, pageSize: 20});
    const [loading, setLoading] = useState(true);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter()
    const [items, setItems] = useState<MenuProps['items']>([]);
    const [modules, setModules] = useState<ModuleResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true);
                const newItems: ItemType[] = [];

                const data = await fetchQuizzes({
                    page: paginationParams.pageNumber,
                    size: paginationParams.pageSize,
                    searchText,
                    tags: activeTags,
                });
                setQuizzes(data.content);
                setTotalElements(data.totalElements);

                const fetchedModules = await fetchModules();
                setModules(fetchedModules);

            } catch (error) {
                if (error instanceof HttpException) {
                    router.push(`/error?status=${error.status}&message=${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchText, activeTags, paginationParams]);

    const toggleTag = (tag: { type: string; value: string; query_value: string }) => {
        setActiveTags((prevTags) =>
            prevTags.some((t) => t.value === tag.value)
                ? prevTags.filter((t) => t.value !== tag.value)
                : [...prevTags, tag]
        );
    };

    function handleSearch(text: string, enterClicked: boolean) {

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (!enterClicked) {
            searchTimeoutRef.current = setTimeout(() => {
                setSearchText(text);
            }, 3000);
        } else {
            setSearchText(text)
        }
    }


    return (
        <div className="mt-10 w-full max-w-[1200px] min-w-40 mx-auto flex flex-col gap-6 px-6">
            <div className={"flex justify-start items-center gap-8 flex-wrap"}>
                <h1 className="text-4xl">{t('quizzes-page.quizzes')}</h1>
                <Link href={"/quizzes/create"}
                      className={`text-sm text-yellow-400 border 
                      border-yellow-400 w-fit p-2 rounded-md
                      hover:bg-yellow-400 hover:text-black hover:border-black
                      
                      transition-all duration-500
                      `}>
                    {t('quizzes-page.createQuiz')}
                </Link>
            </div>
            <div className="flex flex-wrap w-full gap-2">

                <ConfigProvider theme={{
                    components: {
                        Select: {
                            selectorBg: "#FFFFFF24",
                            colorText: "white",
                            colorTextPlaceholder: "white",
                            optionSelectedColor: "white",
                            optionActiveBg: "#555555",
                            optionSelectedBg: "#444444",
                            colorTextLabel: "white",
                            colorBorder: "none",
                            activeBorderColor: "none",
                            hoverBorderColor: "none",
                            fontFamily: "",
                            fontSize: 16,
                        },
                    }
                }}>
                    <Select value={t('quizzes-page.topics')} style={{width: "300px", height: "44px"}}
                            dropdownStyle={{backgroundColor: "#1a1a1a", color: "white"}}
                            onSelect={(value, option) => toggleTag({
                                type: "topics",
                                value: option.value as string,
                                query_value: option.key as string
                            })}>
                        {
                            modules.map((module) => {
                                return (
                                    <OptGroup className="!text-white !font-bold" key={`${module.id}`}
                                              label={module.name}>
                                        {
                                            module.topics.map((topic) => {
                                                return (
                                                    <Option className="!text-sm" key={topic.topicId}
                                                            value={topic.topicName}>{topic.topicName}</Option>
                                                )
                                            })
                                        }
                                    </OptGroup>
                                )
                            })}
                    </Select>
                </ConfigProvider>

                <CustomDropdown onSelect={(tag) => toggleTag({
                    type: "level",
                    value: tag,
                    query_value: (tag === t('quizzes-page.easy')) ? "EASY" : (tag === t('quizzes-page.medium')) ? "MEDIUM" : "HARD"
                })}
                                title={t('quizzes-page.difficulty')}
                                options={[t('quizzes-page.easy'), t('quizzes-page.medium'), t('quizzes-page.hard')]}
                                disabled={loading}
                />
                <CustomDropdown onSelect={(tag) => toggleTag({
                    type: "status",
                    value: tag,
                    query_value: tag == t('quizzes-page.solved') ? "true" : "false"
                })} title={t('quizzes-page.status')} options={[t('quizzes-page.solved'), t('quizzes-page.notSolved')]}
                                disabled={loading}
                />

                <div className="flex flex-1">
                    <SearchBar text={t('quizzes-page.search')} onSearch={handleSearch} disabled={loading}/>
                    <PickOne text={t('quizzes-page.pickOne')} disabled={loading}/>
                </div>
            </div>
            <div className="w-full flex flex-wrap gap-2">
                {
                    activeTags.map((tag, j) => {
                        return (
                            <div key={`tag${j}`}
                                 className="bg-zinc-600 rounded-md p-2 flex justify-between gap-2 items-center">
                                <h2 className="text-base">{tag.value}</h2>
                                <button onClick={() => toggleTag({
                                    type: tag.type,
                                    value: tag.value,
                                    query_value: tag.query_value
                                })} className="rounded-full bg-zinc-800 w-4 h-4 flex items-center justify-center">
                                    <svg width="8" height="8" viewBox="0 0 5 5" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.00024 1L4.35343 4.35319" stroke="white" strokeLinecap="round"/>
                                        <path d="M1 4.35303L4.35319 0.999839" stroke="white" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div
                className="w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <table cellPadding={6} className="gap-3 w-full min-w-[900px] ">
                    <colgroup>
                        <col className="w-20"/>
                        <col className="w-1/2"/>
                        <col className="min-w-24"/>
                        <col className="min-w-24"/>
                        <col className="min-w-24"/>
                    </colgroup>
                    <tbody>
                    <tr className="border-b-zinc-800 border-b-2 text-[#7E7E7E]">
                        <td>{t('quizzes-page.status')}</td>
                        <td>{t('quizzes-page.title')}</td>
                        <td>{t('quizzes-page.average')}</td>
                        <td>{t('quizzes-page.difficulty')}</td>
                        <td>{t('quizzes-page.questions')}</td>
                    </tr>


                    {(!loading && quizzes) ?
                        quizzes.map((row, i) => {
                            let colorClass: string;
                            let difficulty: string;
                            switch (row.level) {
                                case "EASY":
                                    colorClass = 'text-[#00B8A3]';
                                    difficulty = t('quizzes-page.easy');
                                    break;
                                case "MEDIUM":
                                    colorClass = 'text-yellow-500';
                                    difficulty = t('quizzes-page.medium');
                                    break;
                                case "HARD":
                                    colorClass = 'text-red-500';
                                    difficulty = t('quizzes-page.hard');
                                    break;
                                default:
                                    colorClass = 'text-white';
                                    difficulty = 'Undef';
                                    break;
                            }
                            return (
                                <QuizRow row={row} colorClass={colorClass} difficulty={difficulty} index={i} key={i}/>
                            )
                        })
                        :
                        <tr>
                            <td colSpan={5} className={'pt-16'}>
                                <Loader/>
                            </td>
                        </tr>
                    }

                    </tbody>
                </table>
            </div>
            {
                !loading ? <ConfigProvider theme={{algorithm: theme.darkAlgorithm,}}>
                    <Pagination onChange={(page, pageSize) => {
                        setPaginationParams({'pageNumber': page - 1, 'pageSize': pageSize})
                    }} total={totalElements} defaultPageSize={paginationParams.pageSize} showSizeChanger
                                pageSizeOptions={[5, 10, 20, 50]} current={paginationParams.pageNumber + 1}
                                disabled={loading}
                    />
                </ConfigProvider> : <></>
            }
        </div>
    )
}

function CustomDropdown({title, options, onSelect, disabled}: {
    title: string,
    options: string[],
    onSelect: (type: string) => void,
    disabled: boolean
}) {
    return (
        <select className="bg-[#FFFFFF24] flex-1 md:max-w-36 p-3 overflow-visible rounded-md cursor-pointer h-11"
                value={title} onChange={(e) => onSelect(e.target.value)} disabled={disabled}>
            <option className="bg-zinc-800" disabled>{title}</option>
            {
                options.map((name, i) => {
                    return (
                        <option className="bg-zinc-800 hover:bg-slate-300 cursor-pointer"
                                key={title + i}>{name}</option>
                    )
                })
            }
        </select>
    )
}

function SearchBar({text, onSearch, disabled}: {
    text: string,
    onSearch: (text: string, enterClicked: boolean) => void,
    disabled: boolean
}) {
    return (
        <div className="flex flex-1 min-w-32">
            <input className="bg-[#FFFFFF24] w-full text-[#91898C] rounded-lg pl-3 h-11" type="text" placeholder={text}
                   onChange={(e: any) => onSearch(e.target.value, false)} disabled={disabled}
                   onKeyDown={(e: any) => {
                       if (e.key === 'Enter') {
                           onSearch(e.target.value, true)
                       }
                   }}
            />
        </div>
    )
}

const QuizRow = ({row, colorClass, difficulty, index}: {
    row: QuizCardResponse;
    colorClass: string;
    difficulty: string;
    index: number
}) => {
    return (
        <tr key={`row-${index}`} className="odd:bg-zinc-800 h-14">
            <td className="text-center align-middle">
                <div className="h-full flex items-center justify-center">
                    {row.inProgress ? (
                        <Loading3QuartersOutlined style={{color: 'gold', fontSize: '16px'}} spin={false}/>
                    ) : row.status ? (
                        <CheckOutlined style={{color: 'green', fontSize: '16px'}}/>
                    ) : null}
                </div>
            </td>
            <td>
                <a href={`/quizzes/${row.id}`}>{row.title}</a>
            </td>
            <td>{row.average}%</td>
            <td className={colorClass}>{difficulty}</td>
            <td>{row.questions}</td>
        </tr>
    );
};


function PickOne({text, disabled}: { text: boolean, disabled: boolean }) {
    const router = useRouter();

    async function pickRandom() {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quizzes/random`).then((response) => response.json()).then((data) => {
            router.push(`/quizzes/${data.id}`);
        });
    }

    return (
        <button onClick={pickRandom} className="flex gap-2 items-center px-2" disabled={disabled}>
            <div className="w-8">
                <svg width="32" height="32" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="25" height="25" rx="12.5" fill="#2CBB5D"/>
                    <g clipPath="url(#clip0_33_93)">
                        <path
                            d="M15.25 11.1249V9.74992C14.7917 9.74992 13.7338 9.66375 13.1848 10.7656L11.2515 14.6435C10.7863 15.5767 9.83342 16.1666 8.79025 16.1666H7V15.2499H8.79025C9.48554 15.2499 10.1208 14.8567 10.4311 14.2343L12.3643 10.3563C12.9858 9.10917 14.0483 8.83325 15.25 8.83325V7.45825L18 9.29159L15.25 11.1249ZM10.9128 11.7318L11.4248 10.7042C10.8587 9.56796 10.096 8.83325 8.79025 8.83325H7V9.74992H8.79025C10.1066 9.74992 10.4604 10.8238 10.9128 11.7318ZM18 15.7083L15.25 13.8749V15.2499C13.5175 15.2499 13.408 14.6825 12.7035 13.269L12.1911 14.2961C12.659 15.2353 13.1536 16.1666 15.25 16.1666V17.5416L18 15.7083Z"
                            fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_33_93">
                            <rect width="11" height="11" fill="white" transform="translate(7 7)"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <h3 className="text-[#2CBB5D] text-md text-nowrap max-[400px]:hidden">{text}</h3>
        </button>
    )
}