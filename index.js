const fs = require('fs');
const http = require('http');
const url = require('url');

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