"use client";

import { useState } from "react";
import { ArrowDown, Info, RefreshCw, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { tokens } from "@/lib/tokens";
import { TokenIcon } from "@web3icons/react";
import { TokenSelector } from "../../TokenSelector";

interface SwapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function SwapModal({ open, onOpenChange }: SwapModalProps) {
  const [fromToken, setFromToken] = useState<Token>(tokens[0]);
  const [toToken, setToToken] = useState(tokens[2]);

  const [fromAmount, setFromAmount] = useState("1.0");
  const [toAmount, setToAmount] = useState("0.000167");

  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false);
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false);

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-white/10 bg-gradient-to-b from-[#1B2735] to-[#090A0F] text-white">
        <div className="relative z-10 bg-black/40 backdrop-blur-md overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <div className="flex justify-between items-center">
              <DialogTitle>Swap</DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <DialogDescription className="text-white/70">
              Exchange tokens at the best rates
            </DialogDescription>
          </DialogHeader>

          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">From</span>
                <span className="text-white/70">
                  Balance: {fromToken.balance} {fromToken.symbol}
                </span>
              </div>

              <div className="flex items-center gap-2 p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0.0"
                    className="border-0 bg-transparent text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                  />
                </div>

                <Button
                  variant="outline"
                  className="min-w-[140px] justify-between bg-black/30 border-white/10 text-white hover:bg-white/10 hover:text-gray-200"
                  onClick={() => setIsFromSelectorOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center overflow-hidden">
                      <TokenIcon symbol={fromToken.symbol} />
                    </div>
                    <span>{fromToken.symbol}</span>
                  </div>
                  <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center -my-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/30 border border-white/10 text-white hover:bg-white/10 z-10 rounded-full h-10 w-10"
                onClick={handleSwapTokens}
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">To</span>
                <span className="text-white/70">
                  Balance: {toToken.balance} {toToken.symbol}
                </span>
              </div>

              <div className="flex items-center gap-2 p-4 bg-black/20 rounded-lg border border-white/10">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    placeholder="0.0"
                    className="border-0 bg-transparent text-xl font-medium focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                  />
                </div>

                <Button
                  variant="outline"
                  className="min-w-[140px] justify-between bg-black/30 border-white/10 text-white hover:bg-white/10 hover:text-gray-200"
                  onClick={() => setIsToSelectorOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center overflow-hidden">
                      <TokenIcon symbol={toToken.symbol} />
                    </div>
                    <span>{toToken.symbol}</span>
                  </div>
                  <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg text-sm">
              <span className="text-white/70">Exchange Rate</span>
              <div className="flex items-center gap-1">
                <span>
                  1 {fromToken.symbol} = {toAmount} {toToken.symbol}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 text-white/70 hover:text-white"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh rate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="space-y-2 p-3 bg-black/20 rounded-lg text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Slippage Tolerance</span>
                <span>0.5%</span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-white/70">Estimated Fee</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 text-white/70 hover:text-white"
                        >
                          <Info className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Fee charged for this transaction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span>0.3%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/70">Minimum Received</span>
                <span>
                  {(Number.parseFloat(toAmount) * 0.995).toFixed(6)}{" "}
                  {toToken.symbol}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0">
            <Button className="w-full bg-gradient-to-r from-[#0291fc] to-[#c46be3] hover:from-[#0080e6] hover:to-[#b35fd0] border-0 hover:text-gray-200">
              Swap
            </Button>
          </CardFooter>
        </div>
      </DialogContent>

      <TokenSelector
        isOpen={isFromSelectorOpen}
        onClose={() => setIsFromSelectorOpen(false)}
        onSelectToken={(token) => setFromToken(token as Token)}
        excludeTokenId={toToken.id}
      />

      <TokenSelector
        isOpen={isToSelectorOpen}
        onClose={() => setIsToSelectorOpen(false)}
        onSelectToken={(token) => setFromToken(token as Token)}
        excludeTokenId={fromToken.id}
      />
    </Dialog>
  );
}
