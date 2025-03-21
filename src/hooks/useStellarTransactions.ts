import { useEffect, useState } from "react";

const useStellarTransactions = () => {
  const [transactions, setTransactions] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      const walletDataRaw = localStorage.getItem("address-wallet");
      if (!walletDataRaw) return;

      const walletData = JSON.parse(walletDataRaw);
      const address = walletData?.state?.address;
      const horizonURL = process.env.NEXT_PUBLIC_HORIZON_TESTNET_URL;
      if (!address || !horizonURL) return;

      try {
        const res = await fetch(
          `${horizonURL}/accounts/${address}/transactions?limit=5&order=desc`,
        );
        if (!res.ok) {
          console.error(
            `Error fetching transactions: ${res.status} ${res.statusText}`,
          );
          return;
        }

        const data = await res.json();
        if (!data._embedded || !data._embedded.records) {
          console.error("No transactions found", data);
          return;
        }

        interface Transaction {
          id: string;
          operation_count: number;
          memo: string | null;
          fee_charged: string;
          created_at: string;
        }

        const formattedTransactions = data._embedded.records.map(
          (tx: Transaction) => ({
            id: tx.id,
            type:
              tx.operation_count > 1 ? "Multiple" : tx.memo || "Transaction",
            asset: "XLM",
            amount: `${tx.operation_count} operations`,
            value: `$${(parseFloat(tx.fee_charged) / 10000000).toFixed(7)} XLM Fee`,
            date: new Date(tx.created_at).toLocaleString(),
          }),
        );

        setTransactions(formattedTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading };
};

export default useStellarTransactions;
