import { useState, useEffect } from "react";
import useStellarBalance from "@/hooks/useStellarBalance";

interface Token {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  value: number;
  iconSymbol: string;
  isStablecoin?: boolean;
}

const useSwap = () => {
  const [fromToken, setFromToken] = useState<Token>({
    id: "xlm",
    name: "Stellar",
    symbol: "XLM",
    balance: 0,
    value: 0,
    iconSymbol: "xlm",
  });

  const [toToken, setToToken] = useState<Token>({
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    balance: 0,
    value: 0,
    iconSymbol: "eth",
  });

  const [fromAmount, setFromAmount] = useState("1.0");
  const [toAmount, setToAmount] = useState("0.000167");
  const [xlmToUsd, setXlmToUsd] = useState<number | null>(null);

  const balance = useStellarBalance();

  useEffect(() => {
    const fetchXlmPrice = async () => {
      try {
        const marketAPI = process.env.NEXT_PUBLIC_MARKET_API;
        const res = await fetch(`${marketAPI}?ids=stellar&vs_currencies=usd`);
        const data = await res.json();
        setXlmToUsd(data.stellar.usd);
      } catch (error) {
        console.error("Error fetching XLM price:", error);
      }
    };

    fetchXlmPrice();
  }, []);

  useEffect(() => {
    if (balance) {
      const parsedBalance = parseFloat(balance);
      setFromToken((prev) => ({
        ...prev,
        balance: parsedBalance,
        value: parsedBalance,
      }));
    }
  }, [balance]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    xlmToUsd,
    setFromAmount,
    setToAmount,
    handleSwapTokens,
    setFromToken,
    setToToken,
  };
};

export default useSwap;
