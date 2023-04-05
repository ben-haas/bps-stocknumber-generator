import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const client = await MongoClient.connect(
        process.env.MONGODB_URI as string
      );

      const db = client.db('StockNumbers');
      const numbersCollection = db.collection('stock-numbers-prod');

      const data = await numbersCollection
        .find()
        .sort({ 'data.stock_number': -1 })
        .limit(1)
        .toArray();

      client.close();

      const lastEntry = data[0];

      res.status(200).json({
        success: true,
        message: 'Current Number Retrieved',
        result: lastEntry,
      });
    } catch (e: any) {
      res.json({ success: false, message: e.message, err: e });
    }
  }
};

export default handler;
