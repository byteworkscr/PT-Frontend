import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Wallet } from "lucide-react";
import { useWagmiMetaMask } from "@/hooks/useWagmiMetaMask";

export function WalletInfo() {
  const { address, balance, network, isConnected } = useWagmiMetaMask();

  if (!isConnected) return null;

  return (
    <Card className="bg-black/40 border-white/10 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet className="h-5 w-5 text-[#F6851B]" />
          MetaMask Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-white/70">Address</span>
            <span className="font-mono text-sm">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Balance</span>
            <span>{balance ? `${balance} ETH` : ""}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70">Network</span>
            <span className="bg-[#F6851B]/20 text-[#F6851B] px-2 py-1 rounded text-xs">
              {network}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2 bg-transparent border-white/10 text-white hover:bg-white/10"
            onClick={() =>
              window.open(`https://etherscan.io/address/${address}`, "_blank")
            }
          >
            View on Explorer <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
