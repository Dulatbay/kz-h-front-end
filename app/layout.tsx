import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/header";
import { StoreProvider } from "./store/StoreProvider";
import { ConfigProvider } from "antd";

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
            <Header/>
            {children}
          </body>
        </html>
      </ConfigProvider>
    </StoreProvider>
  );
}
