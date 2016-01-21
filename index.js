"use strict";

var utils = require('express-pouchdb/lib/utils');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
  app.use(function(req, res, next){
    var value = app.couchConfig.get('httpd', 'authentication_handlers') || "";
    if (value.indexOf('jwt') === -1) {
      return next();
    }

    var jwtAlgorithm = app.couchConfig.get('jwt', 'algorithm');
    var jwtSecretOrPublicKey = app.couchConfig.get('jwt', 'secret_or_public_key');
    if (!jwtAlgorithm || !jwtSecretOrPublicKey) {
      throw new Error("Missing jwt.algorithm or jwt.secret_or_public_key");
      return;
    }

    var token = req.headers.authorization;
    var options = {algorithms: [jwtAlgorithm]};
    jwt.verify(token, jwtSecretOrPublicKey, options, function(error, decoded){
      if (error) {
        utils.sendError(res, error);
        return;
      }

      if (!decoded.userContext) {
        var error = new Error("Missing userContext in payload")
        utils.sendError(res, error);
        return;
      }

      req.couchSession = {
        ok: true,
        userCtx: decoded.userContext,
        authorizated: "jwt"
      };
      next();
    });
  });
};
