/*
 * CLI related Tasks
 *
*/

// Dependecies
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');
class _events extends events{};
var e = new _events();

// Intantiate the new CLI module object
var cli = {};

// Input processor
cli.processInput = function(str) {
  str = typeof(str)=='string' && str.trim().length > 0 ? str.trim() : false;
  // Only process the input if the user actually wrote anything. Otherwise ignore.
  if (str) {
    // Codify the unique strings, that identify the unique questions allowed to be asked
    var uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info'
    ];

    // Go through the possible inputs, emit an event when match is found.
    var matchFound = false;
    var counter = 0;
    uniqueInputs.some(function(input){
      if(str.toLowerCase().indexOf(input) > -1){
        matchFound = true;
        // Emit an event matching the unique input, and include the full string given by user
        e.emit(input,str);
        return true;
      }
    }); 
    if (!matchFound) {
      console.log('Sorry, try again.');
    }
  }
};

// init script
cli.init = function() {
  // Send the start message to the console in dark blue
  console.log('\x1b[34m%s\x1b[0m','The CLI is running');

  // Start the interface
  var _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'cli>'
  }); 

  // Create an initial prompt
  _interface.prompt();

  // Handle each line of input separatelly
  _interface.on('line', function(str){
    // Send to the input processor
    cli.processInput(str);
    // re-initialize the prompt afterwards
    _interface.prompt();
  });

  // if the user stops the CLI, kill the associated process
  _interface.on('close', function() {
    process.exit(0);
  });

};





// export the module
module.exports = cli;
