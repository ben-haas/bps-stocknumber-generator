import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data);

    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db('StockNumbers');
    const numbersCollection = db.collection('numbers');

    const result = await numbersCollection.insertOne({ data });

    console.log(result);

    client.close();
    res.status(201).json({ message: 'Number Inserted' });
  }
};

export default handler;
