const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const filePath = path.resolve(__dirname, "input.txt");

router.get("/", (req, res) => {
  const readableStream = fs.createReadStream(filePath);

//   res.setHeader('Content-Type', 'text/event-stream');
  res.writeHead(200, {
    'content-type': 'text/plain',
    'cache-control': 'no-cache',
    'connection':  'keep-alive',
    'transfer-encoding': 'chunk'
  })
  readableStream.pipe(res)
//   readableStream.on("end", () => {
//     console.log("Finish reading the file.");
//     res.write("Finish reading the file.");
//     res.end();
//   });
//   readableStream.on("data", (chunk) => {
//     console.log("recieved chunk data", chunk.toString());
//     res.write(chunk.toString());
//   });
  //   res.send("File stream data update");
});

router.get('/download', (req, res) => {
    const readableStream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'text/plan');
    res.setHeader('Content-Diposition', 'attachment; filename="input.txt"'); // Used for indicating whether the content should be displayed inline or downloaded as an attachment, and can specify the filename.

    readableStream.pipe(res)

    readableStream.on('error', (err) => {
        console.error('Stream error:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
})

module.exports = router;
