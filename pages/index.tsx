import { useState, useEffect } from 'react';
import { MongoClient } from 'mongodb';

import Head from 'next/head';
import Header from '@/components/Header';
import NewNumberForm from '@/components/Numbers/NewNumberForm';

const Home: React.FC<{ currentNumber: number }> = (props) => {
  const [nextNumber, setNextNumber] = useState<number>(props.currentNumber + 1);
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

      if (data.success) {
        setPostStatus({
          success: true,
          message: data.message,
        });

        const curNum = await fetch('/api/current-number');
        const numData = await curNum.json();

        setNextNumber(numData.result + 1);

        return;
      }

      setPostStatus({
        success: false,
        message: data.message,
      });
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
          currentNumber={nextNumber}
          onAddNumber={addNumberHandler}
          postStatus={postStatus}
        />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db('StockNumbers');
  const numbersCollection = db.collection('numbers');

  const data = await numbersCollection
    .find()
    .sort({ 'data.stock_number': -1 })
    .limit(1)
    .toArray();

  client.close();

  const currentNumber = data[0].data.stock_number;

  console.log('Update current number');

  return {
    props: {
      currentNumber: currentNumber,
    },
  };
}

export default Home;
