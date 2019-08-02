const faker = require('faker');
const pgp = require('pg-promise')();

const connection = {
  user: 'brady',
  host: 'localhost',
  database: 'sdc-zon13',
  password: '',
  port: 3333,
};
const db = pgp(connection);
const startTimer = new Date().getTime();

// create data
const generateData = (amountOfData) => {
  const data = [];
  for (let i = 0; i < amountOfData; i++) {
    data.push({ id: i, name: `${faker.name.firstName()} + ${faker.name.lastName()}`, 
    productName: faker.commerce.productName(), 
    price: faker.commerce.price(), 
    productDesc: faker.lorem.sentence(),
    styles: faker.commerce.color(),
    options: faker.commerce.productMaterial(),
    bulletOne: faker.lorem.sentence(),
    bulletTwo: faker.commerce.sentence()
   });
  }
  return pgp.helpers.insert(data, ['id', 'name'], 'product');
};

// load data
db.tx(async (t) => {
  for (let i = 0; i < 1000; i++) {
    await t.none(generateData(10000));
    console.log(`Batch ${i + 1} of 1000 Completed`);
  }
})
  .then(() =>
    console.log('[Complete]: 10,000,000 records inserted successfully'),
  )
  .catch((e) => console.log(e))
  .finally(() => {
    const endTimer = new Date().getTime();
    console.log(
      `[Execution Time]: ${Math.round((endTimer - startTimer) / 1000, 2)} seconds`,
    );
    pgp.end();
  });