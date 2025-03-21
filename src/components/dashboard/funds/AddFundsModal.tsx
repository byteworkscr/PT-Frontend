"use client";

import { useState, useRef } from "react";
import {
  ArrowDown,
  Copy,
  X,
  ExternalLink,
  Shield,
  ChevronRight,
} from "lucide-react";
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
import { TokenIcon } from "@web3icons/react";
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

  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const walletAddresses: Record<string, string> = {
    BTC: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    ETH: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    SOL: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
    USDT: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    USDC: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddresses[selectedToken.symbol] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentWalletAddress = walletAddresses[selectedToken.symbol] || "";

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
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Label className="text-white/70 text-sm">
                    Select Cryptocurrency
                  </Label>
                  <Button
                    variant="outline"
                    className="w-[120px] justify-between bg-black/30 border-white/10 text-white hover:bg-white/10 hover:text-gray-200 h-9"
                    onClick={() => setIsTokenSelectorOpen(true)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-black/30 flex items-center justify-center overflow-hidden">
                        <TokenIcon
                          symbol={selectedToken.iconSymbol}
                          size={16}
                        />
                      </div>
                      <span className="text-sm">{selectedToken.symbol}</span>
                    </div>
                    <ArrowDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                  </Button>
                </div>
                <div className="text-right">
                  <span className="text-white/70 text-sm">Balance: </span>
                  <span className="text-sm">
                    {selectedToken.balance} {selectedToken.symbol}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label className="text-white/70 text-sm">
                    Expected Amount
                  </Label>
                  <span className="text-xs text-white/70">Optional</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-black/20 rounded-md border border-white/10">
                  <div className="flex-1">
                    <Input
                      type="number"
                      min="0"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-0 bg-transparent text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-md">
                    <div className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center overflow-hidden">
                      <TokenIcon symbol={selectedToken.iconSymbol} size={14} />
                    </div>
                    <span className="text-sm">{selectedToken.symbol}</span>
                  </div>
                </div>
              </div>

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

              <Button
                className="w-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200 h-10"
                onClick={onClose}
              >
                I have Made My Deposit
              </Button>
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
