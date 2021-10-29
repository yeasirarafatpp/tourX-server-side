const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
require('dotenv').config();
const { MongoClient } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wdoqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    res.send('Hi I am Database');
});

app.listen(port, () => {
    console.log('I am port', port);
})