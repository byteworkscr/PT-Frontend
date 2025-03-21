"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMarketData } from "@/hooks/useMarketData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface PricePoint {
  time: string;
  price: number;
}

export function XLMPriceChart() {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const { data, loading } = useMarketData({
    baseAsset: "XLM",
    quoteAsset: "USD",
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (priceHistory.length === 0 && data) {
      const basePrice = data.rate;
      const initialData: PricePoint[] = [];

      for (let i = 20; i >= 1; i--) {
        const time = new Date(Date.now() - i * 60000).toLocaleTimeString();
        const randomVariation = (Math.random() - 0.5) * 0.01 * basePrice;
        initialData.push({
          time,
          price: basePrice + randomVariation,
        });
      }

      setPriceHistory(initialData);
    }

    if (data && priceHistory.length > 0) {
      const now = new Date().toLocaleTimeString();

      if (data.rate !== priceHistory[priceHistory.length - 1].price) {
        setPriceHistory((prev) => {
          const newData = [...prev, { time: now, price: data.rate }];
          if (newData.length > 20) {
            return newData.slice(newData.length - 20);
          }
          return newData;
        });
      }
    }
  }, [data, priceHistory.length]);

  const minPrice =
    priceHistory.length > 0
      ? Math.min(...priceHistory.map((p) => p.price)) * 0.995
      : 0;

  const maxPrice =
    priceHistory.length > 0
      ? Math.max(...priceHistory.map((p) => p.price)) * 1.005
      : 0;

  const initialPrice = priceHistory.length > 0 ? priceHistory[0].price : 0;
  const currentPrice =
    priceHistory.length > 0 ? priceHistory[priceHistory.length - 1].price : 0;
  const priceChange = currentPrice - initialPrice;
  const percentChange =
    initialPrice > 0 ? (priceChange / initialPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  const formatPrice = (value: number) => `$${value.toFixed(6)}`;

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: unknown[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-white/10 p-2 rounded text-white text-xs">
          <p>{`Time: ${(payload[0] as { payload: PricePoint }).payload.time}`}</p>
          <p>{`Price: ${formatPrice((payload[0] as { value: number }).value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>XLM/USD Live Chart</span>
          {!loading && priceHistory.length > 0 && (
            <span
              className={`text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}
            >
              {isPositive ? "+" : ""}
              {percentChange.toFixed(2)}%
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && priceHistory.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-white/70">
            Loading chart data...
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceHistory}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="time"
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                  tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickFormatter={(value) =>
                    value.split(":").slice(0, 2).join(":")
                  }
                />
                <YAxis
                  domain={[minPrice, maxPrice]}
                  tick={{ fill: "rgba(255,255,255,0.7)" }}
                  tickLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickFormatter={(value) => value.toFixed(4)}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={initialPrice}
                  stroke="rgba(255,255,255,0.3)"
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={isPositive ? "#4ade80" : "#f87171"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: isPositive ? "#4ade80" : "#f87171",
                    stroke: "rgba(0,0,0,0.5)",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mt-4 flex justify-between text-sm text-white/70">
          <div>
            Current:{" "}
            <span className="text-white font-medium">
              ${currentPrice.toFixed(6)}
            </span>
          </div>
          <div>
            Updated:{" "}
            <span className="text-white font-medium">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
