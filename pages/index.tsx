import { useState, useContext } from 'react';

import Head from 'next/head';
import Header from '@/components/Header';
import { StockNumberContext } from '@/context/context';
import NewNumberForm from '@/components/Numbers/NewNumberForm';

const Home: React.FC<{ currentNumber: number }> = () => {
  const StockNumberCtx = useContext(StockNumberContext);
  const [postStatus, setPostStatus] = useState<{
    success: boolean;
    message: string;
  }>({ success: false, message: '' });

  const addNumberHandler = async (enteredNumberData: {}) => {
    setPostStatus({ success: false, message: '' });
    try {
      const response = await fetch('/api/new-number', {
        method: 'POST',
        body: JSON.stringify(enteredNumberData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          'Something went wrong. Refresh the page and try again.'
        );
      }

      const data = await response.json();

      if (!data.success) {
        setPostStatus({
          success: false,
          message: data.message,
        });

        return;
      }

      setPostStatus({
        success: true,
        message: data.message,
      });

      StockNumberCtx.incrementStockNumber();
    } catch (e: any) {
      setPostStatus({
        success: false,
        message: e.message,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Stock Number Generator</title>
        <meta
          name="description"
          content="Create new stock numbers and product codes"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <NewNumberForm
          nextStockNumber={StockNumberCtx.nextNumber}
          onAddNumber={addNumberHandler}
          postStatus={postStatus}
        />
      </main>
    </>
  );
};

export default Home;
