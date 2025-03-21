"use client";

import { useState, useRef } from "react";
import { Copy, X, ExternalLink, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { tokens } from "@/lib/tokens";
import { TokenSelector } from "@/components/TokenSelector";
import { QRCodeSVG } from "qrcode.react";

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  value: number;
  iconSymbol: string;
  isStablecoin?: boolean;
}

export function AddFundsModal({ isOpen, onClose }: AddFundsModalProps) {
  const [activeTab, setActiveTab] = useState("deposit");

  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);

  const [copied, setCopied] = useState(false);
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCopyAddress = () => {
    const walletData = JSON.parse(
      localStorage.getItem("address-wallet") || "{}",
    );
    const currentWalletAddress = walletData.state?.address || "";
    navigator.clipboard.writeText(currentWalletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentWalletAddress =
    JSON.parse(localStorage.getItem("address-wallet") || "{}").state?.address ||
    "";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-white/10 bg-gradient-to-b from-[#1B2735] to-[#090A0F] text-white">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />
        <div className="relative z-10 bg-black/40 backdrop-blur-md overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl">Add Funds</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white hover:bg-white/10"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription className="text-white/70 text-sm">
              Deposit or transfer funds to your investment account
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 bg-black/30 border border-white/10 mx-4 rounded-md">
              <TabsTrigger
                value="deposit"
                className="data-[state=active]:bg-white/10 text-white font-medium text-sm py-1.5"
              >
                Deposit Crypto
              </TabsTrigger>
              <TabsTrigger
                value="transfer"
                className="data-[state=active]:bg-white/10 text-white font-medium text-sm py-1.5"
              >
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="p-4 space-y-4">
              <Alert className="bg-black/30 border border-[#0291fc]/30 text-white">
                <Shield className="h-4 w-4 text-[#0291fc]" />
                <AlertTitle>Secure Deposit</AlertTitle>
                <AlertDescription>
                  Only send {selectedToken.symbol} to this address. Sending any
                  other coin may result in permanent loss.
                </AlertDescription>
              </Alert>

              <div className="bg-black/20 rounded-md border border-white/10 p-4 space-y-3">
                <div className="relative w-full flex justify-center">
                  <div className="w-32 h-32 bg-white p-2 rounded-md flex items-center justify-center">
                    <QRCodeSVG
                      value={currentWalletAddress}
                      size={128}
                      bgColor="#FFFFFF"
                      fgColor="#1B2735"
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>

                <div className="w-full space-y-1">
                  <Label
                    htmlFor="wallet-address"
                    className="text-white/70 text-sm"
                  >
                    Wallet Address
                  </Label>
                  <div className="flex">
                    <Input
                      id="wallet-address"
                      value={currentWalletAddress}
                      readOnly
                      className="flex-1 border-0 bg-black/30 rounded-md  border-white/10 text-white text-xs truncate h-9"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-2 bg-black/30 border-white/10 text-white hover:bg-white/10 h-9 w-9"
                      onClick={handleCopyAddress}
                    >
                      {copied ? (
                        <span className="text-green-400 text-xs">Copied!</span>
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-white/70 mt-1">
                    Send only {selectedToken.symbol} to this address. Sending
                    any other coin may result in permanent loss.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transfer" className="p-4 space-y-4">
              <Button className="relative flex w-full justify-start gap-4 p-6 bg-black/30 border-white/10 hover:bg-[#0291fc]/20 hover:border-[#0291fc]/30 text-white hover:text-gray-200 transition-all duration-200 rounded-md">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 p-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #0291fc20, transparent)",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dfxes8tvx/image/upload/v1742517136/meru_xkk9ti.webp"
                    alt="Meru Bank"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <span className="font-medium text-base">Meru Bank</span>
                  <span className="text-xs text-white/60">
                    Fast transfers with zero fees
                  </span>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-[#c46be3]" />
              </Button>

              <div className="text-center text-xs text-white/70">
                <p>
                  Meru Bank transfers are processed instantly with zero fees.{" "}
                  <a
                    href="https://getmeru.com/"
                    className="text-[#0291fc] hover:underline"
                  >
                    Learn more <ExternalLink className="inline h-3 w-3" />
                  </a>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>

      <TokenSelector
        isOpen={isTokenSelectorOpen}
        onClose={() => setIsTokenSelectorOpen(false)}
        onSelectToken={(token) => setSelectedToken(token as Token)}
        excludeTokenId=""
      />
    </Dialog>
  );
}
