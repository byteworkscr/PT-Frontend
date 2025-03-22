"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronRight, X, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useWallet } from "@/components/auth/hooks/useWallet.hook";
import { useWagmiMetaMask } from "@/hooks/useWagmiMetaMask";
import { useRouter } from "next/navigation";

interface CosmicWalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CosmicWalletConnectModal({
  isOpen,
  onClose,
}: CosmicWalletConnectModalProps) {
  const { handleConnect } = useWallet();
  const { connectMetaMask, isInstalled: isMetaMaskInstalled } =
    useWagmiMetaMask();
  const [connecting, setConnecting] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  const handleConnectClick = async (walletName: string) => {
    try {
      setConnecting(true);
      setSelectedWallet(walletName);
      setErrorMessage(null);

      if (walletName === "Stellar") {
        await handleConnect();
        onClose();
        router.push("/dashboard");
      } else if (walletName === "MetaMask") {
        if (!isMetaMaskInstalled) {
          setErrorMessage(
            "MetaMask is not installed. Please install MetaMask to continue.",
          );
          return;
        }

        const result = await connectMetaMask();
        if (result.success) {
          onClose();
          router.push("/dashboard");
        } else {
          setErrorMessage(
            result.error || "Failed to connect to MetaMask. Please try again.",
          );
        }
      } else {
        setErrorMessage(`${walletName} connection is not yet implemented.`);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        `Error connecting to ${walletName}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setConnecting(false);
      setSelectedWallet(null);
    }
  };

  // -- Cleaned-up, merged wallet array:
  const wallets = [
    {
      name: "Stellar",
      icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742516910/Stellar_xycxeb.webp",
      description: "Connect to your Stellar Wallet",
      color: "#3B99FC",
    },
    {
      name: "Starknet",
      icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742619452/starknet_x1099h.webp",
      description: "Connect to your Starknet Wallet",
      color: "#0052FF",
    },
    {
      name: "Coinbase",
      icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742515970/CoinBase_x7avru.webp",
      description: "Connect to your Coinbase Wallet",
      color: "#0052FF",
    },
    {
      name: "MetaMask",
      icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742515971/MetaMask_q9xjdy.webp",
      description: "Connect to your MetaMask wallet",
      color: "#F6851B",
    },
    {
      name: "Argent",
      icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742515969/ArgentX_n74l1n.webp",
      description: "Connect to your Argent Wallet",
      color: "#0052FF",
    },
    {
      name: "All Wallets",
      icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742516910/more_bpiewk.webp",
      description: "View all available wallet options",
      color: "#0052FF",
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 600;

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.5 + Math.random() * 1.5,
      speed: 0.05 + Math.random() * 0.1,
      color:
        Math.random() > 0.7
          ? Math.random() > 0.5
            ? "#0291fc"
            : "#c46be3"
          : "#FFFFFF",
    }));

    const animate = () => {
      if (!isOpen) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-[#1B2735]/95 to-[#090A0F]/95 border border-white/10 text-white backdrop-blur-md overflow-hidden p-0">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

        <div className="relative z-10 p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0291fc] to-[#c46be3]">
              Connect Wallet
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Connect your wallet to access the investment universe
            </DialogDescription>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4 text-white" />
            </DialogClose>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Alert className="bg-black/30 border border-[#0291fc]/30 text-white">
              <Shield className="h-4 w-4 text-[#0291fc]" />
              <AlertTitle>Secure connection</AlertTitle>
              <AlertDescription>
                We never store your private keys. Connections are secure and
                encrypted.
              </AlertDescription>
            </Alert>

            {errorMessage && (
              <Alert className="bg-red-500/20 border border-red-500/50 text-white">
                <AlertTitle>{errorMessage}</AlertTitle>
                {errorMessage.includes("MetaMask is not installed") && (
                  <AlertDescription className="mt-2">
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0291fc] hover:underline flex items-center gap-1"
                    >
                      Install MetaMask <ExternalLink className="h-3 w-3" />
                    </a>
                  </AlertDescription>
                )}
              </Alert>
            )}

            <div className="space-y-2">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className="relative flex w-full justify-start gap-4 p-6 bg-black/20 border-white/10 hover:bg-[#0291fc]/10 hover:border-[#0291fc]/30 text-white hover:text-gray-200 transition-all duration-200"
                  onClick={() => handleConnectClick(wallet.name)}
                  disabled={connecting}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 p-1"
                    style={{
                      background: `linear-gradient(135deg, ${wallet.color}20, transparent)`,
                    }}
                  >
                    {wallet.name === selectedWallet && connecting ? (
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#c46be3]"></div>
                    ) : (
                      <img
                        src={wallet.icon || "/placeholder.svg"}
                        alt={wallet.name}
                        className="h-8 w-8 object-contain"
                      />
                    )}
                  </div>

                  <div className="flex flex-col items-start justify-center">
                    <span className="font-medium text-base">{wallet.name}</span>
                    <span className="text-xs text-white/60">
                      {wallet.description}
                    </span>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-[#c46be3]" />
                </Button>
              ))}
            </div>

            <div className="text-center text-sm text-white/60 pt-2">
              New to Web3?{" "}
              <a
                href="#"
                className="text-[#0291fc] hover:text-[#0291fc]/80 hover:underline"
              >
                Learn more about wallets
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}