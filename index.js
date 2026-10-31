import express from "express";

const app = express();
const PORT = 8000;


app.get("/", (req, res)=>{
    res.send({message: "I'm already started working on my assignment-8"});
})

app.listen(PORT, (req, res)=>{
    console.log(`Server is running at ${PORT}`);
});