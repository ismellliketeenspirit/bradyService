const express = require('express');
const db = require('../database/index.js');
const queryAllFromDatabase = require('../database/index.js')
  .queryAllFromDatabase;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));

app.use('/products/:id', express.static(__dirname + '/../client/dist'));

// app.get('/product/:id', (req, res) => {
//   db.queryDatabase(req.params.id, (result) => {
//     res.send(result);
//   });
// });

//get product based on prodcut id
app.get('/product/:id', db.getProductInfo);
//create product
app.post('/product/post/:id', db.createProduct);

//update username of all photos for specific product id
app.put('/product/update/:id', db.update);

//deletes product based on product id
app.delete('/product/delete/:id', db.deleteProductInfo);

app.get('/getallproducts', (req, res) => {
  queryAllFromDatabase((result, successBool) => {
    res.send(result.concat({ title: `Passed: ${successBool}`, id: 01 }));
  });
});

app.listen(port, () =>
  console.log(`App connection successful! App hosted at port: ${port}`)
);
