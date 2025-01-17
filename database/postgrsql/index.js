const pg = require('pg')
// const client = new Client();
// const pool = pg.Pool({
//   user: 'bradyliu',
//   host: 'localhost',
//   database: 'sdc-zon13',
//   password: '',
//   port: 3333,
// })

const pool = new pg.Pool({ database: 'sdc-zon13' });

pool.connect()
  .then(() => console.log('connected to postgreSQL'));

  const createTable = () => {
    const createTable = 
    `CREATE TABLE product_info (
       productID INTEGER,
       seller VARCHAR (50) NOT NULL,
       productName VARCHAR (255) NOT NULL,
       price numeric NOT NULL,
       productDesc VARCHAR (255) NOT NULL,
       styles VARCHAR (255),
       options VARCHAR (255),
       bulletOne VARCHAR (255),
       bulletTwo VARCHAR (255)
    )`;
    pool
      .query(createTable)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((e) => {
        console.log(e);
        pool.end();
      })
  }
  createTable();
  const insertRecords = (id, merchant, name, price, description, styles, options, bulletone, bullettwo) => {
    const query = `INSERT INTO product VALUES (${id}, ${merchant}, ${name}, ${price}, ${description}, ${styles}, ${options}, ${bulletone}, ${bullettwo} )`;
    pool
      .query(query)
      .catch(e=> console.log(e.stack));
  };

  module.exports ={
    createTable,
    insertRecords
  }