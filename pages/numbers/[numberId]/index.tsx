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
  };
}

const NumberDetailsPage: React.FC<PageProps> = ({ numberData }) => {
  return (
    <>
      <Head>
        <title>Stock Number Generator | Number Detail</title>
        <meta name="description" content="Stock number details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <NumberDetail numberData={numberData} />;
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
      },
    },
  };
}

export default NumberDetailsPage;
