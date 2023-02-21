import { MongoClient } from 'mongodb';

import Header from '@/components/Header';
import Card from '@/components/UI/Card';

const AllNumbersPage: React.FC<{ entries: any[] }> = (props) => {
  return (
    <>
      <Header />
      <Card>
        <ul>
          {props.entries.map((entry) => {
            return <li key={entry.stocknumber}>{entry.stockNumber}</li>;
          })}
        </ul>
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
  }));

  return {
    props: {
      entries: entries,
    },
    revalidate: 10,
  };
}

export default AllNumbersPage;
