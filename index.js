import express from "express";
import { MongoClient } from 'mongodb';
import 'dotenv/config'


const app = express();
const PORT = 8000;



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

app.post("/add-event", (req , res)=>{
console.log("Event added successfully!");
  res.send({message: "Event added successfully!"});

})

// app.get("/add-event", (req, res) => {
//   res.send("Add Event API is working!");
// });

//localhost:8000/
app.get("/", (req, res)=>{
    res.send({message: "I'm already started working on my assignment-8"});
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is running at ${PORT}`);
});