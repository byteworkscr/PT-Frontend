export const tokens = [
  {
    id: "14",
    name: "Tether",
    symbol: "USDT",
    balance: 2000,
    value: 2000,
    iconSymbol: "usdt",
    isStablecoin: true,
  },
  {
    id: "15",
    name: "USD Coin",
    symbol: "USDC",
    balance: 1500,
    value: 1500,
    iconSymbol: "usdc",
    isStablecoin: true,
  },
  {
    id: "4",
    name: "Ethereum",
    symbol: "ETH",
    balance: 2.5,
    value: 7500,
    iconSymbol: "eth",
  },
  {
    id: "5",
    name: "Solana",
    symbol: "SOL",
    balance: 50,
    value: 5000,
    iconSymbol: "sol",
  },
];

export const getTokenById = (id: string) => {
  return tokens.find((token) => token.id === id);
};

export const getTokenBySymbol = (symbol: string) => {
  return tokens.find(
    (token) => token.symbol.toLowerCase() === symbol.toLowerCase()
  );
};
