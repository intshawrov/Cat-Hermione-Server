import express from "express";
import { MongoClient , ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from "cors";


const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());



const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectClient = await connectToMongoDB();
const db = connectClient.db("cat-hermione");
const collectionEvent = db.collection("event");

app.post("/add-event", async (req, res) => {
  const data = req.body;

  const result = await collectionEvent.insertOne(data);

  console.log(result);
  res.send(result);

});

app.get("/events", async (req, res) => {
  const events = await collectionEvent.find({}).toArray();
  res.send(events);
});


//events details api
app.get("/events/:id", async (req, res) => {
  const { id } = req.params;
  const result = await collectionEvent.findOne({ _id: new ObjectId(id) });
  console.log(id);
  res.send(result);
});

app.patch("/events/:id", async (req , res)=>{
  const {id} = req.params;
  const data = req.body;
  const result =await collectionEvent.updateOne({_id: new ObjectId(id)}, {$set: data});
  res.json(result);

});


app.delete("/events/:id", async (req , res)=>{
  const {id} = req.params;
  const result = await collectionEvent.deleteOne({_id: new ObjectId(id)});
  res.json(result);
});


// app.get("/add-event", (req, res) => {
//   res.send("Add Event API is working!");
// });

//localhost:8000/
app.get("/", (req, res) => {
  res.send({ message: "I'm already started working on my assignment-8" });
})

app.listen(PORT, (req, res) => {
  console.log(`Server is running at ${PORT}`);
});