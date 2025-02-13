"use client";
import Lottie from "lottie-react";
import { useState } from "react";
import animationData from "@/fire.json";

export default function FireAnimation() {
    const [hue, setHue] = useState(0);

    return (
        <div className="flex flex-col items-center">
            <div className="w-64 h-64" style={{ filter: `hue-rotate(${hue}deg)` }}>
                <Lottie animationData={animationData} loop={true} />
            </div>

            <div className="mt-4 w-64 flex flex-col items-center">
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(e) => setHue(Number(e.target.value))}
                    className="w-full cursor-pointer"
                />
                <p className="text-sm mt-2">Цвет: {hue}°</p>
            </div>

            <div className="mt-4 flex gap-2">
                <button className="p-2 bg-red-500 text-white" onClick={() => setHue(0)}>🔥 Оранжевый</button>
                <button className="p-2 bg-blue-500 text-white" onClick={() => setHue(180)}>🔥 Синий</button>
                <button className="p-2 bg-green-500 text-white" onClick={() => setHue(90)}>🔥 Зеленый</button>
            </div>
        </div>
    );
}
