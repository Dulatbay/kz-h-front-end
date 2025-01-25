'use client'

import LearnPage from "@/app/[lng]/(main-pages)/learn/page";
import {ConfigProvider, Layout} from "antd";
import {AppSider} from "@/components/AppSider/app-sider";
import {appThemeConfig} from "@/app/appThemeConfig";

const {Content} = Layout;

export default function Home() {
    return (
        <>
            <Layout>
                {/*<AppHeader />*/}

                <Layout>
                    <AppSider/>
                    <ConfigProvider theme={appThemeConfig}>
                        <Content style={{
                            background: '#1a1a1a',
                            minHeight: '100vh',
                        }}>
                            <LearnPage/>
                        </Content>
                    </ConfigProvider>
                </Layout>

                {/*<AppFooter/>*/}
            </Layout>
        </>
    );
}
