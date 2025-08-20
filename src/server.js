const express = require('express');
const PORT = 4000;
const app = express();
const fileStream = require('./streams/file-stream')

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/file-stream', fileStream);

app.listen(PORT, () => {
    console.log(`Server listioning on port number ${PORT}`);
});