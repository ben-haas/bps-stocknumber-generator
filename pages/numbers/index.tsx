import Head from 'next/head';
import dynamic from 'next/dynamic';
import { MongoClient } from 'mongodb';

import Header from '@/components/Header';
import Card from '@/components/UI/Card';

const DynamicTable = dynamic(() => import('@/components/Numbers/NumberTable'), {
  loading: () => <p>Loading...</p>,
});

interface PageProps {
  entries: [
    {
      stockNumber: number;
      productCode: string;
      productLine: string;
      user: string;
      id: string;
      createdAt: string;
      lastEdited: string;
    }
  ];
}

const AllNumbersPage: React.FC<PageProps> = ({ entries }) => {
  return (
    <>
      <Head>
        <title>Stock Number Generator | All Numbers</title>
        <meta
          name="description"
          content="A list of the last 100 stock numbers created"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Card>
        <DynamicTable tableData={entries} />
      </Card>
    </>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db('StockNumbers');
  const numbersCollection = db.collection(
    process.env.MONGODB_COLLECTION as string
  );

  const data = await numbersCollection
    .find()
    .sort({ 'data.stock_number': -1 })
    .limit(100)
    .toArray();

  client.close();

  const entries = data.map((entry) => ({
    stockNumber: entry.data.stock_number,
    productCode: entry.data.product_code,
    productLine: entry.data.product_line,
    user: entry.data.entered_by,
    id: entry._id.toString(),
    createdAt: entry.data.created_at,
    lastEdited: entry.data.last_edited,
  }));

  return {
    props: {
      entries: entries,
    },
  };
}

export default AllNumbersPage;
