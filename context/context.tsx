'use client';
import { createContext, useState, PropsWithChildren, useEffect } from 'react';

type StockNumberContextObject = {
  currentNumber: number;
  nextNumber: number;
  lastEntry: {
    created_at: string;
    edited_by: string;
    entered_by: string;
    is_typical: boolean;
    last_edited: string;
    product_code: string;
    product_line: string;
    stock_number: number;
  };
  incrementStockNumber: () => void;
};

export const StockNumberContext = createContext<StockNumberContextObject>({
  currentNumber: 0,
  nextNumber: 0,
  lastEntry: {
    created_at: '',
    edited_by: '',
    entered_by: '',
    is_typical: true,
    last_edited: '',
    product_code: '',
    product_line: '',
    stock_number: 0,
  },
  incrementStockNumber: () => {},
});

const StockNumberContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [lastEntry, setLastEntry] = useState({
    created_at: '',
    edited_by: '',
    entered_by: '',
    is_typical: true,
    last_edited: '',
    product_code: '',
    product_line: '',
    stock_number: 0,
  });

  useEffect(() => {
    const getLastEntry = async () => {
      const data = await fetch('/api/current-number');
      const entry = await data.json();

      console.log(entry);

      setCurrentNumber(entry.result.data.stock_number);
      setLastEntry(entry.result.data);
    };

    getLastEntry();
  }, [currentNumber]);

  const incrementHandler = () => {
    setCurrentNumber((n) => n + 1);
  };

  const contextValue: StockNumberContextObject = {
    currentNumber: currentNumber,
    nextNumber: currentNumber > 0 ? currentNumber + 1 : currentNumber,
    lastEntry: lastEntry,
    incrementStockNumber: incrementHandler,
  };

  return (
    <StockNumberContext.Provider value={contextValue}>
      {props.children}
    </StockNumberContext.Provider>
  );
};

export default StockNumberContextProvider;
