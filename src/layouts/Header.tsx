"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Bell, User, Star, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/components/auth/hooks/useWallet.hook";

export function Header() {
  const router = useRouter();
  const [walletConnected, setWalletConnected] = useState(true);
  const { handleConnect, handleDisconnect } = useWallet();

  const handleDisconnectWallet = () => {
    handleDisconnect();
    setWalletConnected(false);
    console.log("Wallet disconnected");
  };

  const handleConnectWallet = () => {
    handleConnect();
    setWalletConnected(true);
    console.log("Wallet connected");
  };

  const navigateToSettings = () => {
    router.push("/dashboard/profile");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-white/10 bg-black/40 backdrop-blur-md px-4 sm:px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="md:hidden flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] p-1">
            <Star className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-white">CosmicInvest</span>
        </div>
        <form className="hidden md:flex-1 md:flex max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full bg-white/5 border-white/10 rounded-md pl-8 pr-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#0291fc]"
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2">
          {walletConnected ? (
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-gray-200 hidden sm:flex"
              onClick={handleDisconnectWallet}
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Disconnect Wallet
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="bg-gradient-to-r from-[#0291fc] hover:text-gray-200 to-[#c46be3] border-0 text-white hover:from-[#0080e6] hover:to-[#b35fd0] hidden sm:flex"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-gray-200"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-transparent border-white/10 text-white hover:bg-white/10 hover:text-gray-200"
            onClick={navigateToSettings}
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
