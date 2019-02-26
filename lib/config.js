/*
 * create and export configuration parameters
 *
 */

// Container for all the enviromnents

var enviromnents = {};

// Staging (default) enviromnent
enviromnents.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging',
  'hashingSecret' : 'thisIsASecret',
  'maxChecks' : 5,
  'twilioGitHub' : {
    'accountSid' : 'ACb32d411ad7fe886aac54c665d25e5c5d',
    'authToken' : '9455e3eb3109edc12e3d8c92768f7a67',
    'fromPhone' : '+15005550006'
  },
  'twilioTest' : {
    'accountSid' : 'AC35424ad3ac050ab2e88749e572ca47e5',
    'authToken' : '5cc918254f7927ca31bf752d821e3ee1',
    'fromPhone' : '+15005550006'
  },
  'twilioCZR' : {
    'accountSid' : 'ACe7bb57bc234b6a1b1eca7543241f4410',
    'authToken' : '151dee5615b2034710872f1f61341c26',
    'fromPhone' : '+420606639349'
  },
  'twilioCZT' : {
    'accountSid' : 'ACe7bb57bc234b6a1b1eca7543241f4410',
    'authToken' : '151dee5615b2034710872f1f61341c26',
    'fromPhone' : '+15005550006'
  },
  'templateGlobals' : {
    'appName' : 'UptimeChecker',
    'companyName' : 'Real Company Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:3000'
  }
};

// Production enviromnent
enviromnents.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production',
  'hashingSecret' : 'thisIsAlsoASecret',
  'maxChecks' : 5,
  'twilio' : {
    'accountSid' : '',
    'authToken' : '',
    'fromPhone' : ''
  },
  'templateGlobals' : {
    'appName' : 'UptimeChecker',
    'companyName' : 'Real Company Inc.',
    'yearCreated' : '2018',
    'baseUrl' : 'http://localhost:5000'
  }
};

// Determining with environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check if the current enviromnent is one of the enviromnents above, if not, default to staging
var environmentToExport = typeof(enviromnents[currentEnvironment]) == 'object' ? enviromnents[currentEnvironment] : enviromnents.staging;

// export the module
module.exports = environmentToExport;
