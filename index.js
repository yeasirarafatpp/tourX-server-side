const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config();
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wdoqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("Tourdestination");
        const toursCollection = database.collection("tours");
        const orderCOllection = database.collection("order");

        // POST API
        app.post('/tours', async (req, res) => {
            const tours = req.body;
            console.log('post the hit api', tours);
            const result = await toursCollection.insertOne(tours);
            res.json(result);
        });

        // POST ORDER API
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCOllection.insertOne(order);
            res.json(result);
        });

        // GET ALL ORDER
        app.get('/orders', async (req, res) => {
            const cursor = orderCOllection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        });

        // GET API
        app.get('/tours', async (req, res) => {
            const cursor = toursCollection.find({});
            const tours = await cursor.toArray();
            res.send(tours);
        });

        // GET Single Tour
        app.get('/tours/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const tour = await toursCollection.findOne(query);
            res.json(tour);
        });
        // DELETE API
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await orderCOllection.deleteOne(query);
            res.json(result);
        });

    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hi I am Database');
});

app.listen(port, () => {
    console.log('I am port', port);
})