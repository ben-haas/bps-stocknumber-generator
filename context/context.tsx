'use client';
import { createContext, useState, PropsWithChildren, useEffect } from 'react';

type StockNumberContextObject = {
  currentNumber: number;
  nextNumber: number;
  incrementStockNumber: () => void;
};

export const StockNumberContext = createContext<StockNumberContextObject>({
  currentNumber: 0,
  nextNumber: 0,
  incrementStockNumber: () => {},
});

const StockNumberContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [currentNumber, setCurrentNumber] = useState<number>(0);

  useEffect(() => {
    fetch('/api/current-number')
      .then((res) => res.json())
      .then((json) => setCurrentNumber(json.result));

    return () => {
      console.log('Context useEffect');
    };
  }, []);

  const incrementHandler = () => {
    setCurrentNumber((n) => n + 1);
  };

  const contextValue: StockNumberContextObject = {
    currentNumber: currentNumber,
    nextNumber: currentNumber > 0 ? currentNumber + 1 : currentNumber,
    incrementStockNumber: incrementHandler,
  };

  return (
    <StockNumberContext.Provider value={contextValue}>
      {props.children}
    </StockNumberContext.Provider>
  );
};

export default StockNumberContextProvider;
