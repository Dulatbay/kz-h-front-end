'use client';
import {redirect, useRouter} from "next/navigation";
import {Button} from "antd";

ErrorPage.getInitialProps = ({res, err}: { res: any; err: any }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return {statusCode};
};

interface ErrorPageProps {
    statusCode?: number;
}

export default function ErrorPage({statusCode}: ErrorPageProps) {
    const router = useRouter();

    const handleNavigation = async () => {
        router.push('/learn');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-lg text-center">
                <h1 className="text-6xl font-bold text-purple-500 mb-4">{statusCode || "Error"}</h1>
                <p className="text-2xl font-semibold mb-2">
                    {statusCode === 404
                        ? "Страница не найдена"
                        : "Что-то пошло не так. Попробуйте позже."}
                </p>
                <Button
                    onClick={() => handleNavigation()}>
                    Вернуться на главную
                </Button>
            </div>
        </div>
    );
}

