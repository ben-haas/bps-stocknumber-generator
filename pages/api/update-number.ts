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

      const filter = { 'data.stock_number': data.numberId };

      const updateDoc = {
        $set: {
          data: {
            product_line: data.newNumberData.product_line,
            stock_number: data.newNumberData.stock_number,
            product_code: data.newNumberData.product_code,
            last_edited: data.newNumberData.last_edited,
            edited_by: data.newNumberData.edited_by,
            created_at: data.newNumberData.created_at,
            entered_by: data.newNumberData.entered_by,
            is_typical: data.newNumberData.is_typical,
          },
        },
      };

      const result = await numbersCollection.updateOne(filter, updateDoc);

      client.close();

      res.status(200).json({
        success: true,
        message: `Stock Number ${data.numberId} edited`,
        result: result,
      });
    } catch (e: any) {
      res.json({ success: false, message: e.message, err: e });
    }
  }
};

export default handler;
