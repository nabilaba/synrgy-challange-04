const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const port = 9000;

const server = http.createServer((req, res) => {
  const urlReq = url.parse(req.url, true);
  const publicPath = path.join(__dirname, "../public", urlReq.pathname);

  if (fs.existsSync(publicPath)) {
    if (fs.statSync(publicPath).isDirectory()) {
      if (fs.existsSync(path.join(publicPath, "index.html"))) {
        fs.readFile(
          path.join(publicPath, "index.html"),
          (err, data) => {
            if (err) throw err;
            res.end(data);
          }
        );
      } else {
        fs.readdir(publicPath, (err, files) => {
          if (err) throw err;
          res.end(files.join(", "));
        });
      }
    } else {
      fs.readFile(publicPath, (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    }
  } else {
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
