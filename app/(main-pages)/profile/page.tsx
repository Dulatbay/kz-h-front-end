'use client'

import {use, useEffect, useState} from "react"

type User = {
    id: string;
    fullName: string | null;
    username: string;
    imageUrl: string | null;
    email: string;
    fireDays: number;
    wasPlayedYesterday: boolean;
    answeredQuestionsCount: number;
    score: number;
    accuracy: number;
    joinDate: string | undefined | null;
};

export default function Profile() {


    const [userData, setUserData] = useState({
        "id": "6787c281b73c4f5aff016e50",
        "fullName": null,
        "username": "",
        "imageUrl": null,
        "email": "",
        "fireDays": 0,
        "wasPlayedYesterday": false,
        "answeredQuestionsCount": 0,
        "score": 0.0,
        "accuracy": 0.0,
        "joinDate": "September 2024",
    } as User);
    const token = "";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${process.env.API_URL}/auth/me`, {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IkFETUlOIiwiZW1haWwiOiJzdHJpbmciLCJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MzcwMzE1NjAsImV4cCI6MTczNzExNzk2MH0._-O9zRt63R070XM00y7i1SfNZVBlCvvGeRHCxcSfiQQ",
                    }
                });
                const data = await response.json();
                if (response.status == 200)
                    setUserData(data);
                else {

                }
                // setUserData({
                //     "id": "6787c281b73c4f5aff016e50",
                //     "fullName": null,
                //     "username": "testuser",
                //     "imageUrl": null,
                //     "email": "testuser@gmail.com",
                //     "fireDays": 0,
                //     "wasPlayedYesterday": false,
                //     "questions": 0,
                //     "score": 0.0,
                //     "accuracy": 0.0
                // });
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchUserData();
    }, [token])


    return (
        <div className="w-full p-3 max-w-[800px] flex flex-col mx-auto gap-8 mt-3">
            <div className="flex flex-col ">
                <div className="w-full h-[400px] relative bg-zinc-800">
                    <button className="right-2 top-2 absolute">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.6407 10.98C17.6818 10.66 17.7127 10.34 17.7127 10C17.7127 9.66 17.6818 9.34 17.6407 9.02L19.8099 7.37C20.0052 7.22 20.0566 6.95 19.9333 6.73L17.8772 3.27C17.7538 3.05 17.4762 2.97 17.25 3.05L14.6902 4.05C14.1556 3.65 13.5799 3.32 12.9528 3.07L12.5621 0.42C12.5313 0.18 12.3154 0 12.0584 0H7.94616C7.68915 0 7.47326 0.18 7.44242 0.42L7.05176 3.07C6.42464 3.32 5.84894 3.66 5.31435 4.05L2.7545 3.05C2.51804 2.96 2.25075 3.05 2.12738 3.27L0.0712765 6.73C-0.0623704 6.95 -0.00068705 7.22 0.194643 7.37L2.36384 9.02C2.32271 9.34 2.29187 9.67 2.29187 10C2.29187 10.33 2.32271 10.66 2.36384 10.98L0.194643 12.63C-0.00068705 12.78 -0.0520898 13.05 0.0712765 13.27L2.12738 16.73C2.25075 16.95 2.52832 17.03 2.7545 16.95L5.31435 15.95C5.84894 16.35 6.42464 16.68 7.05176 16.93L7.44242 19.58C7.47326 19.82 7.68915 20 7.94616 20H12.0584C12.3154 20 12.5313 19.82 12.5621 19.58L12.9528 16.93C13.5799 16.68 14.1556 16.34 14.6902 15.95L17.25 16.95C17.4865 17.04 17.7538 16.95 17.8772 16.73L19.9333 13.27C20.0566 13.05 20.0052 12.78 19.8099 12.63L17.6407 10.98ZM10.0023 13.5C8.01813 13.5 6.40408 11.93 6.40408 10C6.40408 8.07 8.01813 6.5 10.0023 6.5C11.9864 6.5 13.6005 8.07 13.6005 10C13.6005 11.93 11.9864 13.5 10.0023 13.5Z"
                                fill="#91898C"/>
                        </svg>
                    </button>
                    <img hidden={userData.imageUrl == null} className="bg-zinc-800 w-full h-full object-cover"/>
                </div>
                <h1 className="text-4xl mt-4">{userData.fullName ? userData.fullName : "<Set Your Name>"}</h1>
                <div className="flex text-gray-500 w-full gap-1">
                    <h3>@{userData.username}</h3>
                    ·
                    <h3>Joined {userData.joinDate ? userData.joinDate : "September 2024"}</h3>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl">Overview</h1>
                <div className="flex max-sm:flex-wrap w-full gap-3 justify-around">
                    <Stat svg="fire" textColor="text-orange-500" title="Fire days" stat={userData.fireDays.toString()}/>
                    <Stat svg="score" textColor="text-green-600" title="Score" stat={userData.score.toString() + "%"}/>
                    <Stat svg="questions" textColor="text-orange-600" title="Questions"
                          stat={userData.answeredQuestionsCount.toString()}/>
                    <Stat svg="accuracy" textColor="text-red-600" title="Accuracy"
                          stat={userData.accuracy.toString() + "%"}/>
                </div>
            </div>
        </div>
    )
}

function SVG({svg}: { svg: "fire" | "score" | "questions" | "accuracy" }) {
    switch (svg) {
        case "fire":
            return (
                <svg width="20" height="30" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.2334 9.29211C11.925 5.89211 7.26671 5.70878 8.39171 0.767109C8.47504 0.400442 8.08337 0.117109 7.76671 0.308776C4.74171 2.09211 2.56671 5.66711 4.39171 10.3504C4.54171 10.7338 4.09171 11.0921 3.76671 10.8421C2.25837 9.70044 2.10004 8.05878 2.23337 6.88378C2.28337 6.45044 1.71671 6.24211 1.47504 6.60044C0.908374 7.46711 0.333374 8.86711 0.333374 10.9754C0.650041 15.6421 4.59171 17.0754 6.00838 17.2588C8.03338 17.5171 10.225 17.1421 11.8 15.7004C13.5334 14.0921 14.1667 11.5254 13.2334 9.29211ZM5.50004 13.4838C6.70004 13.1921 7.31671 12.3254 7.48337 11.5588C7.75837 10.3671 6.68337 9.20044 7.40837 7.31711C7.68337 8.87544 10.1334 9.85044 10.1334 11.5504C10.2 13.6588 7.91671 15.4671 5.50004 13.4838Z"
                        fill="url(#paint0_linear_958_164)"/>
                    <defs>
                        <linearGradient id="paint0_linear_958_164" x1="6.01333" y1="1.18545" x2="9.83715" y2="17.5733"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#DFEC27"/>
                            <stop offset="1" stopColor="#FE4346"/>
                        </linearGradient>
                    </defs>
                </svg>
            )
        case "score":
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z"
                        stroke="#2CBB5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.59003 11L11.09 12.5L15.09 8.5" stroke="#2CBB5D" strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            )
        case "questions":
            return (
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_958_176)">
                        <path
                            d="M16.2222 1H3.77778C2.8 1 2 1.95 2 3.11111V17.8889C2 19.05 2.8 20 3.77778 20H16.2222C17.2 20 18 19.05 18 17.8889V3.11111C18 1.95 17.2 1 16.2222 1ZM11.7778 15.7778H5.55556V13.6667H11.7778V15.7778ZM14.4444 11.5556H5.55556V9.44444H14.4444V11.5556ZM14.4444 7.33333H5.55556V5.22222H14.4444V7.33333Z"
                            fill="#F66F3E"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_958_176">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>

            )
        case "accuracy":
            return (
                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 0C4.02931 0 0 4.02931 0 9C0 13.9707 4.02931 18 9 18C13.9707 18 18 13.9707 18 9C18 4.02931 13.9707 0 9 0ZM9 15.6774C5.30964 15.6774 2.32258 12.6911 2.32258 9C2.32258 5.30964 5.30891 2.32258 9 2.32258C12.6904 2.32258 15.6774 5.30891 15.6774 9C15.6774 12.6904 12.6911 15.6774 9 15.6774ZM9 4.35484C6.43464 4.35484 4.35484 6.43464 4.35484 9C4.35484 11.5654 6.43464 13.6452 9 13.6452C11.5654 13.6452 13.6452 11.5654 13.6452 9C13.6452 6.43464 11.5654 4.35484 9 4.35484ZM9 11.3226C7.71931 11.3226 6.67742 10.2807 6.67742 9C6.67742 7.71931 7.71931 6.67742 9 6.67742C10.2807 6.67742 11.3226 7.71931 11.3226 9C11.3226 10.2807 10.2807 11.3226 9 11.3226Z"
                        fill="#FE4346"/>
                </svg>
            )
    }
}

function Stat({svg, textColor, stat, title}: {
    svg: "fire" | "score" | "questions" | "accuracy",
    textColor: string,
    stat: string,
    title: string
}) {
    return (
        <div className="rounded-lg border-white border py-2 px-3  flex w-1/4 min-w-32 gap-2 items-center">
            <SVG svg={svg}/>
            <div className="">
                <strong className={`${textColor} text-xl`}>{stat}</strong>
                <h2 className="text-gray-600">{title}</h2>
            </div>
        </div>
    )
}