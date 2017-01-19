const router = (request, response) => {
  if (request.url == '/') {
    response.writeHead(200, {'content-type' : "text/html"})
    response.end('Hello')
  } else if (request.url =='/blog') {
    response.writeHead(200, {'content-type' : "text/html"})
    response.end('Blog')
  } 
}

module.exports = router;
