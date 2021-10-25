const express = require('express')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const app = express()
const PORT = 3000


app.get('/', (req, res) => res.send('Hello World'))

app.get('/secret', isAuthorized, (req, res) => {
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

function isAuthorized(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    // retrieve the authorization header and parse out the
    // JWT using the split function
    let token = req.headers.authorization.split(" ")[1];
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    // Here we validate that the JSON Web Token is valid and has been
    // created using the same private pass phrase
    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, decoded) => {

      // if there has been an error...
      if (err) {
        // shut them out!
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
      }
      // if the JWT is valid, allow them to hit
      // the intended endpoint
      console.log(decoded)
      return next();
    });
  } else {
    // No authorization header exists on the incoming
    // request, return not authorized and throw a new error
    res.status(500).json({ error: "Not Authorized" });
    throw new Error("Not Authorized");
  }
}


app.listen(PORT, () => console.log(`Started App on port: ${PORT}`))
