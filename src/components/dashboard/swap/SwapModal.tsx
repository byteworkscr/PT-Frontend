"use client";

import { useState } from "react";
import { ArrowDown, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TokenIcon } from "@web3icons/react";
import { TokenSelector } from "../../TokenSelector";
import useSwap from "@/hooks/useSwap";

interface SwapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SwapModal({ open, onOpenChange }: SwapModalProps) {
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    xlmToUsd,
    setFromAmount,
    setToAmount,
    handleSwapTokens,
    setFromToken,
    setToToken,
  } = useSwap();

  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false);
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false);

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
                  Balance: {fromToken.balance.toFixed(2)} {fromToken.symbol}{" "}
                  {xlmToUsd !== null &&
                    `(~$${(fromToken.balance * xlmToUsd).toFixed(2)})`}
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
                </Button>
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
        onSelectToken={(token) =>
          setFromToken({ ...token, value: token.balance || 0 })
        }
        excludeTokenId={toToken.id}
      />

      <TokenSelector
        isOpen={isToSelectorOpen}
        onClose={() => setIsToSelectorOpen(false)}
        onSelectToken={(token) =>
          setToToken({ ...token, value: token.balance || 0 })
        }
        excludeTokenId={fromToken.id}
      />
    </Dialog>
  );
}
