const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");

const PORT = 3000;
const MAX_BODY_SIZE = 1024 * 1024;

function sendResponse(res, statusCode, contentType, body) {
  res.writeHead(statusCode, {
    "Content-Type": contentType
  });

  res.end(body);
}

function serveFile(res, fileName) {
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      sendResponse(
        res,
        500,
        "text/plain",
        "Internal Server Error"
      );
      return;
    }

    sendResponse(res, 200, "text/html", data);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl =new URL(req.url, "http://" + req.headers.host);
  const pathname = requestUrl.pathname;

  // GET /
  if (pathname === "/" && req.method === "GET") {
    serveFile(res, "index.html");
    return;
  }

  // GET /users
  if (pathname === "/users" && req.method === "GET") {
    serveFile(res, "users.html");
    return;
  }

  // POST /create-user
  if (pathname === "/create-user" && req.method === "POST") {
    let body = "";
    let bodySize = 0;
    let tooLarge = false;

    req.on("data", (chunk) => {
      bodySize += chunk.length;

      if (bodySize > MAX_BODY_SIZE) {
        res.writeHead(413, {
            "Content-Type": "text/plain"
        });
        res.end("Payload Too Large");
        req.destroy();
        return;
      }

      body += chunk.toString();
    });

    req.on("end", () => {
      

      const formData = querystring.parse(body);
      const username = formData.username;

      if (username) {
        console.log(`⁠ Username received: ${username}`);
      } else {
        console.log("Username not provided");
      }

      res.writeHead(302, {
        Location: "/"
      });

      res.end();
    });

    return;
  }

  // Known routes with wrong methods
  if (
    pathname === "/users" ||
    pathname === "/create-user"
  ) {
    sendResponse(
      res,
      405,
      "text/plain",
      "Method Not Allowed"
    );
    return;
  }

  // Unknown routes
  sendResponse(
    res,
    404,
    "text/plain",
    "Not Found"
  );
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} `);
});

process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});