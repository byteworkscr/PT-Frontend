"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { tokens } from "@/lib/tokens";
import { TokenIcon } from "@web3icons/react";

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: any) => void;
  excludeTokenId?: string;
}

export function TokenSelector({
  isOpen,
  onClose,
  onSelectToken,
  excludeTokenId,
}: TokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens
    .filter((token) => !excludeTokenId || token.id !== excludeTokenId)
    .filter(
      (token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-b from-[#1B2735]/95 to-[#090A0F]/95 border border-white/10 text-white backdrop-blur-md">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>

        <div className="relative my-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          <Input
            placeholder="Search by name or symbol"
            className="pl-9 bg-black/20 border-white/10 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {filteredTokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-3 hover:bg-white/10 rounded-lg cursor-pointer"
              onClick={() => {
                onSelectToken(token);
                onClose();
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center overflow-hidden">
                  <TokenIcon symbol={token.iconSymbol} size={24} />
                </div>
                <div>
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-xs text-white/70">{token.name}</div>
                </div>
              </div>
              <div className="text-sm text-white/70">{token.balance}</div>
            </div>
          ))}

          {filteredTokens.length === 0 && (
            <div className="text-center py-4 text-white/50">
              No tokens found matching "{searchQuery}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
