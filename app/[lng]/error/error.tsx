'use client';
import {useRouter} from "next/navigation";

interface ErrorPageProps {
    statusCode?: number;
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-lg text-center">
                <h1 className="text-6xl font-bold text-purple-500 mb-4">{statusCode || "Error"}</h1>
                <p className="text-2xl font-semibold mb-2">
                    {statusCode === 404
                        ? "Страница не найдена"
                        : "Что-то пошло не так. Попробуйте позже."}
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors mt-4"
                >
                    Вернуться на главную
                </button>
            </div>
        </div>
    );
}

// Получаем статус ошибки
ErrorPage.getInitialProps = ({ res, err }: { res: any; err: any }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};