"use client";

import { useState } from "react";
import {
  ArrowDown,
  X,
  ExternalLink,
  AlertCircle,
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
import { tokens } from "@/lib/tokens";
import { TokenIcon } from "@web3icons/react";
import { TokenSelector } from "@/components/TokenSelector";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WithdrawModalProps {
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
  icon: string;
  isStablecoin?: boolean;
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [activeTab, setActiveTab] = useState("crypto");
  const [selectedToken, setSelectedToken] = useState(
    tokens.find((token) => token.symbol === "USDC") || tokens[0],
  );
  const [amount, setAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);

  const maxAmount = (selectedToken.balance * 0.9).toFixed(
    selectedToken.symbol === "USDC" || selectedToken.symbol === "ETH" ? 8 : 2,
  );

  const handleSetMaxAmount = () => {
    setAmount(maxAmount);
  };

  const validateCryptoWithdrawal = () => {
    return (
      amount !== "" &&
      Number.parseFloat(amount) > 0 &&
      Number.parseFloat(amount) <= selectedToken.balance &&
      withdrawAddress.trim() !== ""
    );
  };

  const handleWithdraw = () => {
    console.log("Processing withdrawal...");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-white/10 bg-gradient-to-b from-[#1B2735] to-[#090A0F] text-white">
        <div className="relative z-10 bg-black/40 backdrop-blur-md overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl">Withdraw Funds</DialogTitle>
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
              Withdraw your funds to a crypto wallet or bank account
            </DialogDescription>
          </DialogHeader>

          <Tabs
            value={activeTab}
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 bg-black/30 border border-white/10 mx-4 rounded-md">
              <TabsTrigger
                value="crypto"
                className="data-[state=active]:bg-white/10 text-white font-medium text-sm py-1.5"
              >
                Crypto Withdraw
              </TabsTrigger>
              <TabsTrigger
                value="transfer"
                className="data-[state=active]:bg-white/10 text-white font-medium text-sm py-1.5"
              >
                Bank Transfer
              </TabsTrigger>
            </TabsList>

            <TabsContent value="crypto" className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Label className="text-white/70 text-sm">Select Asset</Label>
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
                  <span className="text-white/70 text-sm">Available: </span>
                  <span className="text-sm">
                    {selectedToken.balance} {selectedToken.symbol}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label className="text-white/70 text-sm">Amount</Label>
                  <Button
                    variant="link"
                    className="text-xs text-[#0291fc] p-0 h-auto"
                    onClick={handleSetMaxAmount}
                  >
                    Max: {maxAmount} {selectedToken.symbol}
                  </Button>
                </div>
                <div className="flex items-center gap-2 p-2 bg-black/20 rounded-md border border-white/10">
                  <div className="flex-1">
                    <Input
                      type="number"
                      min="0"
                      max={selectedToken.balance.toString()}
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
                {Number.parseFloat(amount) > selectedToken.balance && (
                  <p className="text-red-400 text-xs mt-1">
                    Amount exceeds available balance
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="withdraw-address"
                    className="text-white/70 text-sm"
                  >
                    Withdraw
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 text-white/70 hover:text-white"
                        >
                          <AlertCircle className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Make sure this is the correct {selectedToken.symbol}{" "}
                          address
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="withdraw-address"
                  placeholder={`Enter your ${selectedToken.symbol} address`}
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  className="border-0 bg-black/20 rounded-md  border-white/10 text-white h-9"
                />
                <p className="text-xs text-white/70 mt-1">
                  Double-check your address. Withdrawals to incorrect addresses
                  cannot be recovered.
                </p>
              </div>

              <div className="bg-black/20 rounded-md border border-white/10 p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Network Fee</span>
                  <span>~0.0005 {selectedToken.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">You Will Receive</span>
                  <span>
                    {amount && Number.parseFloat(amount) > 0
                      ? (Number.parseFloat(amount) - 0.0005).toFixed(
                          selectedToken.symbol === "USDC" ||
                            selectedToken.symbol === "ETH"
                            ? 8
                            : 2,
                        )
                      : "0.00"}{" "}
                    {selectedToken.symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Estimated Arrival</span>
                  <span>~30 minutes</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200 h-10"
                onClick={handleWithdraw}
                disabled={!validateCryptoWithdrawal()}
              >
                Withdraw {selectedToken.symbol}
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
                    src="/img/meru.png"
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
