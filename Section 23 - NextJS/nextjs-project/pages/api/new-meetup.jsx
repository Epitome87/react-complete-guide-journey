import { MongoClient } from 'mongodb';

//  URL: api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Expected data from our New Meetup Form
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://Matthew:Filkkmghm2QCDUzZ@cluster0.1ryx5.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne({
      title,
      image,
      address,
      description,
    });

    client.close();

    // Insertion successful, chain on json
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
