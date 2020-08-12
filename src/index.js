const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

const PRODUCTS = {
  pera: {
    name: 'pera',
    calories: 100,
  },
  banano: {
    name: 'banano',
    calories: 200,
  },
  manzana: {
    name: 'manzana',
    calories: 500,
  },
};

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/products', (req, res, next) => {
  console.log(req.query.name);
  const name = req.query.name;
  const product = PRODUCTS[name];
  if (!product) {
    res.status(400).send({error: 'Product not found'});
  }
  res.send(product);
});

app.post('/products', (req, res, next) => {
  console.log(req.body);
  const product = req.body.product;
  PRODUCTS[product.name] = product;
  res.send(PRODUCTS);
});

app.listen(PORT, () => {
  console.log(`> Server listening on ${PORT}`);
});
