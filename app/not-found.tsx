'use client';
import {Button} from "antd";
import {useRouter} from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();


    const handleNavigation = async () => {
        router.push('/learn');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-lg text-center">
                <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
                <p className="text-2xl font-semibold mb-2">Страница не найдена</p>
                <p className="text-gray-400 mb-6">
                    Кажется, вы заблудились. Страница, которую вы ищете, не существует.
                </p>
                <Button
                    onClick={() => handleNavigation()}>
                    Вернуться на главную
                </Button>
            </div>
        </div>
    );
}
