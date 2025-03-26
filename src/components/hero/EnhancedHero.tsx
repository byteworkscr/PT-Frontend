"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CosmicWalletConnectModal } from "../wallet/WalletConnectModal";

export default function EnhancedHeroWithStars() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const openWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <section className="relative z-10 py-20 md:py-32 text-white min-h-screen flex items-center">
        <div className="container flex flex-col items-center text-center">
          <div className="inline-block rounded-full bg-black/20 backdrop-blur-sm px-3 py-1 text-sm text-white mb-6 border border-[#0291fc]/30">
            The new era of smart investments
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl text-white drop-shadow-lg">
            Your guiding star in the universe of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0291fc] to-[#c46be3]">
              investments
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10 text-white/90 drop-shadow">
            We connect digital and physical investment ecosystems in a single
            AI-powered platform to help you make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 shadow-lg shadow-[#0291fc]/20"
              onClick={openWalletModal}
            >
              Connect Wallet
            </Button>
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">+10K</p>
              <p className="text-white/80">Active users</p>
            </div>
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">+25M</p>
              <p className="text-white/80">Transactions</p>
            </div>
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-white/80">Satisfaction</p>
            </div>
            <div className="flex flex-col items-center backdrop-blur-sm bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-3xl font-bold">+15</p>
              <p className="text-white/80">Ecosystems</p>
            </div>
          </div>
        </div>
      </section>

      <CosmicWalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={closeWalletModal}
      />
    </div>
  );
}
