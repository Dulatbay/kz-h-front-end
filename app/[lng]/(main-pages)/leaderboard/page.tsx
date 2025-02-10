'use client'

import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {LeaderCardResponse, LeadersResponse} from "@/services/user/types";
import {fetchLeaderboard} from "@/services/user/userService";
import {Avatar, ConfigProvider, Pagination, theme} from "antd";
import Loader from "@/components/Loader/loader";
import UserIcon from "@/components/Header/user-icon";

export default function Leaderboard() {
    const {t} = useTranslation();
    const [leaders, setLeaders] = useState<LeaderCardResponse[]>([]);
    const [currentUser, setCurrentUser] = useState<LeaderCardResponse | null>(null);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationParams, setPaginationParams] = useState<{ pageNumber: number; pageSize: number }>({
        pageNumber: 0,
        pageSize: 20,
    });

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                setLoading(true);
                const data: LeadersResponse = await fetchLeaderboard(paginationParams.pageNumber, paginationParams.pageSize);
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

    // Если currentUser не входит в полученную страницу, добавляем его в итоговый массив для отображения.
    // Это обеспечит, что текущий пользователь отображается так же, как и другие строки таблицы.
    const displayLeaders = [...leaders];
    if (currentUser && !leaders.some((row) => row.username === currentUser.username)) {
        displayLeaders.unshift(currentUser)
    }

    if(loading)
        return <div className="mt-32"><Loader/></div>

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
                <table cellPadding={6} className="gap-3 w-full">
                    <colgroup>
                        <col className="w-12"/>
                        <col className="w-3/5 min-w-96"/>
                        <col className="w-12"/>
                        <col className="w-12"/>
                        <col className="w-12"/>
                    </colgroup>
                    <tbody>
                    <tr className="border-b-zinc-800 border-b-2 text-[#7E7E7E] text-sm">
                        <td>{t("leaderboard-page.rank")}</td>
                        <td>{t("leaderboard-page.name")}</td>
                        <td>{t("leaderboard-page.questions")}</td>
                        <td>{t("leaderboard-page.streak")}</td>
                        <td>{t("leaderboard-page.score")}</td>
                    </tr>
                    {displayLeaders.map((row, i) => (
                        <tr
                            key={"row" + i}
                            className="even:bg-zinc-800 h-16 cursor-pointer"
                            style={
                                currentUser && row.username === currentUser.username
                                    ? { backgroundImage: "linear-gradient(to right, #3F35AD, #1F1E45)" }
                                    : {}
                            }
                        >
                            <td className="text-center">{row.rank}</td>
                            <td>
                                <div className="flex gap-2 h-full items-center">
                                    <a href={`/profiles/${row.username}`}>
                                        {row.name && row.name.length ? row.name : row.username}
                                    </a>
                                </div>
                            </td>
                            <td>{row.questions}</td>
                            <td>
                                <div className="text-orange-500 flex gap-1 h-full">
                                    {row.streak} <FireSVG />
                                </div>
                            </td>
                            <td style={GradientColorPicker(row.score)}>{row.score}%</td>
                        </tr>
                    ))}

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


function FireSVG() {
    return (
        <svg width="14" height="24" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.2334 9.29211C11.925 5.89211 7.26671 5.70878 8.39171 0.767109C8.47504 0.400442 8.08337 0.117109 7.76671 0.308776C4.74171 2.09211 2.56671 5.66711 4.39171 10.3504C4.54171 10.7338 4.09171 11.0921 3.76671 10.8421C2.25837 9.70044 2.10004 8.05878 2.23337 6.88378C2.28337 6.45044 1.71671 6.24211 1.47504 6.60044C0.908374 7.46711 0.333374 8.86711 0.333374 10.9754C0.650041 15.6421 4.59171 17.0754 6.00838 17.2588C8.03338 17.5171 10.225 17.1421 11.8 15.7004C13.5334 14.0921 14.1667 11.5254 13.2334 9.29211ZM5.50004 13.4838C6.70004 13.1921 7.31671 12.3254 7.48337 11.5588C7.75837 10.3671 6.68337 9.20044 7.40837 7.31711C7.68337 8.87544 10.1334 9.85044 10.1334 11.5504C10.2 13.6588 7.91671 15.4671 5.50004 13.4838Z"
                fill="url(#paint0_linear_958_164)"/>
            <defs>
                <linearGradient id="paint0_linear_958_164" x1="6.01333" y1="1.18545" x2="9.83715" y2="17.5733"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#DFEC27"/>
                    <stop offset="1" stopColor="#FE4346"/>
                </linearGradient>
            </defs>
        </svg>
    )
}

const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const hexToRgb = (hex: string): [number, number, number] => {
        if (!hex || typeof hex !== 'string' || !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
            throw new Error(`Invalid hex color: ${hex}`);
        }
        const bigint = parseInt(hex.replace('#', ''), 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    const rgbToHex = ([r, g, b]: [number, number, number]): string =>
        `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;

    try {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);

        const interpolated: [number, number, number] = [
            Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0])),
            Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1])),
            Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2])),
        ];

        return rgbToHex(interpolated);
    } catch (error) {
        console.error(error);
        return '#000000'; // Fallback color
    }
};

const GradientColorPicker = (percentage: number): React.CSSProperties => {
    const gradientColors = ['#FF0000', '#FF6A00', '#FFF600', '#89BB2C', '#2CBB5D'];
    const length = gradientColors.length;

    if (percentage < 0 || percentage > 100) {
        console.warn(`Percentage out of range: ${percentage}. Using fallback.`);
        return {color: '#000000'};
    }

    if (percentage === 100) {
        return {color: gradientColors[length - 1]};
    }

    const segment = Math.floor((percentage / 100) * (length - 1));
    const factor = (percentage / 100) * (length - 1) - segment;

    if (segment < 0 || segment >= length - 1) {
        console.error(`Segment out of bounds: ${segment}.`);
        return {color: '#000000'};
    }

    const color = interpolateColor(
        gradientColors[segment],
        gradientColors[segment + 1],
        factor
    );

    return {color};
};