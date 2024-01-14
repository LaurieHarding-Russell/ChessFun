const express = require('express')
const app = express()

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

app.use(express.static(`${__dirname}`))

app.listen(4200)