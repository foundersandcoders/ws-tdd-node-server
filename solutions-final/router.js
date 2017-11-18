const router = (req, res) => {

  if (req.url === '/') {
    res.writeHead(200, {'content-type': "text/html"});
    res.end('Hello');

  } else if (req.url === '/blog' && req.method === 'GET') {
    res.writeHead(200, {"content-type": "application/json"});
    var arrayObject = JSON.stringify(['cat', 'dog', 'bird']);
    res.end(arrayObject);

  } else if (req.url === '/blog' && req.method === 'POST' && req.headers.password === 'potato') {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      if (data) {
        res.writeHead(200, {"content-type": "application/json"});
        res.end(data);
      } else {
        res.writeHead(302, {'Location': '/blog'});
        res.end();
      }
    });

  } else if (req.url === '/blog' && req.method === 'POST') {

    res.writeHead(403, {'content-type': 'text/html'});
    res.end('Forbidden');

  } else if (req.url === '/blog/:blogpost' && req.method === 'GET') {

    res.writeHead(200, {"content-type": "application/json"});
    res.end('Works for any blogpost');

  } else {
    res.writeHead(404, {"content-type": "text/html"});
    res.end("unknown uri");
  }
}

module.exports = router;
