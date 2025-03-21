"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { useMarketData } from "@/hooks/useMarketData";

interface MarketRateCardProps {
  baseAsset?: string;
  quoteAsset?: string;
  refreshInterval?: number;
  previousRate?: number | null;
  isHighlighted?: boolean;
}

export function MarketRateCard({
  baseAsset = "XLM",
  quoteAsset = "USD",
  refreshInterval = 10000,
  previousRate = null,
  isHighlighted = false,
}: MarketRateCardProps) {
  const { data, loading, error } = useMarketData({
    baseAsset,
    quoteAsset,
    refreshInterval,
  });

  const [priceChanged, setPriceChanged] = useState(false);
  const [priceIncreased, setPriceIncreased] = useState(false);
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [percentChange, setPercentChange] = useState<number | null>(null);

  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!data || loading) return;

    if (lastPrice !== null) {
      if (data.rate !== lastPrice) {
        setPriceIncreased(data.rate > lastPrice);

        setPriceChanged(true);

        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        animationTimeoutRef.current = setTimeout(() => {
          setPriceChanged(false);
        }, 1000);
      }
    }

    const initialRate = previousRate || lastPrice;
    if (initialRate) {
      const change = ((data.rate - initialRate) / initialRate) * 100;
      setPercentChange(change);
    }

    setLastPrice(data.rate);

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [data, loading, lastPrice, previousRate]);

  const priceAnimationClass = priceChanged
    ? priceIncreased
      ? "animate-pulse-green"
      : "animate-pulse-red"
    : "";

  const isPositive = percentChange ? percentChange > 0 : false;

  return (
    <Card
      className={`bg-black/40 backdrop-blur-md border-white/10 text-white transition-all duration-300 ${isHighlighted ? "" : ""} ${priceChanged ? "shadow-glow" : ""}`}
    >
      <CardHeader className="pb-2">
        <CardDescription className="text-white/70 flex justify-between items-center">
          <span>
            {baseAsset}/{quoteAsset}
          </span>
          {!loading && !error && data && (
            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
              Live
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-8 bg-white/10 rounded w-2/3"></div>
            <div className="h-4 bg-white/10 rounded w-1/3"></div>
          </div>
        ) : error ? (
          <div className="text-red-500">Error cargando la tasa de cambio</div>
        ) : data ? (
          <>
            <div
              className={`text-2xl font-bold transition-all duration-300 ${priceAnimationClass}`}
            >
              ${data.rate.toFixed(baseAsset === "XLM" ? 4 : 2)}
            </div>
            <div className="flex items-center mt-1 text-sm">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1 text-red-400" />
              )}
              <span className={isPositive ? "text-green-400" : "text-red-400"}>
                {isPositive ? "+" : ""}
                {percentChange ? percentChange.toFixed(2) : "0.00"}%
              </span>
              <span className="ml-auto text-white/50 text-xs">
                {new Date(data.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </>
        ) : (
          <div className="text-white/70">No hay datos disponibles</div>
        )}
      </CardContent>
    </Card>
  );
}
