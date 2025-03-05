'use client'

import {Button, Menu, ConfigProvider, Input, MenuProps, Avatar, message} from "antd"
import DesktopSVG from "@/components/icons/DesktopSVG";
import MobileSVG from "@/components/icons/MobileSVG";
import React, {useEffect, useRef, useState} from "react";
import {redirect, useRouter} from "next/navigation";
import {getMe, getSessions, logout, terminateSession} from "@/services/auth/authService";
import {Session, SessionsResponse, UserResponse} from "@/services/auth/types";
import {HttpException} from "@/utills/exceptions";
import Loader from "@/components/Loader/loader";
import {editFullName, editUserImage} from "@/services/user/userService";
import {editPassword} from "@/services/auth/authService";
import {getImageUrl} from "@/utills/getHistoryData";
import UserIcon from "@/components/Header/user-icon";
import {useDispatch} from "react-redux";
import {resetUser, setCurrentUser} from "@/app/store/slices/user-slice/slice";
import SessionsSettings from "@/app/[lng]/(main-pages)/settings/sessions/sessions-settings";
import { useTranslation } from "react-i18next";
import { t } from "i18next";


export default function Settings() {
    const [openedTab, setOpenedTab] = useState('profile');
    const {t} = useTranslation();

    return (
        <ConfigProvider theme={{
            token: {
                colorBgContainer: "#161616",
                colorText: "#ffffff",
                colorBorder: "#444",
                colorPrimary: "#4CAF50",
            },
            components: {
                Button: {
                    colorPrimary: "#4CAF50",
                    colorPrimaryHover: "#3e8e41",
                    dangerShadow: 'transparent',
                    primaryShadow: 'transparent',
                    defaultHoverBorderColor: 'white',
                    defaultHoverColor: 'none',
                    defaultActiveColor: 'none',
                    defaultActiveBorderColor: 'none',
                    colorBgContainerDisabled: '#3d3d3d',
                    colorTextDisabled: '#cbcbcb'
                },
                Menu: {
                    darkItemBg: '#1A1A1A',
                    groupTitleFontSize: 12,
                    darkItemSelectedBg: '#282828',
                    darkGroupTitleColor: '#7D7D7D',
                },
                Input: {
                    colorBgContainer: "#1E1E1E",
                    colorText: "#ffffff",
                    borderRadius: 8,
                    colorTextPlaceholder: '#4f4f4f',
                    hoverBorderColor: 'white',
                    activeBorderColor: 'none'
                },
            },
        }}>

            <div className="w-full p-3 max-w-[800px] flex flex-wrap sm:flex-nowrap mx-auto mt-3">
                <Sidebar setOpenedTab={(value: string) => {
                    setOpenedTab(value)
                }}/>
                <Controller openedTab={openedTab}/>
            </div>

        </ConfigProvider>
    )
}

function Controller({openedTab}: { openedTab: string }) {
    switch (openedTab) {
        case 'sessions':
            return (<SessionsSettings/>);
        default:
            return (<ProfileSettings/>);
    }
}

const Sidebar = ({setOpenedTab}: { setOpenedTab: any }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    function handleLogout() {
        logout().then(() => {
            localStorage.clear();
            dispatch(resetUser());
            router.push("/login");
        });
    }

    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        {
            type: 'group',
            label: t('settings-page.settings'),
            children: [
                {
                    key: 'profile',
                    label: t('settings-page.profile'),
                },
                {
                    key: 'preferences',
                    label: t('settings-page.preferences'),
                    disabled: true
                },
                {
                    key: 'sessions',
                    label: t('settings-page.sessions'),
                },
            ],
        },
        {
            type: 'group',
            label: t('settings-page.support'),
            children: [
                {
                    key: 'help-center',
                    label: t('settings-page.helpCenter'),
                    disabled: true
                },
                {
                    key: 'about',
                    label: t('settings-page.aboutUs'),
                    disabled: true
                },
            ],
        },
        {
            onClick: handleLogout,
            key: 'logout',
            label: t('settings-page.logout'),
            danger: true,
            className: 'mt-auto border border-red-500 text-center',
        },
    ]

    return (
        <Menu
            onClick={(item) => setOpenedTab(item.key)}
            mode="vertical"
            theme="dark"
            defaultSelectedKeys={["profile"]}
            className="sm:max-w-60 min-w-60 rounded-lg text-white !border-[#282828] !border-r-[#282828] !border-r-2 border-2 !p-2 h-fit flex-grow !mb-8"
            items={items}
        />
    );
};

