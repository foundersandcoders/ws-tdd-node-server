const router = (req, res) => {
  if (req.url == '/') {
    res.writeHead(200, {'content-type' : "text/html"})
    res.end('Hello')
  } else if (req.url =='/blog') {
    res.writeHead(200, {'content-type' : "text/html"})
    res.end('Blog')
  }
}

module.exports = router;
