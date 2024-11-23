import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/header";
import { StoreProvider } from "./store/StoreProvider";
import { ConfigProvider } from "antd";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// const theme = {
//     token: {
//       colorPrimary: '#22bb77',
//       colorPrimaryHover: '#11aa66',
//       colorPrimaryActive: '#11aa66',
//     },
// }

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
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1A1A1A]`}
          >
            <Header/>
            {children}
          </body>
        </html>
      </ConfigProvider>
    </StoreProvider>
  );
}
