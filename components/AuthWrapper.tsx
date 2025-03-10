'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {ACCESS_TOKEN} from "@/utills/constants";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
}
