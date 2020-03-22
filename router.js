const router = (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("hello");
  }
};

module.exports = router;
