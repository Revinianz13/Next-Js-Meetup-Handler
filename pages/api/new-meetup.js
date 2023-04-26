import {MongoClient} from 'mongodb'
// /api/mew-meetup
// POST/api/new-meetup

async function handler (req, res) {
  if (req.method=== 'POST') {
    const data = req.body;


const client = new MongoClient('mongodb+srv://revi:12345@atlascluster.mjqn2av.mongodb.net/meetups?retryWrites=true&w=majority');
await client.connect();
const db = client.db();


    const meetupsCollection = db.collection('meetups');

    const result  = await  meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'Meetup inserted!' });
  }
}

export default handler;