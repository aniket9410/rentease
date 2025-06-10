import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import ClientOnly from "./components/clientonly";
import RegisterModal from "./components/modals/registerModals";
import ToasterProvider from "./providers/toasterProviders";
import LoginModal from "./components/modals/loginModal";
import SplashScreen from "./components/splashScreen";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/rentModal";
import SearchModal from "./components/modals/searchModal";

// Configure Geist fonts as variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure Nunito as a variable font
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito", // Add variable support
});

export const metadata: Metadata = {
  title: "RentEase",
  description: "RentEase app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body
        // Apply all font variables here
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      >
        <SplashScreen />
        <ClientOnly>
          <ToasterProvider/>
          <RegisterModal />
          <RentModal />
          <SearchModal />
          <LoginModal />
          < Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}