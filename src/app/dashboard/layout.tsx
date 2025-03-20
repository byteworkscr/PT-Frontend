"use client";

import { useGlobalAuthenticationStore } from "@/components/auth/store/data";
import { redirect } from "next/navigation";
import React from "react";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { Header } from "@/layouts/Header";
import Sidebar from "@/layouts/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { address } = useGlobalAuthenticationStore();

  if (address === "") {
    redirect("/");
  }
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
};

export default Layout;
