const express = require('express');
const app = express();
const port = process.env.PORT || 8888;

app.get('/', (req, res) => {
    res.send('Hi I am Database');
});

app.listen(port, () => {
    console.log('I am port', port);
})