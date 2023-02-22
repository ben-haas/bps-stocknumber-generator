import { MongoClient, ObjectId } from 'mongodb';

import NumberDetail from '@/components/Numbers/NumberDetail';

const NumberDetailsPage: React.FC<{
  numberData: {
    id: string;
    stockNumber: number;
    productCode: string;
    productLine: string;
    user: string;
    createdAt: string;
    lastEdited: string;
  };
}> = (props) => {
  return <NumberDetail numberData={props.numberData} />;
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db('StockNumbers');
  const numbersCollection = db.collection('numbers');
  const data = await numbersCollection.find().toArray();

  client.close();

  const paths = data.map((number) => ({
    params: { numberId: number._id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const numberId = context.params.numberId;

  const client = await MongoClient.connect(process.env.MONGODB_URI as string);

  const db = client.db('StockNumbers');
  const numbersCollection = db.collection('numbers');
  const selectedNumber = await numbersCollection.findOne({
    _id: new ObjectId(numberId),
  });

  client.close();

  return {
    props: {
      numberData: {
        id: selectedNumber?._id.toString(),
        stockNumber: selectedNumber?.data.stock_number,
        productCode: selectedNumber?.data.product_code,
        productLine: selectedNumber?.data.product_line,
        user: selectedNumber?.data.entered_by,
        createdAt: selectedNumber?.data.created_at,
        lastEdited: selectedNumber?.data.last_edited,
      },
    },
  };
}

export default NumberDetailsPage;
