import useMarketTrends from "@/hooks/useMarketTrends";
import { TokenIcon } from "@web3icons/react";

export function MarketTrends() {
  const { data, loading } = useMarketTrends();

  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-white/70 text-sm">Loading market data...</p>
      ) : (
        data.map((trend) => (
          <div
            key={trend.id}
            className="flex items-center justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-2">
              <TokenIcon
                symbol={trend.id}
                variant="mono"
                size="24"
                color="#FFFFFF"
              />
              <span className="font-medium">{trend.name}</span>
            </div>
            <div className="text-right">
              <div className="font-medium">{trend.price}</div>
              <div
                className={`text-xs ${
                  trend.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.change >= 0 ? `+${trend.change}%` : `${trend.change}%`}
              </div>
            </div>
          </div>
        ))
      )}

      <a
        href="https://www.coingecko.com/es"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="w-full text-center text-sm text-[#0291fc] hover:underline hover:text-gray-200 mt-2">
          View all markets
        </button>
      </a>
    </div>
  );
}
