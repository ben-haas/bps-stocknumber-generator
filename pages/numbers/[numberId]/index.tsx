import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import NumberDetail from '@/components/Numbers/NumberDetail';
import Header from '@/components/Header';

interface PageProps {
  numberData: {
    stockNumber: number;
    productCode: string;
    productLine: string;
    user: string;
    createdAt: string;
    lastEdited: string;
    editedBy: string;
    isTypical: boolean;
  };
}

interface StatusProps {
  success: boolean;
  message: string;
}

const NumberDetailsPage: React.FC<PageProps> = ({ numberData }) => {
  const [updateStatus, setUpdateStatus] = useState<StatusProps>({
    success: false,
    message: '',
  });
  const { push } = useRouter();

  useEffect(() => {
    if (updateStatus.success) {
      setTimeout(() => {
        push('/numbers');
      }, 2000);
    }
  }, [updateStatus.success, push]);

  const editNumberHandler = async (numberId: number, newNumberData: {}) => {
    console.log({ numberId, newNumberData });
    setUpdateStatus({ success: false, message: '' });
    try {
      const response = await fetch('/api/update-number', {
        method: 'PUT',
        body: JSON.stringify({ numberId, newNumberData }),
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

      console.log(data);

      if (!data.success) {
        setUpdateStatus({
          success: false,
          message: data.message,
        });

        return;
      }

      setUpdateStatus({
        success: true,
        message: data.message,
      });
    } catch (e: any) {
      setUpdateStatus({
        success: false,
        message: e.message,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Stock Number Generator | Number Detail</title>
        <meta name="description" content="Stock number details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <NumberDetail
        numberData={numberData}
        updateStatus={updateStatus}
        onEditNumber={editNumberHandler}
      />
      ;
    </>
  );
};

export async function getServerSideProps(context: any) {
  const numberId = +context.params.numberId;

  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db('StockNumbers');
  const numbersCollection = db.collection(
    process.env.MONGODB_COLLECTION as string
  );
  const data = await numbersCollection
    .find({ 'data.stock_number': numberId })
    .toArray();

  client.close();

  return {
    props: {
      numberData: {
        stockNumber: data[0]?.data.stock_number,
        productCode: data[0]?.data.product_code,
        productLine: data[0]?.data.product_line,
        user: data[0]?.data.entered_by,
        createdAt: data[0]?.data.created_at,
        lastEdited: data[0]?.data.last_edited,
        editedBy: data[0]?.data.edited_by,
        isTypical: data[0]?.data.is_typical,
      },
    },
  };
}

export default NumberDetailsPage;
