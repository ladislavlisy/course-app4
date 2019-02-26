/*
* Source for http server API
*
*/

// Dependecies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');

// Declare the app
var app = {};

// Initialize the app
app.init = function() {
  // Start the server
  server.init();
  // Start the workers
  workers.init();
};

// Execute the init Function
app.init();

// Export the app
module.exports = app;
