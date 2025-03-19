export function MarketTrends() {
  const trends = [
    {
      id: "1",
      asset: "Bitcoin (BTC)",
      price: "$36,789.21",
      change: "+5.6%",
      isPositive: true,
    },
    {
      id: "2",
      asset: "Ethereum (ETH)",
      price: "$2,491.15",
      change: "+3.2%",
      isPositive: true,
    },
    {
      id: "3",
      asset: "S&P 500",
      price: "$4,567.89",
      change: "-0.8%",
      isPositive: false,
    },
    {
      id: "4",
      asset: "Gold",
      price: "$1,876.50",
      change: "+1.2%",
      isPositive: true,
    },
    {
      id: "5",
      asset: "Real Estate Index",
      price: "$245.30",
      change: "-0.3%",
      isPositive: false,
    },
  ];

  return (
    <div className="space-y-4">
      {trends.map((trend) => (
        <div
          key={trend.id}
          className="flex items-center justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0"
        >
          <div className="font-medium">{trend.asset}</div>
          <div className="text-right">
            <div className="font-medium">{trend.price}</div>
            <div
              className={`text-xs ${
                trend.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend.change}
            </div>
          </div>
        </div>
      ))}
      <button className="w-full text-center text-sm text-[#0291fc] hover:underline hover:text-gray-200 mt-2">
        View all markets
      </button>
    </div>
  );
}
