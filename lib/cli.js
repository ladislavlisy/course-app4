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
var os = require('os');
var v8 = require('v8');
var _data = require('./data');

// Intantiate the new CLI module object
var cli = {};

// Input handlers
e.on('man', function(str, callback) {
  cli.responders.help(callback);
});

e.on('help', function(str, callback) {
  cli.responders.help(callback);
});

e.on('exit', function(str, callback) {
  cli.responders.exit();
});

e.on('stats', function(str, callback) {
  cli.responders.stats();
  callback();
});

e.on('list users', function(str, callback) {
  cli.responders.listUsers(callback);
});

e.on('more user info', function(str, callback) {
  cli.responders.moreUserInfo(str, callback);
});

e.on('list checks', function(str, callback) {
  cli.responders.listChecks(str, callback);
});

e.on('more check info', function(str, callback) {
  cli.responders.moreCheckInfo(str, callback);
});

e.on('list logs', function(str, callback) {
  cli.responders.listLogs(callback);
});

e.on('more log info', function(str, callback) {
  cli.responders.moreLogInfo(str, callback);
});


// create a vertical space
cli.verticalSpace = function(line) {
  line = typeof(line)=='number' && line > 0 ? line : 1;
  for (i=0; i < line; i++){
    console.log('');
  }
};

// create a horizontal line across the screen
cli.horizontalLine = function() {
  // Get the available screen size
  var width = process.stdout.columns;
  var line = '';
  for(i=0; i < width; i++){
    line += '=';
  } 
  console.log(line);
};

// create a centered text on the screen
cli.centered = function(str) {
  str = typeof(str)=='string' && str.trim().length > 0 ? str.trim() : '';
  // Get the available screen size
  var width = process.stdout.columns;
  // Calculate the left padding there should be
  var leftPadding = Math.floor((width-str.length) / 2);
  // put left padding spaces before the string itself
  var line = '';
  for(i=0; i < leftPadding; i++){
    line += ' ';
  } 
  line += str;
  console.log(line);
};

cli.showHeader = function(str) {
  cli.verticalSpace();
  cli.horizontalLine();
  cli.centered(str);
  cli.horizontalLine();
  cli.verticalSpace(2);
};

// Responder object
cli.responders = {};

cli.responders.help = function(callback){
  var commands = {
    'exit' : 'Kill the CLI and rest of the application',
    'man' : 'Show this help page',
    'help' : 'Alias for the "man" command',
    'stats' : 'Get statistics on underlying operating system and resource utilization',
    'list users' : 'Show a list of all registred (undeleted) users in the system',
    'more user info --(userId)' : 'Show details of a specific user',
    'list checks --up --down' : 'Show a list of all the active checks in the system, including thier state. The "--up" and "--down" flags are both optional.',
    'more check info --(checkId)' : 'Show a detail of a specified check',
    'list logs' : 'Show a list of all the log files avialable to be read (compresed and uncompresed) ',
    'more log info --(filename)' : 'Show a detail of specified log file'
  };

  // Show a header for the help page that is as wide as the screen
  cli.showHeader('CLI manual');
  // Show each command, followed by its explanation, in white and yellow respectivelly
  for (var key in commands){
    if(commands.hasOwnProperty(key)){
      var value = commands[key];
      var line = '\x1b[33m'+key+'\x1b[0m';
      var padding = 60 - line.length;
      for (i = 0; i < padding; i++){
        line += ' ';
      }
      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  } 
  cli.verticalSpace();
  // End with another horizontal line
  cli.horizontalLine();
  callback();
};

cli.responders.exit = function(){
  process.exit(0);
};

cli.responders.stats = function(callback){
  // Compile the stats object
  var stats = {
    'Load Average' : os.loadavg().join(' '),
    'CPU Count' : os.cpus().length,
    'Free Memory' : os.freemem(),
    'Current Mallocated Memory' : v8.getHeapStatistics().malloced_memory,
    'Peak Mallocated Memory' : v8.getHeapStatistics().peak_malloced_memory,
    'Allocated Head (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
    'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
    'Uptime' : os.uptime() + ' Seconds'
  };

  // Create a header for the stats
  cli.showHeader('SYSTEM STATISTICS');
  // Log out each stat
  for (var key in stats){
    if(stats.hasOwnProperty(key)){
      var value = stats[key];
      var line = '\x1b[33m'+key+'\x1b[0m';
      var padding = 60 - line.length;
      for (i = 0; i < padding; i++){
        line += ' ';
      }
      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  } 
  cli.verticalSpace();
  // End with another horizontal line
  cli.horizontalLine();
  callback();
};

cli.responders.listUsers = function(callback){
  var firstLine = true;
  _data.list('users', function(err, userIds){
    var numberOfUsers = userIds.length;
    var usersCounter = 0; 
    if (!err && userIds && userIds.length > 0) {
      userIds.forEach(function(userId){
        usersCounter++;
        _data.read('users',userId,function(err,userData){
          if (!err && userData){
            if (firstLine) {
              cli.showHeader('System Users');
              firstLine = false;
            }
            var line = 'Name: ' + userData.firstName + ' ' + userData.lastName + ' Phone: ' + userData.phone + ' Checks: ';
            var numberOfChecks = typeof(userData.checks)=='object' && userData.checks instanceof Array && userData.checks.length > 0 ? userData.checks.length : 0;
            line+=numberOfChecks;
            console.log(line);
            cli.verticalSpace();

          }
          if (usersCounter == numberOfUsers){
            callback();
          }
        });        
      });
    }
    else
    {
      callback();
    }
  });
};

cli.responders.moreUserInfo = function(str,callback){
  // Get the userId from the command string
  var arr = str.split('--');
  var userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1] : false;
  if (userId){
    // Lookup the user data
    _data.read('users', userId, function(err, userData){
      if (!err && userData) {
        // Remove password from userData object
        delete userData.hashedPassword;

        // print the JSON object with colors
        cli.showHeader('USER DEATIL');
        console.dir(userData,{'colors':true});
        cli.verticalSpace();
      }
      callback();
    });
  }
  else
  {
    callback();
  }
};

cli.responders.listChecks = function(str,callback){
  console.log("You are asked to list checks", str);
  callback();
};

cli.responders.moreCheckInfo = function(str,callback){
  console.log("You are asked for more check info", str);
  callback();
};

cli.responders.listLogs = function(callback){
  console.log("You are asked to list logs.");
  callback();
};

cli.responders.moreLogInfo = function(str,callback){
  console.log("You are asked for more logs info.", str);
  callback();
};

// Input processor
cli.processInput = function(str, callback) {
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
        e.emit(input,str,callback);
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
    cli.processInput(str, function() {
      // re-initialize the prompt afterwards
      _interface.prompt();
    });
  });

  // if the user stops the CLI, kill the associated process
  _interface.on('close', function() {
    process.exit(0);
  });

};

// export the module
module.exports = cli;
