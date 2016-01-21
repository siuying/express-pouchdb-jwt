# express-pouchdb-jwt

Use JSON Web Token to authenticate [express-pouchdb](https://github.com/pouchdb/express-pouchdb)
instance.

## Usage

Here's a sample Express app, which we'll name app.js.

```javascript
var express = require('express'),
    app     = express(),
    ExpressPouchDB = require('express-pouchdb'),
    PouchDB = require('pouchdb');

var expressPouchDB = ExpressPouchDB(PouchDB, {
  overrideMode: {
    plugins: ['express-pouchdb-jwt']
  }
});
app.use('/db', expressPouchDB);
app.listen(3000);

// configure JWT
expressPouchDB.couchConfig.set('httpd', 'authentication_handlers', 'jwt', () => {})
expressPouchDB.couchConfig.set('jwt', 'algorithm', 'HS256', () => {})
expressPouchDB.couchConfig.set('jwt', 'secret_or_public_key', 'secret', () => {})
```

## Example

After clone the project, run follow commands to start the project

```
npm install
npm run start
```

The if you try to connect to the pouchdb instance, you will fail:

```
$ http get http://localhost:3000/db
HTTP/1.1 500 Internal Server Error
Connection: keep-alive
Content-Length: 62
Content-Type: text/plain; charset=utf-8
Date: Thu, 21 Jan 2016 14:22:31 GMT
ETag: W/"3e-GOFW1PiuP6zqkabMyr1Apw"
Vary: Accept-Encoding
X-Powered-By: Express

{"error":"JsonWebTokenError","reason":"jwt must be provided"}
```

If you provide a valud JSON Web Token in the authorization header:

```
$ http get http://localhost:3000/db  Authorization:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQ29udGV4dCI6eyJkYiI6ImRlZmF1bHQiLCJuYW1lIjoic2l1eWluZyIsInJvbGVzIjpbIl9hZG1pbiJdfX0.x-p49ZOp-aHonukJsuyNiOgsQc2c_vmpfsOMTFtwmgw
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 149
Content-Type: text/plain; charset=utf-8
Date: Thu, 21 Jan 2016 14:25:13 GMT
ETag: W/"95-0HNTOSG4ywo2R3OqRDSgtw"
Vary: Accept-Encoding
X-Powered-By: Express

{"express-pouchdb":"Welcome!","version":"1.0.1","vendor":{"name":"PouchDB authors","version":"1.0.1"},"uuid":"f651fcb1-3eaa-4da8-ae0a-54ca241adadc"}
```
