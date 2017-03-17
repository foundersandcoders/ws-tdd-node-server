const http = require('http');
const port = process.env.PORT || 4000;
const router = require('./router');

http.createServer(router).listen(port);
console.log('running');
