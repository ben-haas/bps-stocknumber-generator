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
      const numbersCollection = db.collection(process.env.MONGODB_COLLECTION as string);

      const result = await numbersCollection.insertOne({ data });

      client.close();

      res.status(201).json({
        success: true,
        message: `Stock Number ${data.stock_number} Created`,
        result: result,
      });
    } catch (e: any) {
      res.json({ success: false, message: e.message, err: e });
    }
  }
};

export default handler;
