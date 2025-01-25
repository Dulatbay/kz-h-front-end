import type {Metadata} from "next";
import {Layout} from 'antd';
import React from "react";
import {AppSider} from "@/components/AppSider/app-sider";
import {AppContent} from "@/components/AppContent/app-content";
import AppHeader from "@/components/AppHeader/app-header";
import AppFooter from "@/components/AppFooter/app-footer";

export const metadata: Metadata = {
    title: "KzH",
    description: "Project that helps you study History of Kazakshtan",
};


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Layout>
            {/*<AppHeader />*/}

            <Layout>
                <AppSider/>
                <AppContent children={children} />
            </Layout>

            {/*<AppFooter/>*/}
        </Layout>
    );
}
