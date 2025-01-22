import type {Metadata} from "next";
import "./globals.css";
import {ConfigProvider} from "antd";
import {StoreProvider} from "@/app/store/StoreProvider";
import {I18nextProvider} from "react-i18next";
import i18n from "@/i18n/i18n";

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
                {/*<Header/>*/}
                {children}
                </body>
                </html>
            </ConfigProvider>
        </StoreProvider>
    );
}