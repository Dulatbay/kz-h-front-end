'use client';

import {Avatar, Button} from "antd";
import {useTranslation} from "react-i18next";
import '@/i18n/i18n';
import {usePathname, useRouter} from 'next/navigation';
import {getMe} from "@/services/auth/authService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {useEffect, useState} from "react";
import {setCurrentUser} from "@/app/store/slices/user-slice/slice";
import Link from "next/link";
import UserIcon from "@/components/Header/user-icon";
import FireIcon from "@/components/icons/FireSVG2";
import LogoSVG from "@/components/icons/LogoSVG";
import {getImageUrl} from "@/utills/getHistoryData";
import LanguageSelector from "@/components/Header/LanguageSelector";

const oneDayInMillis = 24 * 60 * 60 * 1000;

export default function Header() {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userOptions.user);
    const lastFetched = useSelector((state: RootState) => state.userOptions.lastFetched);
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const cachedUser = JSON.parse(localStorage.getItem("user") || "null");
                const cachedLastFetched = Number(localStorage.getItem("lastFetched"));
                if (cachedUser && (cachedLastFetched || lastFetched) && Date.now() - cachedLastFetched < oneDayInMillis) {
                    dispatch(setCurrentUser(cachedUser));
                } else {
                    const fetchedUser = await getMe();
                    dispatch(setCurrentUser(fetchedUser));

                    localStorage.setItem("user", JSON.stringify(fetchedUser));
                    localStorage.setItem("lastFetched", String(Date.now()));
                    localStorage.setItem("fireDays", fetchedUser?.fireDays + "");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        router.prefetch("/learn");
        router.prefetch("/quizzes");
        router.prefetch("/map");
        router.prefetch("/leaderboard");

        fetchUser();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    const isActive = (path: string) => {
        const arr = pathname.split("/").filter(i => i);

        if (arr.length === 1) return path === '/';

        return '/' + arr[1] === path;
    };


    const closeMenu = () => {
        const checkbox = document.getElementById("check") as HTMLInputElement;
        if (checkbox) {
            checkbox.checked = false;
            setIsMenuOpen(false);
        }
    };

    const handleMenuToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsMenuOpen(e.target.checked);
    };

    return (
        <>
            <div className="h-20 bg-[#282828] max-sm:flex max-sm:justify-between max-sm:items-center z-50">
                <input type="checkbox" id="check" className="hidden peer/navbar" onChange={handleMenuToggle}/>
                <h1 className="cursor-pointer sm:hidden ml-8"><LogoSVG/></h1>
                <label htmlFor="check" className="cursor-pointer sm:hidden mr-4 order-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px"
                         fill="#e8eaed">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                    </svg>
                </label>
                <div
                    className="px-8 sm:h-full flex sm:flex-row sm:items-center sm:justify-between max-sm:invisible max-sm:opacity-0 sm:static
        peer-checked/navbar:visible peer-checked/navbar:opacity-100 max-sm:transition-all max-sm:duration-150 peer-checked/navbar:max-sm:top-16 top-14
        flex-col h-screen bg-[#282828] w-full max-w-[1200px] mx-auto absolute items-start max-sm:px-8 z-50"
                >
                    <div className="text-[#FFFFFF99] flex gap-6 max-sm:flex-col items-center max-sm:items-start">
                        <h1 className="text-[#5348F2] font-bold mr-8 max-sm:mr-0 max-sm:hidden"><LogoSVG/></h1>
                        <div className="sm:hidden mt-8">

                            {
                                user ? <Link href="/profile"
                                             className={isActive("/profile") ? "text-[#fff] underline underline-offset-8" : "text-[#A9A9A9]"}
                                             onClick={closeMenu}>
                                    {t('header.profile')}
                                </Link> : <Link href="/login"
                                                className={isActive("/login") ? "text-[#fff] underline underline-offset-8" : "text-yellow-400"}
                                                onClick={closeMenu}>
                                    Login
                                </Link>
                            }

                            <LanguageSelector/>
                        </div>
                        <Link href="/learn"
                              className={isActive("/learn") ? "text-[#fff] underline underline-offset-8" : "text-[#A9A9A9]"}
                              onClick={closeMenu}>
                            {t('header.learn')}
                        </Link>
                        <Link href="/quizzes"
                              className={isActive("/quizzes") ? "text-[#fff] underline underline-offset-8" : "text-[#A9A9A9]"}
                              onClick={closeMenu}>
                            {t('header.quizzes')}
                        </Link>
                        <Link href="/map"
                              className={`${isActive("/map") ? "text-[#fff] underline underline-offset-8" : "text-[#A9A9A9]"}`}
                              onClick={closeMenu}>
                            {t('header.map')}
                        </Link>
                        <Link href="/leaderboard"
                              className={isActive("/leaderboard") ? "text-[#fff] underline underline-offset-8" : "text-[#A9A9A9]"}
                              onClick={closeMenu}>
                            {t('header.leaders')}
                        </Link>

                    </div>
                    {/* Desktop Version */}
                    <div className="hidden sm:flex gap-8 items-center">
                        <LanguageSelector/>
                        <div className={"flex justify-center items-center gap-2"}>
                            {user ? (
                                <div id="streak" className="flex gap-2">
                                    <h3 className={`text-sm ${!user?.wasPlayedYesterday || !user?.wasPlayedToday ? "text-gray-400" : "text-[#F66F3E]"} `}>{user?.fireDays}</h3>
                                    <FireIcon
                                        variant={!user?.wasPlayedYesterday || !user?.wasPlayedToday ? "gray" : "default"}/>
                                </div>
                            ) : (
                                <></>
                            )}
                            {loading ? (
                                <Link href="/profile">
                                    <Avatar shape="circle" icon={<UserIcon/>} alt="pic"/>
                                </Link>
                            ) : user ? (
                                <Link href="/profile">
                                    {user?.imageUrl ? <Avatar src={getImageUrl(user.imageUrl)} alt=""/> :
                                        <Avatar icon={<UserIcon/>} alt="pic"/>}
                                </Link>
                            ) : (
                                <Button href={'/login'}>Login</Button>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}



