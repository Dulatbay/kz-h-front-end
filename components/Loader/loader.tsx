import React, { useEffect, useState } from 'react';

export default function Loader() {
    const [dots, setDots] = useState(0);
    const maxDots = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots === maxDots ? 0 : prevDots + 1));
        }, 500); // Интервал в миллисекундах

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="m-auto w-fit flex-col">
            <div className={"loader"}></div>
            <p className={'text-center mt-4 text-gray-400'}>
                Loading{'.'.repeat(dots)}{'\u00A0'.repeat(maxDots - dots)}
            </p>
        </div>
    );
}
