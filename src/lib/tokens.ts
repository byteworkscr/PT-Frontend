export const tokens = [
  {
    id: "15",
    name: "USD Coin",
    symbol: "USDC",
    balance: 1500,
    value: 1500,
    iconSymbol: "usdc",
    icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742518288/USDC_k4ow3i.webp",
  },
  {
    id: "4",
    name: "Ethereum",
    symbol: "ETH",
    balance: 2.5,
    value: 7500,
    iconSymbol: "eth",
    icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742518327/ETH_maj8bk.svg",
  },
  {
    id: "16",
    name: "Stellar",
    symbol: "XLM",
    balance: 1000,
    value: 1000,
    iconSymbol: "xlm",
    icon: "https://res.cloudinary.com/dfxes8tvx/image/upload/v1742516910/Stellar_xycxeb.webp",
  },
];

export const getTokenById = (id: string) => {
  return tokens.find((token) => token.id === id);
};

export const getTokenBySymbol = (symbol: string) => {
  return tokens.find(
    (token) => token.symbol.toLowerCase() === symbol.toLowerCase(),
  );
};
