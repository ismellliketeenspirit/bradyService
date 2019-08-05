const faker = require('faker');
const pgp = require('pg-promise')();

// const connection = {
//   user: 'bradyliu',
//   host: 'localhost',
//   database: 'sdc-zon13',
//   password: '',
//   port: 3333,
// };
const db = pgp({ database: 'sdc-zon13' });
const startTimer = new Date().getTime();

// create data
const generateData = (amountOfData) => {
  const data = [];
  for (let i = 0; i < amountOfData; i++) {
    data.push({
      productid: i,
      seller: `${faker.name.firstName()} ${faker.name.lastName()}`,
      productname: faker.commerce.productName(),
      price: faker.commerce.price(),
      productdesc: faker.lorem.sentence(),
      styles: faker.commerce.color(),
      options: faker.commerce.productMaterial(),
      bulletone: faker.lorem.sentence(),
      bullettwo: faker.lorem.sentence()
    });
  }
  return pgp.helpers.insert(data, ['productid', 'seller', 'productname', 'price', 'productdesc', 'styles', 'options', 'bulletone', 'bullettwo'], 'product_info');
};

db.tx(async (t) => {
  for (let i = 0; i < 1000; i++) {
    await t.none(generateData(10000));
    console.log(`${i + 1} chunks loaded`);
  }
})
  .then(() =>
    console.log('10m records packed together nicely'),
  )
  .catch((e) => console.log(e))
  .finally(() => {
    const endTimer = new Date().getTime();
    console.log(
      `Run Time: ${Math.round((endTimer - startTimer) / 1000, 2)} seconds`,
    );
    pgp.end();
  });