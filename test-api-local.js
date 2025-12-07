const handler = require('./api/index.js');
const http = require('http');

const server = http.createServer((req, res) => {
    // Wrap res to add Vercel-compatible methods
  res.status = function(code) {
    this.statusCode = code;
    return this;
  };
  
  res.json = function(data) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data, null, 2));
    return this;
  };
  
  handler(req, res);
});

server.listen(3000, () => {
  console.log('API running at http://localhost:3000');
  console.log('Test: curl http://localhost:3000/abstracts');
});
