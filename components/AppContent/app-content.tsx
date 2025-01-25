'use client'

import {ConfigProvider, Layout, theme} from "antd";
import React from "react";
import {appThemeConfig} from "@/app/appThemeConfig";

const {Content} = Layout;
export const AppContent = ({children}: { children: React.ReactNode }) => {
    return (
        <ConfigProvider theme={appThemeConfig}>
            <Content style={{
                background: '#1a1a1a',
                minHeight: '100vh',
            }}>
                {children}
            </Content>
        </ConfigProvider>
    )
}