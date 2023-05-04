import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        process.env.MONGODB_URI as string
      );

      const db = client.db('StockNumbers');
      const numbersCollection = db.collection(
        process.env.MONGODB_COLLECTION as string
      );

      const filter = { 'data.stock_number': data.stock_number };

      const updateDoc = {
        $set: {
          product_line: data.product_line,
          stock_number: data.stock_number,
          product_code: data.product_code,
          last_edited: data.last_edited,
        },
      };

      const result = await numbersCollection.updateOne(filter, updateDoc);

      client.close();

      res.status(200).json({
        success: true,
        message: `Stock Number ${data.stock_number} edited`,
        result: result,
      });
    } catch (e: any) {
      res.json({ success: false, message: e.message, err: e });
    }
  }
};

export default handler;
