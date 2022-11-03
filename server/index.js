const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const port = 9000;

const server = http.createServer((req, res) => {
  const folder = path.join(__dirname, "../public");
  const urlReq = url.parse(req.url, true);
  const filePath = path.join(folder, urlReq.pathname);
  const extReq = path.extname(filePath);

  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      if (fs.existsSync(path.join(filePath, "index.html"))) {
        fs.readFile(path.join(filePath, "index.html"), (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      } else {
        fs.readdir(filePath, (err, files) => {
          if (err) throw err;
          res.end(files.join(", "));
        });
      }
    } else {
      if (extReq === ".html") {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      } else {
        fs.readFile(filePath, (err, data) => {
          if (err) throw err;
          res.end(data);
        });
      }
    }
  } else {
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
