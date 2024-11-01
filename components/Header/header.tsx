'use client'

import { useEffect } from "react"

export default function Header(){

    let data = {
        "streak": undefined,
    };

    useEffect(() => {
        const url = "";
        const fetchData = async () => {
            const response = await fetch(url);
            if(response.status != 200){
                console.log(response.status);
                return;
            }
            const result = response.json() as any;
            data.streak = result.streak;
        }
    });

    return (
        <div className="h-20 bg-[#282828] max-sm:flex max-sm:justify-end max-sm:items-center">
            <input type="checkbox" id="check" className="hidden peer/navbar"/>
            <label htmlFor="check" className="cursor-pointer sm:hidden mr-4 order-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </label>
            <div className="px-8 sm:h-full flex sm:flex-row sm:items-center sm:justify-between max-sm:invisible max-sm:opacity-0 sm:static
            peer-checked/navbar:visible peer-checked/navbar:opacity-100 max-sm:transition-all max-sm:duration-150  peer-checked/navbar:max-sm:top-16 top-14 flex-col h-screen bg-[#282828] w-full max-w-[1200px] mx-auto fixed items-start max-sm:px-8">
                <div className="text-[#FFFFFF99] flex gap-6 max-sm:flex-col">
                    <h1 className="text-[#5348F2] font-bold">KzH</h1>
                    <a href="/learn">Learn</a>
                    <a href="/quizzes">Quizzes</a>
                    <a href="/map">Map</a>
                    <a href="/archive">Archive</a>
                    <a href="/shop">Shop</a>
                    <a href="/tournaments">Tournaments</a>
                </div>
                <div className="hidden sm:flex gap-3 items-center">
                    <div id="streak" className="flex gap-1">
                        <h3 className="text-sm text-[#F66F3E]">{data.streak}</h3>
                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2334 9.29174C11.925 5.89174 7.26671 5.70841 8.39171 0.766743C8.47504 0.400076 8.08337 0.116743 7.76671 0.30841C4.74171 2.09174 2.56671 5.66674 4.39171 10.3501C4.54171 10.7334 4.09171 11.0917 3.76671 10.8417C2.25837 9.70008 2.10004 8.05841 2.23337 6.88341C2.28337 6.45008 1.71671 6.24174 1.47504 6.60008C0.908374 7.46674 0.333374 8.86674 0.333374 10.9751C0.650041 15.6417 4.59171 17.0751 6.00838 17.2584C8.03338 17.5167 10.225 17.1417 11.8 15.7001C13.5334 14.0917 14.1667 11.5251 13.2334 9.29174ZM5.50004 13.4834C6.70004 13.1917 7.31671 12.3251 7.48337 11.5584C7.75837 10.3667 6.68337 9.20008 7.40837 7.31674C7.68337 8.87508 10.1334 9.85008 10.1334 11.5501C10.2 13.6584 7.91671 15.4667 5.50004 13.4834Z" fill="url(#paint0_linear_14_288)"/><defs><linearGradient id="paint0_linear_14_288" x1="6.01333" y1="1.18509" x2="9.83715" y2="17.5729" gradientUnits="userSpaceOnUse"><stop stopColor="#DFEC27"/><stop offset="1" stopColor="#FE4346"/></linearGradient></defs></svg>                    
                    </div>
                    <a href="/profile">
                        <img alt="pic" className="bg-[#B1B1B1] rounded-full h-8 w-8 aspect-square "/>
                    </a>
                </div>
            </div>
        </div>
    )
}
