export default function ErrorPage({ searchParams }: { searchParams: { status?: string; message?: string } }) {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-red-600">Ошибка {searchParams.status || "Неизвестная"}</h1>
            <p className="text-lg">{searchParams.message || "Что-то пошло не так"}</p>
            <a href="/public" className="mt-4 text-blue-500 underline">Вернуться на главную</a>
        </div>
    );
}
