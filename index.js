const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();




app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cgekd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run (){
   try{
       await client.connect();
       const productsCollection = await client.db('emaJohn').collection('product');
       
       app.get('/product', async(req,res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
       })

   }
   finally{

   }
}
 run().catch(console.dir);

app.get('/', (req, res) => {
res.send("ema is running ");
})

app.listen(port, () => {
console.log(`Server is running on port`, port);
});