const ProfileSettings = () => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const [newProfile, setNewProfile] = useState<UserResponse | null>(null);
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const {t} = useTranslation();


    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const profileData = await getMe();
                setProfile(profileData);
                setAvatarUrl(profileData.imageUrl);
                setNewProfile(profileData);
            } catch (error) {
                if (error instanceof HttpException) {
                    message.error(error.message);
                } else {
                    redirect('/error?status=500&message=Invalid error`);')
                }
            } finally {
                setLoading(false);
            }
        }

        fetchSessions();
    }, [true]);

    const handleEditAvatar = () => {
        fileInputRef.current?.click();
    };

    const handleEditProfile = () => {
        if (!newProfile || !newProfile.firstName || !newProfile.lastName) return;
        editFullName(newProfile.firstName, newProfile.lastName);
        window.location.reload();
    };

    const handleEditPassword = () => {
        editPassword(oldPassword, newPassword);
        window.location.reload();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            try {
                const newImageUrl = await editUserImage(file);
                setAvatarUrl(newImageUrl);
                dispatch(setCurrentUser({...profile, imageUrl: newImageUrl}));
                message.success("Profile image loaded successfully");

            } catch (error) {
                if (error instanceof HttpException) {
                    message.error("Failed to load profile image");
                } else {
                    redirect('/error?status=500&message=Invalid error`);')
                }
            }
        }
    };


    if (loading)
        return (
            <div className={"min-w-[300px] m-auto mt-64"}>
                <Loader/>
            </div>
        )

    if (profile == null || !newProfile)
        throw new Error("No sessions data found.");

    return (
        <div className="min-h-screen flex flex-col items-center p-6 flex-grow">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
                {
                    avatarUrl ? (
                        <img src={getImageUrl(avatarUrl)} alt="avatar" className="w-40 h-40 rounded-full"/>
                    ) : (
                        <Avatar className="w-40 h-40" icon={<UserIcon/>} size={168}/>)
                }
                <Button className="mt-3" type="default" onClick={handleEditAvatar}>
                    {t('settings-page.editAvatar')}
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
            </div>

            {/* Input Fields */}
            <div className="w-full max-w-md mt-6 flex flex-col gap-1 *:mt-4">
                <label className="text-white">{t('settings-page.username')}</label>
                <Input onChange={(input) => setNewProfile((prev) => (prev ? {
                    ...prev,
                    username: input.target.value
                } : null))} defaultValue={profile.username} placeholder={t('settings-page.enterYourUsername')}/>

                <label className="text-white">{t('settings-page.firstName')}</label>
                <Input onChange={(input) => setNewProfile((prev) => (prev ? {
                    ...prev,
                    firstName: input.target.value
                } : null))} defaultValue={profile.firstName ? profile.firstName : ""}
                       placeholder={t('settings-page.enterYourFirstName')}/>

                <label className="text-white">{t('settings-page.lastName')}</label>
                <Input onChange={(input) => setNewProfile((prev) => (prev ? {
                    ...prev,
                    lastName: input.target.value
                } : null))} defaultValue={profile.lastName ? profile.lastName : ""} placeholder={t('settings-page.enterYourLastName')}/>

                <label className="text-white">{t('settings-page.email')}</label>
                <Input
                    onChange={(input) => setNewProfile((prev) => (prev ? {...prev, email: input.target.value} : null))}
                    defaultValue={profile.email} placeholder={t('settings-page.enterYourEmail')}/>
                <p className="text-sm text-gray-400 !mt-0">
                {t('settings-page.emailNotVerified')}{" "}
                    <a href="#" className="text-blue-400">
                    {t('settings-page.verifyNow')}
                    </a>
                </p>

                <Button onClick={handleEditProfile} disabled={JSON.stringify(profile) == JSON.stringify(newProfile)}
                        type="primary" block>
                    {t('settings-page.saveChanges')}
                </Button>
            </div>

            {/* Divider */}
            <div className="w-full my-4 h-[1px] bg-neutral-500"/>

            {/* Password Section */}
            <div className="w-full max-w-md">
                <div className="w-full flex justify-between items-center">
                    <label className="text-white">{t('settings-page.password')}</label>
                    <Button onClick={() => setShowEditPassword((prev) => !prev)}
                            className="mt-2 !bg-neutral-700 text-white">
                        {showEditPassword ? t('settings-page.hide') : t('settings-page.changePassword')}
                    </Button>
                </div>

                <div className="flex flex-col gap-1 *:mt-4" hidden={!showEditPassword}>
                    <label className="text-white">{t('settings-page.oldPassword')}</label>
                    <Input onChange={(input) => setOldPassword(input.target.value)}
                           placeholder={t('settings-page.enterYourOldPassword')}/>

                    <label className="text-white">{t('settings-page.newPassword')}</label>
                    <Input onChange={(input) => setNewPassword(input.target.value)}
                           placeholder={t('settings-page.enterYourNewPassword')}/>

                    <Button type="primary" onClick={handleEditPassword}>{t('settings-page.changePassword')}</Button>
                </div>

            </div>

            <div className="w-full my-4 h-[1px] bg-neutral-500"/>

            {/* Delete Account */}
            <div className="w-full max-w-md flex items-center justify-between">
                <label className="text-white">{t('settings-page.deleteMyAccount')}</label>
                <Button danger className="!px-10 !cursor-not-allowed opacity-40">
                {t('settings-page.delete')}
                </Button>
            </div>
        </div>
    );
};

