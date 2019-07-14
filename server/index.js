const express = require('express');
const queryDatabase = require('../database/index.js').queryDatabase;
const queryAllFromDatabase = require('../database/index.js')
  .queryAllFromDatabase;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));

app.use('/products/:id', express.static(__dirname + '/../client/dist'));

app.get('/product/:id', (req, res) => {
  queryDatabase(req.params.id, (result) => {
    res.send(result);
  });
});

app.post();

app.put();

app.delete();

app.get('/getallproducts', (req, res) => {
  queryAllFromDatabase((result, successBool) => {
    res.send(result.concat({ title: `Passed: ${successBool}`, id: 01 }));
  });
});

app.listen(port, () =>
  console.log(`App connection successful! App hosted at port: ${port}`)
);
