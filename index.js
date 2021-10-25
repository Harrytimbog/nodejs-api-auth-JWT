const express = require('express')
const app = express()
const PORT = 3000


app.get('/', (req, res) => res.send('Hello World'))

app.get('/secret', (req, res) => {
  res.json({"message": "Super Secret Message"});
})

app.get('/readme', (req, res) => {
  res.json({"message": "Hello World"})
})

app.listen(PORT, () => console.log(`Started App on port: ${PORT}`))
