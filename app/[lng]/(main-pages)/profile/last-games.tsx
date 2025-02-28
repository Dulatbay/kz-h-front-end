import { useEffect, useState } from "react";
import { message } from "antd";
import { fetchLastGames } from "@/services/game/gameService";
import { HttpException } from "@/utills/exceptions";
import CustomPagination from "@/components/CustomPagination/CustomPagination";
import Loader from "@/components/Loader/loader";
import {LastGame} from "@/services/game/types";
import { useTranslation } from "react-i18next";

export default function LastGames() {
    const [games, setGames] = useState<LastGame[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [paginationParams, setPaginationParams] = useState({ pageNumber: 0, pageSize: 5 });
    const [totalElements, setTotalElements] = useState(0);
    const {t} = useTranslation();
    // Запрашиваем данные при первом рендере и при изменении пагинации
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchLastGames(paginationParams.pageNumber, paginationParams.pageSize);
                setGames(data.content);
                setTotalElements(data.totalElements);
            } catch (error) {
                if (error instanceof HttpException) {
                    // В случае ошибки — можно перенаправить или показать сообщение
                    message.error(`${t('last-games.message.error')} ${error.message}`);
                } else {
                    message.error(t('last-games.message.unexpectedError'));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [paginationParams]);

    if (loading) {
        return (
            <div className="mt-6">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <h1 className="text-3xl">{t('last-games.lastGames')}</h1>

            {/* Таблица игр */}
            <table cellPadding={16} className="gap-3 w-full">
                <colgroup>
                    <col className="w-24" />
                    <col className="flex-1" />
                    <col />
                </colgroup>
                <tbody>
                {games.map((game, index) => (
                    <GameRow key={index} row={game} />
                ))}
                </tbody>
            </table>

            {/* Компонент пагинации */}
            <CustomPagination
                totalElements={totalElements}
                paginationParams={paginationParams}
                setPaginationParams={setPaginationParams}
                loading={loading}
            />
        </div>
    );
}

// Компонент для строки игры
function GameRow({ row }: { row: LastGame }) {

    const {t} = useTranslation();

    let difficultyLabel = "";
    let difficultyColor = "";
    switch (row.level) {
        case "EASY":
            difficultyLabel = t('last-games.difficulty.easy');
            difficultyColor = "text-[#00B8A3]";
            break;
        case "MEDIUM":
            difficultyLabel = t('last-games.difficulty.easy');
            difficultyColor = "text-yellow-500";
            break;
        case "HARD":
            difficultyLabel = t('last-games.difficulty.easy');
            difficultyColor = "text-red-500";
            break;
        default:
            difficultyLabel = "";
            difficultyColor = "text-white";
    }

    const percentage = (row.correctAnswersCount / row.questionsCount) * 100;
    let percentageColor = "";
    if (percentage < 50) {
        percentageColor = "text-red-500";
    } else if (percentage < 80) {
        percentageColor = "text-yellow-500";
    } else {
        percentageColor = "text-[#00B8A3]";
    }

    return (
        <tr className="odd:bg-zinc-800 h-14">
            <td className={`${percentageColor} text-center`}>
                {row.correctAnswersCount} / {row.questionsCount}
            </td>
            <td>
                <a href={`/games/${row.gameId}`}>{row.quizTitle || <span className={"text-gray-400"}>{t('last-games.quizWasDeleted')}</span>}</a>
            </td>
            <td className={`${difficultyColor} text-center`}>{difficultyLabel}</td>
        </tr>
    );
}
