"use client";

import { useState, useEffect } from "react";

export type ExchangeRate = {
  time: string;
  asset_id_base: string;
  asset_id_quote: string;
  rate: number;
};

export type MarketDataOptions = {
  baseAsset?: string;
  quoteAsset?: string;
  refreshInterval?: number | null;
};

export function useMarketData({
  baseAsset = "XLM",
  quoteAsset = "USD",
  refreshInterval = null,
}: MarketDataOptions = {}) {
  const [data, setData] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rest.coinapi.io/v1/exchangerate/${baseAsset}/${quoteAsset}`,
          {
            headers: {
              "X-CoinAPI-Key": process.env.NEXT_PUBLIC_COINAPI_KEY!,
            },
          },
        );

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const responseData = await res.json();
        console.log("Market data received:", responseData);

        if (
          responseData.asset_id_base &&
          responseData.asset_id_quote &&
          responseData.rate
        ) {
          setData(responseData);
          setError(null);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching market data:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    let intervalId: NodeJS.Timeout | undefined;
    if (refreshInterval && refreshInterval > 0) {
      intervalId = setInterval(fetchMarketData, refreshInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [baseAsset, quoteAsset, refreshInterval]);

  return { data, loading, error };
}
