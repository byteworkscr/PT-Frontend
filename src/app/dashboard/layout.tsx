"use client";

import BackgroundAnimation from "@/components/BackgroundAnimation";
import { Header } from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";

export default function LenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 flex h-screen overflow-hidden">
      <BackgroundAnimation />
      <Sidebar />
      <div className="flex-1 ">
        <Header />
        {children}
      </div>
    </div>
  );
}
