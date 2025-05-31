const express =require('express');
const cors =require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port= process.env.PORT || 5000;
const app= express()

// middle ware /
app.use(cors())
app.use(express.json())
// AllCoffee
// MUsD6NNAdJqK5p6X



const uri = "mongodb+srv://AllCoffee:MUsD6NNAdJqK5p6X@cluster0.4hxxc9h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const coffeeCollection =client.db('coffeeDBMS').collection('coffee')

// 2.now read the data from data base by get
// find multiple document  from documentaion
app.get('/coffee',async(req,res)=>{
const cursor=coffeeCollection.find()
const result =await cursor.toArray()
res.send(result)
})

    //1. send data to the server by post 
    // insertone form documentaion
app.post('/coffee',async(req,res)=>{
const newCoffee=req.body
console.log(newCoffee)
const result =await coffeeCollection.insertOne(newCoffee)
res.send(result)

})

//Update particular coffee 
app.get('/coffee/:id',async(req,res)=>{
  const id =req.params?.id;
  console.log("params:", req.params);
console.log("query:", req.query);
console.log("body:", req.params);

if (ObjectId.isValid(id) && id.length === 24) {
  const objectId = new ObjectId(id);
  // safe to use
} else {
  console.error("Invalid ObjectId:", id);
}

  const query= {_id: new ObjectId(id)};

    const result = await coffeeCollection.findOne(query);
  res.send(result);
 })

// delete particular coffee 
app.delete('/coffee/:id',async(req,res)=>{
  const id =req.params.id;
  const query= {_id: new ObjectId(id)}
  const result =await coffeeCollection.deleteOne(query)
  res.send(result)
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
  res.send('coffee server is running')
})

app.listen(port,()=>{
  console.log(`simple coffee server is running on port:${port}`)
})