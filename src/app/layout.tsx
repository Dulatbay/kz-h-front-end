import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import Header from "@/widgets/Header/Header";
import { StoreProvider } from "@/app/providers/StoreProvider";
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
