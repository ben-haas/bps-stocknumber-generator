import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        process.env.MONGODB_URI as string
      );
      const db = client.db('StockNumbers');
      const numbersCollection = db.collection('numbers');

      const result = await numbersCollection.insertOne({ data });

      client.close();
      res
        .status(201)
        .json({ success: true, message: 'Number Inserted', result: result });
    } catch (e: any) {
      res.json({ success: false, message: e.message });
    }
  }
};

export default handler;
