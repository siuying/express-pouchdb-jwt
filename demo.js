var express = require('express'),
    app     = express(),
    ExpressPouchDB = require('express-pouchdb'),
    PouchDB = require('pouchdb');

var options = {
  overrideMode: {
    plugins: ['express-pouchdb-jwt'] // 'express-pouchdb-jwt' for real use
  }
};
var expressPouchDB = ExpressPouchDB(PouchDB, options);
app.use('/db', expressPouchDB);
app.listen(3000);

// configure JWT
expressPouchDB.couchConfig.set('httpd', 'authentication_handlers', 'jwt', () => {})
expressPouchDB.couchConfig.set('jwt', 'algorithm', 'HS256', () => {})
expressPouchDB.couchConfig.set('jwt', 'secret_or_public_key', 'secret', () => {})
