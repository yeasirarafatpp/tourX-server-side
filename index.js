const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
require('dotenv').config();
const { MongoClient } = require('mongodb');
const cors = require('cors');

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
        // GET API
        app.get('/tours', async (req, res) => {
            const cursor = toursCollection.find({});
            const tours = await cursor.toArray();
            res.send(tours);
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