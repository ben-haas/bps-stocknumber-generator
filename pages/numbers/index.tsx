import { MongoClient, ObjectId } from 'mongodb';

import Header from '@/components/Header';
import Card from '@/components/UI/Card';
import NumberTable from '@/components/Numbers/NumberTable';
import classes from './index.module.css';

const AllNumbersPage: React.FC<{
  entries: [
    {
      stockNumber: number;
      productCode: string;
      productLine: string;
      user: string;
      id: string;
    }
  ];
}> = (props) => {
  return (
    <>
      <Header />
      <Card>
        <NumberTable tableData={props.entries} />
      </Card>
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
    .limit(100)
    .toArray();

  client.close();

  const entries = data.map((entry) => ({
    stockNumber: entry.data.stock_number,
    productCode: entry.data.product_code,
    productLine: entry.data.product_line,
    user: entry.data.entered_by,
    id: entry._id.toString(),
  }));

  return {
    props: {
      entries: entries,
    },
    revalidate: 10,
  };
}

export default AllNumbersPage;
