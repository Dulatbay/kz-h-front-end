import type {Metadata} from "next";
import './[lng]/globals.css'
import {StoreProvider} from "@/app/store/StoreProvider";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider, theme} from "antd";

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
        <StoreProvider>
            <html lang="en">
            <body
                className={`antialiased bg-[#1A1A1A]`}
            >
            <AntdRegistry>
                {children}
            </AntdRegistry>
            </body>
            </html>
        </StoreProvider>
    );
}