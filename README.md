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
jwt(expressPouchDB);

// configure JWT
expressPouchDB.couchConfig.set('httpd', 'authentication_handlers', 'jwt', () => {})
expressPouchDB.couchConfig.set('jwt', 'algorithm', 'HS256', () => {})
expressPouchDB.couchConfig.set('jwt', 'secret_or_public_key', 'secret', () => {})

app.use('/db', expressPouchDB);
app.listen(3000);
```

## Example

After clone the project, run follow commands to start the project

```
npm install
npm run start
```

The if you try to connect to the pouchdb instance, you will fail:

```

```
