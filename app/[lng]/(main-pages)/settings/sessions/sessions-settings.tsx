import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { redirect } from "next/navigation";
import SessionsBlock from "@/app/[lng]/(main-pages)/settings/sessions/session-block";
import {getSessions, terminateSession} from "@/services/auth/authService";
import {HttpException} from "@/utills/exceptions";
import Loader from "@/components/Loader/loader"; // Импортируйте класс исключения, если он у вас есть
import { useTranslation } from "react-i18next";

interface Session {
    tokenId: string;
    userAgent: string;
    currentSession: boolean;
    createdDate: string;
    remoteAddress: string;
    remoteHost: string;
    expiredAt: string;
}

interface SessionsResponse {
    webSessions?: Session[];
    mobileSessions?: Session[];
}

function SessionsSettings() {
    const [sessions, setSessions] = useState<SessionsResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {t} = useTranslation();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const activeSessions = await getSessions();
                setSessions(activeSessions);
            } catch (error) {
                if (error instanceof HttpException) {
                    redirect(`/error?status=${error.status}&message=${error.message}`);
                } else {
                    redirect("/error?status=500&message=Invalid error");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    if (loading)
        return (
            <div className="min-w-[300px] m-auto mt-64">
                <Loader />
            </div>
        );

    if (sessions == null) throw new Error("No sessions data found.");

    // Функция для удаления сессии из локального состояния по tokenId
    const removeSessionFromState = (tokenId: string) => {
        setSessions((prevSessions) => {
            if (!prevSessions) return prevSessions;
            return {
                webSessions: prevSessions.webSessions?.filter(
                    (s) => s.tokenId !== tokenId
                ),
                mobileSessions: prevSessions.mobileSessions?.filter(
                    (s) => s.tokenId !== tokenId
                ),
            };
        });
    };

    const terminateAllSessions = async () => {
        // Для всех сессий пробуем выполнить завершение
        const allSessions = [
            ...(sessions.webSessions || []),
            ...(sessions.mobileSessions || []),
        ];
        for (const session of allSessions) {
            try {
                await terminateSession(session.tokenId);
                // Если это не текущая сессия, удаляем из состояния
                if (!session.currentSession) {
                    removeSessionFromState(session.tokenId);
                }
            } catch (error) {
                if (error instanceof HttpException) {
                    redirect(`/error?status=${error.status}&message=${error.message}`);
                } else {
                    redirect("/error?status=500&message=Invalid error");
                }
            }
        }

        // Если текущая сессия была завершена, выполняем очистку и перезагрузку
        const currentSessionTerminated = allSessions.some(
            (s) => s.currentSession
        );
        if (currentSessionTerminated) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen flex flex-col flex-grow items-center p-6">
            <div className="w-full max-w-lg">
                <div className="flex flex-col gap-16 mb-8">
                    <SessionsBlock
                        deviceType="Web sessions"
                        deviceTypeSessions={sessions.webSessions || []}
                        onTerminate={removeSessionFromState}
                    />
                    <SessionsBlock
                        deviceType="Mobile sessions"
                        deviceTypeSessions={sessions.mobileSessions || []}
                        onTerminate={removeSessionFromState}
                    />
                </div>
            </div>

            {/* Terminate All Button */}
            <Button
                hidden={
                    !(
                        (sessions.webSessions && sessions.webSessions.length !== 0) ||
                        (sessions.mobileSessions && sessions.mobileSessions.length !== 0)
                    )
                }
                onClick={terminateAllSessions}
                type="default"
                danger
                className="border-red-500 text-red-500 w-full max-w-lg mt-6 py-2 text-lg"
            >
                {t('sessions-settings.terminateAll')}
            </Button>
        </div>
    );
}




export default SessionsSettings;
