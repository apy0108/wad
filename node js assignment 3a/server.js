// ============================================================
// server.js — Node.js Static File Server
// Serves files from the "public/" folder on port 3000
// Uses ONLY built-in modules: http, fs, path
// ============================================================

const http = require("http"); // Built-in: create HTTP server
const fs   = require("fs");   // Built-in: read files from disk
const path = require("path"); // Built-in: safely join file paths

// ------------------------------------------------------------
// Step 1: Map file extensions → MIME / Content-Type values
// ------------------------------------------------------------
const MIME_TYPES = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "text/javascript",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico":  "image/x-icon",
};

// ------------------------------------------------------------
// Step 2: Helper — derive the Content-Type for a given path
// ------------------------------------------------------------
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream"; // fallback for unknown types
}

// ------------------------------------------------------------
// Step 3: Create the HTTP server
// ------------------------------------------------------------
const server = http.createServer((req, res) => {

  // Step 3a: Read the requested URL
  let requestedUrl = req.url;

  // Step 3b: Strip query strings (e.g. /page?foo=bar → /page)
  requestedUrl = requestedUrl.split("?")[0];

  // Step 3c: If root "/" is requested → serve index.html
  if (requestedUrl === "/") {
    requestedUrl = "/index.html";
  }

  // Step 3d: Build a safe, absolute file path inside "public/"
  //          path.join avoids directory-traversal attacks (e.g. ../../etc/passwd)
  const filePath = path.join(__dirname, "public", requestedUrl);

  // Step 3e: Determine the Content-Type header from the file extension
  const contentType = getContentType(filePath);

  // Step 3f: Read the requested file asynchronously
  fs.readFile(filePath, (err, data) => {

    if (!err) {
      // ✅ File found — send 200 OK with file contents
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);

    } else if (err.code === "ENOENT") {
      // ❌ File not found — serve the custom 404 page
      const notFoundPath = path.join(__dirname, "public", "404.html");

      fs.readFile(notFoundPath, (err404, data404) => {
        if (!err404) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(data404);
        } else {
          // 404.html itself is missing — send plain text fallback
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 — Page Not Found");
        }
      });

    } else {
      // 💥 Unexpected server error
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });
});

// ------------------------------------------------------------
// Step 4: Start listening on port 3000
// ------------------------------------------------------------
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Serving static files from the public/ folder.");
  console.log("Press Ctrl+C to stop the server.");
});
