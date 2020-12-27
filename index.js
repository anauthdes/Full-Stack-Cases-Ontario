
// To run the server with refreshes use 
// npm run start
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const router = express.router;

app.use('/js',express.static(path.join(__dirname, '/js')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

