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

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/data/data.json`);
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  // Getting pathname and params from the url
  const { query, pathname } = url.parse(req.url, true);

  // Home page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObject.map(el => templateReplacer(tempCard, el)).join('');
    const overview = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(overview);

  } else {
    res.end('404');
  }
});

server.listen(8000, () => {
  console.log('Listening to requests on port 8000');
});