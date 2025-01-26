import type {Metadata} from "next";
import React from "react";
import Header from "@/components/Header/header";

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
        <>
            <Header/>
            {children}
        </>
    );
}
