'use client'

import {Button, Menu, ConfigProvider, Input, MenuProps, Avatar, message} from "antd"
import DesktopSVG from "@/components/icons/DesktopSVG";
import MobileSVG from "@/components/icons/MobileSVG";
import React, {useEffect, useRef, useState} from "react";
import {redirect, useRouter} from "next/navigation";
import {getMe, getSessions, terminateSession} from "@/services/auth/authService";
import {Session, SessionsResponse, UserResponse} from "@/services/auth/types";
import {HttpException} from "@/utills/exceptions";
import Loader from "@/components/Loader/loader";
import {editUserImage} from "@/services/user/userService";
import {getImageUrl} from "@/utills/getHistoryData";
import UserIcon from "@/components/Header/user-icon";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "@/app/store/slices/user-slice/slice";


export default function Settings() {
    const [openedTab, setOpenedTab] = useState('profile');

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
                    defaultActiveBorderColor: 'none'
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

            <div className="w-full p-3 max-w-[800px] flex flex-wrap mx-auto mt-3">
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

    const router = useRouter();

    function handleLogout() {
        localStorage.clear();
        router.push("/login");
    }

    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        {
            type: 'group',
            label: 'Settings',
            children: [
                {
                    key: 'profile',
                    label: 'Profile',
                },
                {
                    key: 'preferences',
                    label: 'Preferences',
                    disabled: true
                },
                {
                    key: 'sessions',
                    label: 'Sessions',
                },
            ],
        },
        {
            type: 'group',
            label: 'Support',
            children: [
                {
                    key: 'help-center',
                    label: 'Help Center',
                    disabled: true
                },
                {
                    key: 'about',
                    label: 'About us',
                    disabled: true
                },
            ],
        },
        {
            onClick: handleLogout,
            key: 'logout',
            label: 'LOGOUT',
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
    const [profile, setProfile] = useState<UserResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const profileData = await getMe();
                setProfile(profileData);
                setAvatarUrl(profileData.imageUrl);
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

    if (profile == null)
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
                    Edit avatar
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
            <div className="w-full max-w-md mt-6 flex flex-col gap-2 *:mt-4">
                <label className="text-white">Username</label>
                <Input defaultValue={profile.username} placeholder="Enter your username"/>

                {/*<label className="text-white">Full Name</label>*/}
                {/*<Input defaultValue={profile} placeholder="Enter your full name"/>*/}

                <label className="text-white">Email</label>
                <Input defaultValue={profile.email} placeholder="Enter your email"/>
                <p className="text-sm text-gray-400 !mt-0">
                    Email not verified.{" "}
                    <a href="#" className="text-blue-400">
                        Verify now
                    </a>
                </p>

                <Button type="primary" block>
                    SAVE CHANGES
                </Button>
            </div>

            {/* Divider */}
            <div className="w-full my-4 h-[1px] bg-neutral-500"/>

            {/* Password Section */}
            <div className="w-full flex justify-between items-center max-w-md">
                <label className="text-white">Password</label>
                <Button className="mt-2 !bg-neutral-700 text-white">
                    Change password
                </Button>
            </div>

            <div className="w-full my-4 h-[1px] bg-neutral-500"/>

            {/* Delete Account */}
            <div className="w-full max-w-md flex items-center justify-between">
                <label className="text-white">Delete my account</label>
                <Button danger className="!px-10">
                    DELETE
                </Button>
            </div>
        </div>
    );
};

function SessionsSettings() {
    const [sessions, setSessions] = useState<SessionsResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const activeSessions = await getSessions();
                setSessions(activeSessions);

            } catch (error) {
                if (error instanceof HttpException) {
                    redirect(`/error?status=${error.status}&message=${error.message}`);
                } else {
                    redirect('/error?status=500&message=Invalid error`);')
                }
            } finally {
                setLoading(false);
            }
        }

        fetchSessions();
    }, [true]);


    if (loading)
        return (
            <div className={"min-w-[300px] m-auto mt-64"}>
                <Loader/>
            </div>
        )

    if (sessions == null)
        throw new Error("No sessions data found.");

    const terminateAllSessions = async () => {
        sessions.webSessions?.forEach(session => {
            try {
                terminateSession(session.tokenId);
            } catch (error) {
                if (error instanceof HttpException) {
                    redirect(`/error?status=${error.status}&message=${error.message}`);
                } else {
                    redirect('/error?status=500&message=Invalid error`);')
                }
            }
        });

        sessions.mobileSessions?.forEach(session => {
            try {
                terminateSession(session.tokenId);
            } catch (error) {
                if (error instanceof HttpException) {
                    redirect(`/error?status=${error.status}&message=${error.message}`);
                } else {
                    redirect('/error?status=500&message=Invalid error`);')
                }
            }
        });
    }

    return (
        <div className="min-h-screen flex flex-col flex-grow items-center p-6">
            <div className="w-full max-w-lg">
                <div className="flex flex-col">
                    <SessionsBlock deviceType="Web sessions" deviceTypeSessions={sessions.webSessions}/>
                    <SessionsBlock deviceType="Mobile sessions" deviceTypeSessions={sessions.mobileSessions}/>
                </div>
            </div>

            {/* Terminate All Button */}
            <Button
                hidden={!((sessions.webSessions && sessions.webSessions.length != 0) || (sessions.mobileSessions && sessions.mobileSessions.length != 0))}
                onClick={() => terminateAllSessions()}
                type="default"
                danger
                className="border-red-500 text-red-500 w-full max-w-lg mt-6 py-2 text-lg"
            >
                TERMINATE ALL
            </Button>
        </div>
    );
};

function SessionsBlock({deviceType, deviceTypeSessions}: { deviceType: string, deviceTypeSessions: Session[] }) {

    if (!deviceTypeSessions || deviceTypeSessions.length == 0) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            <h2 className="text-white text-lg font-semibold mb-3">{deviceType}</h2>
            <div className="flex flex-col gap-4">
                {
                    deviceTypeSessions.map((session, index) => (
                        <SessionCard key={index} session={session}/>
                    ))
                }
            </div>
        </>
    )
}

function SessionCard({session}: { session: Session }) {

    const [opened, setOpened] = useState(false);

    const handleTerminateSession = async (tokenId: string) => {
        terminateSession(tokenId);
    }

    return (
        <div className="bg-[#1E1E1E] border border-white px-4 py-3 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                    <span className="text-xl">{<DeviceIcon device={"desktop"}/>}</span>
                    <div>
                        <p className="font-medium">{session.userAgent}</p>
                        {session.currentSession ? (
                            <p className="text-blue-400 text-sm">Your current session</p>
                        ) : (
                            <p className="text-gray-400 text-sm">Last accessed
                                on {session.createdDate}</p>
                        )}
                    </div>
                </div>
                <a onClick={() => setOpened(!opened)}
                   className="text-gray-400 text-sm hover:text-white text-nowrap text-center">{opened ? "Hide info" : "View more"}</a>
            </div>
            <div hidden={!opened} className="flex w-full justify-between items-end">
                <div className="flex flex-col w-1/2">
                    <p>Remote address: {session.remoteAddress}</p>
                    <p>Remote host: {session.remoteHost}</p>
                    <p>Session expired at: {session.expiredAt}</p>
                </div>
                <Button onClick={() => handleTerminateSession(session.tokenId)} danger>Terminate session</Button>
            </div>
        </div>
    )
}

function DeviceIcon({device}: { device: string }) {
    if (device === "mobile") return <MobileSVG/>;
    else return <DesktopSVG/>;
}