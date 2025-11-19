'use client'
import { createContext, useEffect, useState, ReactNode } from "react"

interface Currency {
  name: string;
  symbol: string;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  image: string;
  // Add other properties as needed
}

interface CoinContextType {
  allCoin: CoinData[];
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const CoinContext = createContext<CoinContextType | undefined>(undefined);

interface CoinContextProviderProps {
  children: ReactNode;
}

const CoinContextProvider = ({ children }: CoinContextProviderProps) => {
  const [allCoin, setAllCoin] = useState<CoinData[]>([]);
  const [currency, setCurrency] = useState<Currency>({
    name: "usd",
    symbol: "$"
  })

  const fetchAllCoin = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-U1Y5CXLJyUptYCVT6NswWV3N'
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchAllCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency])

  const contextValue: CoinContextType = {
    allCoin,
    currency,
    setCurrency
  }

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  )
}

export default CoinContextProvider;