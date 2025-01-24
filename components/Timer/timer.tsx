'use client'

import {useState, useEffect} from "react";

interface TimerProps {
    seconds: number; // Количество секунд для отсчета
    onComplete: () => void; // Обработчик окончания отсчета
}

const Timer: React.FC<TimerProps> = ({seconds, onComplete}) => {
    const [count, setCount] = useState(seconds);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [count, onComplete]);

    return (
        <div className="flex items-center justify-center">
            <div className="relative flex items-center justify-center w-64 h-64 bg-[#5348F2] rounded-full">
                <span className="text-white text-6xl font-bold">{count}</span>
            </div>
        </div>
    );
};

export default Timer;