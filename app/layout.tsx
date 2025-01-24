import type {Metadata} from "next";
import './[lng]/globals.css'
import {ConfigProvider} from "antd";
import {StoreProvider} from "@/app/store/StoreProvider";

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
            <ConfigProvider>
                <html lang="en">
                <body
                    className={`antialiased bg-[#1A1A1A]`}
                >
                {children}
                </body>
                </html>
            </ConfigProvider>
        </StoreProvider>
    );
}