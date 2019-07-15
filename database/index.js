const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost:27017/ProductInfo',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to mongoDB'));

let productSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  description: String,
  product_price: Number,
  seller: String,
  colors: Array,
});

let ProductInfo = mongoose.model('ProductInfo', productSchema);

const updateDatabase = (dataArray) => {
  let failure = false;
  dataArray.forEach(
    ({ id, title, description, product_price, seller, colors }) => {
      let productInfo = new ProductInfo({
        id,
        title,
        description,
        product_price,
        seller,
        colors,
      });
      productInfo.save((err, productInfo) => {
        err
          ? (() => {
            console.log(err);
            failure = true;
          })()
          : null;
      });
    }
  );
  !failure ? console.log('Success!') : null;
};

const queryDatabase = (id, cb) => {
  // look up row with id and return the data
  ProductInfo.find({ id: id }).exec((err, result) =>
    err ? console.log(err) : cb(result[0])
  );
};

const createProduct = (req, res) => {
  //TODO do something with req.body
  ({ id, title, description, product_price, seller, colors }) => {
    let productInfo = new ProductInfo({
      id,
      title,
      description,
      product_price,
      seller,
      colors,
    });
    productInfo.save((err) => {
      if (err) {
        console.log(err);
      }
      res.json({ count: count + 1});
    })
}
//refactored queryDatabase
const getProductInfo = (req, res) => {
  ProductInfo.find({ id: req.params.id }, (err, result) => {
    if (err) return err;
    res.send(result);
  });
}

const deleteProductInfo = (req, res) => {
  ProductInfo.deleteOne({ id: req.params.id }, function (err) {
    if (err) console.log(`There was an issue deleting this.`);
  });
}

const queryAllFromDatabase = (cb) => {
  var allProducts = [];
  ProductInfo.find({}, (err, result) => {
    if (err) {
      console.log('TCL: queryAllFromDatabase -> err', err);
    } else {
      result.forEach(({ title, id }) => {
        let obj = {
          title: title,
          id: id,
        };
        allProducts.push(obj);
      });
      cb(allProducts, true);
    }
  });
};

module.exports.updateDatabase = updateDatabase;
module.exports.queryDatabase = queryDatabase;
module.exports.queryAllFromDatabase = queryAllFromDatabase;
module.exports = {
  updateDatabase,
  queryAllFromDatabase,
  queryDatabase,
  deleteProductInfo,
  getProductInfo
};