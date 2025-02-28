'use client'
import {useTranslation} from "react-i18next";

export default function Home(){

    return (
        <div className="flex flex-col gap-12 w-full max-w-[1150px] mx-auto mt-8 p-4">
            <Recommendations/>
            <Tournaments/>
        </div>
    )
}

function Recommendations(){

    const recommendedQuizzes = [
        {
            "title": "100 важных дат",
            "imageUrl": "https://s3-alpha-sig.figma.com/img/3632/86c6/d8e5bdb9dddf8825c7f49e0f8f721dec?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=huH~BNBXR9IAevV1jfP7ks1JknajtwJ3EznTQ6DGE3dI-dl9MjjvkvlAjMte7ibakuLcm5JryEdXogT097VQ3Q5m9CGXYfg69MRKHPz9le8jY7TorX0MQ8L0-ii19-ZqVivC8jSEU34pJe7PmWfWILucWidHdLbOqOUSknx6sEE7HGNo7Tt27aIktZt5Y0dKtW-PQukyeoNYjk-0fWAPAipUdSrttaNvFD73dU7bek4OQ6NbxM31mwJFevXknfpVVVNSC-y1ugOvDWO4HuAhV714XACPEs3Y6-BQiT0BKuA3UqlTuJL7PWBQ8o~SPa4D85MtLYzeJ6AaLai9bShMow__",
            "description": "Осыны окы короче",
            "href": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D"
        },
        {
            "title": "Все казахские ханы",
            "imageUrl": "https://s3-alpha-sig.figma.com/img/3632/86c6/d8e5bdb9dddf8825c7f49e0f8f721dec?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=huH~BNBXR9IAevV1jfP7ks1JknajtwJ3EznTQ6DGE3dI-dl9MjjvkvlAjMte7ibakuLcm5JryEdXogT097VQ3Q5m9CGXYfg69MRKHPz9le8jY7TorX0MQ8L0-ii19-ZqVivC8jSEU34pJe7PmWfWILucWidHdLbOqOUSknx6sEE7HGNo7Tt27aIktZt5Y0dKtW-PQukyeoNYjk-0fWAPAipUdSrttaNvFD73dU7bek4OQ6NbxM31mwJFevXknfpVVVNSC-y1ugOvDWO4HuAhV714XACPEs3Y6-BQiT0BKuA3UqlTuJL7PWBQ8o~SPa4D85MtLYzeJ6AaLai9bShMow__",
            "description": "Осыны жб окы короче",
            "href": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D"
        },
        {
            "title": "ВОВ",
            "imageUrl": "https://s3-alpha-sig.figma.com/img/3632/86c6/d8e5bdb9dddf8825c7f49e0f8f721dec?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=huH~BNBXR9IAevV1jfP7ks1JknajtwJ3EznTQ6DGE3dI-dl9MjjvkvlAjMte7ibakuLcm5JryEdXogT097VQ3Q5m9CGXYfg69MRKHPz9le8jY7TorX0MQ8L0-ii19-ZqVivC8jSEU34pJe7PmWfWILucWidHdLbOqOUSknx6sEE7HGNo7Tt27aIktZt5Y0dKtW-PQukyeoNYjk-0fWAPAipUdSrttaNvFD73dU7bek4OQ6NbxM31mwJFevXknfpVVVNSC-y1ugOvDWO4HuAhV714XACPEs3Y6-BQiT0BKuA3UqlTuJL7PWBQ8o~SPa4D85MtLYzeJ6AaLai9bShMow__",
            "description": "Осыны тоже жб окы короче",
            "href": "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D"
        },
    ]

    const {t} = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between flex-wrap">
                <h1 className="text-2xl">{t('home-page.recommendations')}</h1>
                <a href="/quizzes" className="text-lg text-neutral-400">{t('home-page.seeMore')}</a>
            </div>
            <div className="flex gap-4 overflow-x-scroll">
                {
                    recommendedQuizzes.map((quiz, index) => {
                        return (
                            <QuizCard key={"quizCard" + index} imageUrl={quiz.imageUrl} title={quiz.title} description={quiz.description} href={quiz.href}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

function QuizCard({imageUrl, title, description, href} : {imageUrl: string, title: string, description: string, href: string}){
    return (
        <div className="rounded-md border border-white aspect-video w-1/3 min-w-72 relative">
            <img src={imageUrl} className="absolute top-0 left-0 -z-10 h-full w-full opacity-50"/>

            <div className="absolute left-2 bottom-2">
                <h1 className="text-xl">{title}</h1>
                <h2 className="text-md">{description}</h2>
            </div>
            
            <a className="bg-green-400 rounded-full flex justify-center items-center absolute right-2 bottom-2 w-8 h-8" href={href}>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.19075e-08 9.20095V0.799049C-3.78434e-05 0.658495 0.0336444 0.520418 0.0976459 0.39876C0.161647 0.277102 0.253702 0.176171 0.364515 0.106158C0.475328 0.0361443 0.600976 -0.000472533 0.728771 4.60401e-06C0.856567 0.000481741 0.981985 0.0380359 1.09236 0.108875L7.64001 4.31063C7.74956 4.381 7.84044 4.48171 7.9036 4.60273C7.96677 4.72375 8 4.86086 8 5.0004C8 5.13994 7.96677 5.27704 7.9036 5.39806C7.84044 5.51908 7.74956 5.6198 7.64001 5.69017L1.09236 9.89112C0.981985 9.96196 0.856567 9.99952 0.728771 10C0.600976 10.0005 0.475328 9.96386 0.364515 9.89384C0.253702 9.82383 0.161647 9.7229 0.0976459 9.60124C0.0336444 9.47958 -3.78434e-05 9.34151 3.19075e-08 9.20095Z" fill="white"/>
                </svg>
            </a>
        </div>
    )
}

function Tournaments(){
    const {t} = useTranslation();
    return (
        <div className="flex flex-col">
            <h1 className="text-2xl"> {t('home-page.tournaments')} </h1>
            <div className="text-xl text-neutral-400">
                Soon...
            </div>
        </div>
    )
}