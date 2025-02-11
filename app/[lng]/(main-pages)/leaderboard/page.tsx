'use client'

import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {LeaderCardResponse, LeadersResponse} from "@/services/user/types";
import {fetchLeaderboard} from "@/services/user/userService";
import {ConfigProvider, Pagination, theme} from "antd";
import Loader from "@/components/Loader/loader";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {gradientColorPicker} from "@/app/[lng]/(main-pages)/leaderboard/gradientColorPicker";
import FireSVG2 from "@/components/icons/FireSVG2";

export default function Leaderboard() {
    const {t} = useTranslation();
    const [leaders, setLeaders] = useState<LeaderCardResponse[]>([]);
    const [currentUser, setCurrentUser] = useState<LeaderCardResponse | null>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const {user} = useSelector((state: RootState) => state.userOptions);
    const [paginationParams, setPaginationParams] = useState<{ pageNumber: number; pageSize: number }>({
        pageNumber: 0,
        pageSize: 20,
    });

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                setLoading(true);
                const data: LeadersResponse = await fetchLeaderboard(
                    paginationParams.pageNumber,
                    paginationParams.pageSize
                );
                setLeaders(data.paginatedResponse.content);
                setCurrentUser(data.currentUser);
                setTotalElements(data.paginatedResponse.totalElements);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaders();
    }, [paginationParams]);

    const displayLeaders = [...leaders];
    if (currentUser && !leaders.some((row) => row.username === currentUser.username)) {
        displayLeaders.unshift(currentUser);
    }

    const getRowStyle = useCallback((row: LeaderCardResponse) => {
        const isCurrentUser =
            (currentUser && row.username === currentUser.username) || row.id === user?.id;
        if (row.rank === 1) {
            return {
                // background: "#897917",
            };
        } else if (row.rank === 2) {
            return {
                // background: "#91898C",
            };
        } else if (row.rank === 3) {
            return {
                // background: "#875626",
            };
        } else if (isCurrentUser) {
            return {
                background: "rgba(68,52,159,0.65)",
            };
        }
        return {};
    }, [user, currentUser]);

    if (loading) return <div className="mt-32"><Loader/></div>;

    return (
        <div className="w-full p-3 mx-auto max-w-[1200px] flex flex-col pt-12 gap-8">
            <div className="w-full max-w-96 text-center flex flex-col gap-2 mx-auto">
                <h1 className="text-3xl font-bold">{t("leaderboard-page.leaderboard")}</h1>
                <h2 className="text-neutral-500">{t("leaderboard-page.description")}</h2>
            </div>

            <div
                className="w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <h2 className="text-neutral-500 pb-3">
                    {totalElements} {t("leaderboard-page.users")}
                </h2>

                <table
                    cellPadding={6}
                    className="w-full"
                    style={{borderCollapse: "separate", borderSpacing: "0 0px"}}
                >
                    <colgroup>
                        <col className="w-12"/>
                        <col className="w-3/5 min-w-96"/>
                        <col className="w-12"/>
                        <col className="w-12"/>
                        <col className="w-12"/>
                    </colgroup>
                    <tbody>
                    <tr className="border-b-zinc-800 text-[#7E7E7E] text-sm">
                        <td>{t("leaderboard-page.rank")}</td>
                        <td>{t("leaderboard-page.name")}</td>
                        <td>{t("leaderboard-page.questions")}</td>
                        <td>{t("leaderboard-page.streak")}</td>
                        <td>{t("leaderboard-page.score")}</td>
                    </tr>
                    {displayLeaders.map((row, i) => {
                        const rowStyle = getRowStyle(row);
                        return (
                            <tr key={"row" + i} className="cursor-pointer font-bold h-16 even:bg-zinc-800 hover:opacity-80 transition-all ease-in-out duration-500 hover:bg-zinc-700">
                                {/* Первая ячейка — добавляем скругление слева */}
                                <td
                                    style={{
                                        ...rowStyle,
                                        borderTopLeftRadius: "8px",
                                        borderBottomLeftRadius: "8px",
                                        fontSize:
                                            row.rank === 1 ? "2.7rem" : row.rank <= 3 ? "2.5rem" : undefined,
                                    }}
                                    className="text-center"
                                >
                                    {row.rank === 1
                                        ? "🥇"
                                        : row.rank === 2
                                            ? "🥈"
                                            : row.rank === 3
                                                ? "🥉"
                                                : row.rank}
                                </td>
                                <td style={rowStyle}>
                                    <span >{row.name && row.name.length ? row.name : row.username}</span>
                                    {row.username === user?.username && (
                                        <span className="ml-4 text-sm font-light text-gray-400">
                                            It's you!
                                        </span>
                                    )}
                                </td>
                                <td style={rowStyle} className={"text-start"}>{row.questions}</td>
                                <td style={rowStyle}>
                                    <div className="text-orange-500 flex gap-1 h-full items-center justify-start">
                                        {row.streak} <FireSVG2/>
                                    </div>
                                </td>
                                <td
                                    style={{
                                        ...rowStyle,
                                        borderTopRightRadius: "8px",
                                        borderBottomRightRadius: "8px",
                                    }}
                                >
                                    <div style={gradientColorPicker(row.score)}>{row.score}%</div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
                <Pagination
                    onChange={(page, pageSize) => {
                        setPaginationParams({pageNumber: page - 1, pageSize});
                    }}
                    total={totalElements}
                    defaultPageSize={paginationParams.pageSize}
                    showSizeChanger
                    pageSizeOptions={["5", "10", "20", "50"]}
                    current={paginationParams.pageNumber + 1}
                    disabled={loading}
                />
            </ConfigProvider>
        </div>
    );
}
