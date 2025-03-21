import { useEffect, useState } from "react";

const useStellarBalance = () => {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const walletDataRaw = localStorage.getItem("address-wallet");
      if (!walletDataRaw) return;

      const walletData = JSON.parse(walletDataRaw);
      const address = walletData?.state?.address;
      const horizonURL =
        process.env.NEXT_PUBLIC_HORIZON_TESTNET_URL ||
        process.env.NEXT_PUBLIC_HORIZON_URL;
      if (!address || !horizonURL) return;

      try {
        const res = await fetch(`${horizonURL}/accounts/${address}`);
        const data = await res.json();
        console.log("data", res);
        const native = data.balances.find(
          (b: { asset_type: string }) => b.asset_type === "native",
        );
        setBalance(native?.balance || "0");
      } catch (err) {
        console.error("Error fetching balance:", err);
        setBalance("0");
      }
    };

    fetchBalance();
  }, []);

  return balance;
};

export default useStellarBalance;
