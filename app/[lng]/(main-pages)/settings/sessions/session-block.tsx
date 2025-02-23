import {Session} from "@/services/auth/types";
import React from "react";
import SessionCard from "@/app/[lng]/(main-pages)/settings/sessions/session-card";

interface SessionsBlockProps {
    deviceType: string;
    deviceTypeSessions: Session[];
    onTerminate: (tokenId: string) => void;
}

export default function SessionsBlock({ deviceType, deviceTypeSessions, onTerminate }: SessionsBlockProps) {
    if (!deviceTypeSessions || deviceTypeSessions.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-white text-lg font-semibold mb-3">{deviceType}</h2>
            <div className="flex flex-col gap-4">
                {deviceTypeSessions.map((session, index) => (
                    <SessionCard key={index} session={session} onTerminate={onTerminate} />
                ))}
            </div>
        </div>
    );
}