/*
* Server related tasks
*
*/

// Dependecies
var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');
var util = require('util');
var debug = util.debuglog('server');

// Instantiate the server modul object
var server = {};

// intantiate the http server
server.httpServer = http.createServer(function(req, res) {
  server.unifiedServer(req, res);
});

// intantiate the http server
server.httpsServerOptions = {
  'key' : fs.readFileSync(path.join(__dirname, '../https/key.pem')),
  'cert' : fs.readFileSync(path.join(__dirname, '../https/cert.pem'))
};

server.httpsServer = https.createServer(server.httpsServerOptions, function(req, res) {
  server.unifiedServer(req, res);
});

// All the server logic for both http and https server
server.unifiedServer = function(req, res) {
  // get the URL and parse it
  var parsedUrl = url.parse(req.url, true);
  // get the PATH
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // get the http method
  var method = req.method.toLowerCase();

  // get the query string as an object
  var queryStringObject = parsedUrl.query;

  // get the headers as an object
  var headers = req.headers;

  // get the payload, if any
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end', function(){
    buffer+= decoder.end();

    // Choose the handler this request should go to
    // if one is not found, use the notFound handler
    var choosenHandler = typeof(server.router[trimmedPath]) != 'undefined' ? server.router[trimmedPath] : handlers.notFound;

    // if the request is within the public directory, use the public handler instead
    choosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : choosenHandler;
    // Construct the data object to send to the handler
    var data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer)
    };

    // Route the request to the handler specified in the router
    choosenHandler(data,function(statusCode, payload, contentType){
      // Determin the type of response, fallback to JSON
      contentType = typeof(contentType) == 'string' ? contentType : 'json';
      // Use the status code called back by the handler, or set the default status code to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Return response
      // Return the response parts that are content specific
      var payloadString = '';
      if (contentType == 'json') {
        res.setHeader('Content-Type','application/json');
        // Use the payload called back by handler, or set the default payload to an empty object
        payload = typeof(payload) == 'object' ? payload : {};
        // Convert the payload to a string
        payloadString = JSON.stringify(payload);
      }
      if (contentType == 'html') {
        res.setHeader('Content-Type','text/html');
        payloadString = typeof(payload) == 'string' ? payload : '';
      }
      if (contentType == 'favicon') {
        res.setHeader('Content-Type','image/x-icon');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      if (contentType == 'css') {
        res.setHeader('Content-Type','text/css');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      if (contentType == 'png') {
        res.setHeader('Content-Type','image/png');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      if (contentType == 'jpg') {
        res.setHeader('Content-Type','image/jpeg');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      if (contentType == 'plain') {
        res.setHeader('Content-Type','text/plain');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }
      // Return the response parts that are common to all content-types
      res.writeHead(statusCode);
      res.end(payloadString);

      // If the response is 200, print green, otherwise print red
      if(statusCode == 200){
        debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      } else {
        debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
      }
    });
  });
};

// Define a request router
server.router = {
  '' : handlers.index,
  'account/create' : handlers.accountCreate,
  'account/edit' : handlers.accountEdit,
  'account/deleted' : handlers.accountDeleted,
  'session/create' : handlers.sessionCreate,
  'session/deleted' : handlers.sessionDeleted,
  'checks/all' : handlers.checksList,
  'checks/create' : handlers.checksCreate,
  'checks/edit' : handlers.checksEdit,
  'ping' : handlers.ping,
  'api/users' : handlers.users,
  'api/tokens' : handlers.tokens,
  'api/checks' : handlers.checks,
  'favicon.ico' : handlers.favIcon,
  'public' : handlers.public
};

// Init script
server.init = function(){
 // Start the HTTP server
 server.httpServer.listen(config.httpPort,function(){
   console.log('\x1b[36m%s\x1b[0m','The HTTP server is running on port '+config.httpPort);
 });

 // Start the HTTPS server
 server.httpsServer.listen(config.httpsPort,function(){
   console.log('\x1b[35m%s\x1b[0m','The HTTPS server is running on port '+config.httpsPort);
 });
};

// export the module
module.exports = server;
