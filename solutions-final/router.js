const router = (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hello");
  } else if (req.url === "/blog" && req.method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    var arrayObject = JSON.stringify(["cat", "dog", "bird"]);
    res.end(arrayObject);
  } else if (
    req.url === "/blog" &&
    req.method === "POST" &&
    req.headers.authorization === "123"
  ) {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });

    req.on("end", () => {
      if (data) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(data);
      } else {
        res.writeHead(302, { location: "/blog" });
        res.end();
      }
    });
  } else if (req.url === "/blog" && req.method === "POST") {
    res.writeHead(401, { "content-type": "text/html" });
    res.end("<h1>Unauthorized</h1>");
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>Not Found</h1>");
  }
};

module.exports = router;
