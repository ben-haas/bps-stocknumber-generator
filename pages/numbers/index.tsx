import { MongoClient } from 'mongodb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

import Header from '@/components/Header';
import Card from '@/components/UI/Card';

const AllNumbersPage: React.FC<{
  entries: [
    {
      stockNumber: number;
      productCode: string;
      productLine: string;
      user: string;
    }
  ];
}> = (props) => {
  return (
    <>
      <Header />
      <Card>
        <table>
          <thead>
            <tr>
              <th>Stock Number</th>
              <th>Product Code</th>
              <th>Product Line</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {props.entries.map((entry) => {
              return (
                <tr key={entry.stockNumber}>
                  <td>{entry.stockNumber}</td>
                  <td>{entry.productCode}</td>
                  <td>{entry.productLine}</td>
                  <td>{entry.user}</td>
                  <td>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
  }));

  return {
    props: {
      entries: entries,
    },
    revalidate: 10,
  };
}

export default AllNumbersPage;
