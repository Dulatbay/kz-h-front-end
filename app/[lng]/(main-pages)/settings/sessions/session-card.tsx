import {redirect} from "next/navigation";
import {Button} from "antd";
import {Session} from "@/services/auth/types";
import React, {useState} from "react";
import {terminateSession} from "@/services/auth/authService";
import {HttpException} from "@/utills/exceptions";
import {DeviceIcon} from "@/components/icons/DeviceIcon";
import {format, parse} from "date-fns";
import { useTranslation } from "react-i18next";

interface SessionCardProps {
    session: Session;
    onTerminate: (tokenId: string) => void;
}

export default function SessionCard({session, onTerminate}: SessionCardProps) {
    const [opened, setOpened] = useState(false);
    const [terminating, setTerminating] = useState(false);
    const {t} = useTranslation();

    const handleTerminateSession = async (tokenId: string, currentSession: boolean) => {
        setTerminating(true);
        try {
            await terminateSession(tokenId);
            if (currentSession) {
                localStorage.clear();
                window.location.reload();
            } else {
                // После успешного завершения сессии убираем её из списка
                onTerminate(tokenId);
            }
        } catch (error) {
            if (error instanceof HttpException) {
                redirect(`/error?status=${error.status}&message=${error.message}`);
            } else {
                redirect("/error?status=500&message=Invalid error");
            }
        } finally {
            setTerminating(false);
        }
    };

    return (
        <div className="bg-[#1E1E1E] border border-white px-4 py-3 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                    <span className="text-xl">
                         <DeviceIcon device={"desktop"}/>
                    </span>
                    <div>
                        <p className="font-medium">{session.userAgent}</p>
                        {session.currentSession ? (
                            <p className="text-blue-400 text-sm">{t('session-card.yourCurrentSession')}</p>
                        ) : (
                            <p className="text-gray-400 text-sm">
                                {t('session-card.lassAccessedOn')} {session.createdDate}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => setOpened(!opened)}
                    className="text-gray-400 text-sm hover:text-white text-center whitespace-nowrap"
                >
                    {opened ? "Hide info" : "View more"}
                </button>
            </div>
            <div hidden={!opened} className="flex justify-between items-end">
                <div className="flex flex-col text-sm text-gray-400">
                    <p>{t('session-card.remoteAddress')} {session.remoteAddress}</p>
                    <p>{t('session-card.sessionExpiredAt')} {session.expiredAt}</p>
                </div>
                <Button
                    onClick={() =>
                        handleTerminateSession(session.tokenId, session.currentSession)
                    }
                    danger
                    loading={terminating}
                >
                    {t('session-card.terminateSession')}
                </Button>
            </div>
        </div>
    );
}