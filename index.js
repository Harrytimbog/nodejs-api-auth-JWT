const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const app = express()
const PORT = 3000


app.get('/', (req, res) => res.send('Hello World'))

app.get('/secret', (req, res) => {
  res.json({"message": "Super Secret Message"});
})

app.get('/readme', (req, res) => {
  res.json({"message": "Hello World"})
})

app.get('/jwt', (req, res) => {
  let privateKey = fs.readFileSync('./private.pem', 'utf8');
  let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256' });
  res.send(token);
})


app.listen(PORT, () => console.log(`Started App on port: ${PORT}`))
