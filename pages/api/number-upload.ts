import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      console.log(data);

      const client = await MongoClient.connect(
        process.env.MONGODB_URI as string
      );
      const db = client.db('StockNumbers');
      const numbersCollection = db.collection(
        process.env.MONGODB_COLLECTION as string
      );

      const result = await numbersCollection.insertMany(data);
      let ids = result.insertedIds;

      client.close();

      console.log(`${result.insertedCount} documents were inserted.`);
      for (let id of Object.values(ids)) {
        console.log(`Inserted a document with id ${id}`);
      }

      res.status(201).json({
        success: true,
        message: `Stock Numbers Created`,
        result: result,
      });
    } catch (e: any) {
      res.json({ success: false, message: e.message, err: e });
    }
  }
};

export default handler;
