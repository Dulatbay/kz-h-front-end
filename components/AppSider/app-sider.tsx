'use client'

import {ConfigProvider, Layout, Menu, theme} from 'antd';
import React, {ReactElement, useState} from "react";
import Icon, {
    CompassOutlined,
    ContainerOutlined, CrownFilled,
    ReadOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {appThemeConfig} from "@/app/appThemeConfig";
import LogoSVG from "@/components/icons/LogoSVG";

const {Sider} = Layout;

interface MenuItem {
    icon: ReactElement,
    label: string;
    href: string;
}

const menuItems = [
    {
        icon: <UserOutlined/>,
        label: 'Profile',
        href: '/profile',
    },
    {
        icon: <ReadOutlined />,
        label: 'Learn',
        href: '/learn',
    },
    {
        icon: <ContainerOutlined />,
        label: 'Quizzes',
        href: '/quizzes',
    },
    {
        icon: <CompassOutlined />,
        label: 'Map',
        href: '/map',
    },
    {
        icon: <CrownFilled />,
        label: 'Leaders',
        href: '/leaderboard',
    }
] as MenuItem[];


export const AppSider = () => {
    const router = useRouter();
    const items = menuItems.map(
        (item, index) => ({
            key: String(index + 1),
            icon: item.icon,
            label: item.label,
            onClick: () => router.push(item.href),
        }),
    );


    return (
        <ConfigProvider theme={appThemeConfig}>
            <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth="0"
                trigger={<div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '100%',
                    transform: 'translateX(70%)',
                    fontSize: '32px',
                    zIndex: 100,
                    cursor: 'pointer'
                }}>☰</div>}
                style={{
                    left: 0,
                }}
            >
                <div
                    className="w-full border-b border-t border-gray-500 py-6 mb-8 mt-4 flex justify-center items-center">
                    <LogoSVG/>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items}/>
            </Sider>
        </ConfigProvider>
    )
}