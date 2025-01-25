import {getImageUrl} from "@/utills/getHistoryData";
import {Button} from "antd";
import styles from "@/app/styles/ultima.module.scss";
import {ModuleResponse} from "@/services/module/types";
import UserSVG from "@/components/icons/UserSVG";
import {useTranslation} from "react-i18next";
import ClockSVG from "@/components/icons/ClockSVG";
import QuestionsSVG from "@/components/icons/QuestionsSVG";
import LightningSVG from "@/components/icons/LightningSVG";
import '@/i18n/i18n'

export default function Module({module}: { module: ModuleResponse }) {
    const {t} = useTranslation();
    const difficultyArray = new Array(module.difficulty).fill(false);

    return (
        <div
            className="relative w-full aspect-video flex flex-col justify-end gap-2 p-4 sm:p-6 md:p-8 z-20"
        >
            <img
                src={getImageUrl(module.imageUrl)}
                className="w-full h-full rounded-3xl inset-0 brightness-[40%] absolute -z-10 object-cover"
                alt={""}
            />
            <h2 className="text-base sm:text-lg md:text-xl font-bold">{module.name}</h2>
            <p className="text-sm sm:text-base md:text-lg text-wrap line-clamp-3">
                {module.topics.map(topic => topic.topicName).join(', ')}
            </p>
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm md:text-base">
                <div className="flex gap-2 items-center">
                    <QuestionsSVG/> {module.questionNumbers} {t('module.questions')}
                </div>
                <div className="flex gap-2 items-center">
                    <ClockSVG/> {module.duration} {t('module.minutes')}
                </div>
                <div className="flex gap-2 items-center">
                    <UserSVG/> {module.passedUsersCount} {t('module.users')}
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center text-xs sm:text-sm md:text-base">
                    Сложность:{' '}
                    {difficultyArray.map((_, index) => (
                        <LightningSVG key={index}/>
                    ))}
                </div>
                <Button
                    color={"primary"}
                    type={"primary"}
                    href={`/learn/${module.number}`}>{t('module.start')}</Button>
            </div>
        </div>
    )
}