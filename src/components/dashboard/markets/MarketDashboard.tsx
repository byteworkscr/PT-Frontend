"use client";

import { useState, useEffect } from "react";
import { MarketRateCard } from "./MarketRateCard";
import { XLMPriceChart } from "./XLMPriceChart";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useMarketData } from "@/hooks/useMarketData";
import { RefreshCw } from "lucide-react";
import { ETHPriceChart } from "./ETHPriceChart";

const CRYPTO_PAIRS = [
  { base: "XLM", quote: "USD", highlighted: true, refreshInterval: 5000 },
  { base: "STRK", quote: "USD", highlighted: true, refreshInterval: 5000 },
  { base: "ETH", quote: "USD", refreshInterval: 12000 },
];

export function MarketDashboard() {
  const [previousRates, setPreviousRates] = useState<Record<string, number>>(
    {},
  );
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const { data: xlmData } = useMarketData({
    baseAsset: "XLM",
    quoteAsset: "USD",
    refreshInterval: 60000,
  });

  useEffect(() => {
    if (xlmData) {
      setPreviousRates((prev) => ({
        ...prev,
        "XLM-USD": prev["XLM-USD"] || xlmData.rate,
      }));
    }
  }, [xlmData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastUpdated(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative z-10 flex h-screen overflow-hidden">
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Live Market</h1>
              <p className="text-white/70">
                Live cryptocurrency exchange rates and market trends.
              </p>
            </div>
            <div className="flex items-center text-white/70 text-sm">
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              <span>Live updates • {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CRYPTO_PAIRS.map(
              ({ base, quote, highlighted, refreshInterval }) => (
                <MarketRateCard
                  key={`${base}-${quote}`}
                  baseAsset={base}
                  quoteAsset={quote}
                  previousRate={previousRates[`${base}-${quote}`]}
                  isHighlighted={highlighted}
                  refreshInterval={refreshInterval}
                />
              ),
            )}
          </div>

          <Tabs defaultValue="xlm" className="space-y-4 mb-5">
            <TabsContent value="xlm" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <XLMPriceChart />
                </div>
                <div>
                  <ETHPriceChart />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
