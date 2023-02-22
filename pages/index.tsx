import { useState } from 'react';
import { MongoClient } from 'mongodb';

import Head from 'next/head';
import Header from '@/components/Header';
import NewNumberForm from '@/components/Numbers/NewNumberForm';

const Home: React.FC<{ currentNumber: number }> = (props) => {
  const [currentNumber, setCurrentNumber] = useState(props.currentNumber);
  const [postStatus, setPostStatus] = useState({ success: false, message: '' });

  const addNumberHandler = async (enteredNumberData: {}) => {
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

        setCurrentNumber((currentNumber) => currentNumber + 1);

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
          currentNumber={currentNumber}
          onAddNumber={addNumberHandler}
          postStatus={postStatus}
        />
      </main>
    </>
  );
};

export async function getStaticProps() {
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

  return {
    props: {
      currentNumber: currentNumber,
    },
    revalidate: 10,
  };
}

export default Home;
