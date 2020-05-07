const fs = require('fs');
const http = require('http');
const url = require('url');

const templateReplacer = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output
}

const server = http.createServer((req, res) => {
  // Getting pathname and params from the url
  const { query, pathname } = url.parse(req.url, true);

  // Home page
  if (pathname === '/') {
    res.end('Home page');

  // 404 
  } else {
    res.end('404');
  }
});

server.listen(8000, () => {
  console.log('Listening to requests on port 8000');
});