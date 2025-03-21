import { useEffect, useState } from "react";

const useMarketTrends = () => {
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarketTrends = async () => {
      try {
        const marketAPI = process.env.NEXT_PUBLIC_MARKET_API;
        const horizonURL =
          process.env.NEXT_PUBLIC_HORIZON_URL ||
          process.env.NEXT_PUBLIC_HORIZON_TESTNET_URL;

        if (!marketAPI || !horizonURL) {
          console.error("Missing API URLs in .env.local");
          return;
        }

        const res = await fetch(
          `${marketAPI}?ids=ethereum,stellar,starknet,tether,usd-coin&vs_currencies=usd&include_24hr_change=true`,
        );
        const cryptoData = await res.json();

        const formattedData = [
          {
            id: "xlm",
            name: "Stellar",
            price: `$${cryptoData.stellar.usd.toLocaleString()}`,
            change: cryptoData.stellar.usd_24h_change.toFixed(1),
          },
          {
            id: "eth",
            name: "Ethereum",
            price: `$${cryptoData.ethereum.usd.toLocaleString()}`,
            change: cryptoData.ethereum.usd_24h_change.toFixed(1),
          },
          {
            id: "strk",
            name: "Starknet",
            price: `$${cryptoData.starknet.usd.toLocaleString()}`,
            change: cryptoData.starknet.usd_24h_change.toFixed(1),
          },
        ];

        setData(formattedData);
      } catch (err) {
        console.error("Error fetching market trends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketTrends();
  }, []);

  return { data, loading };
};

export default useMarketTrends;
