/*
* Request handlers
*
*/

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

// Define the handlers
var handlers = {};

/*
 * HTML handlers
 *
*/

// index handler
handlers.index = function(data, callback){
  if (data.method == 'get') {
    // Prepare the data for interpolation
    var templateData = {
      'head.title' : 'Uptime Monitoring - Made Simple',
      'head.description' : 'We offer free, simple uptime monitoring for HTTP/HTTPS sites all kinds. When your site goes down, we\'ll send you a text to let you know',
      'body.class' : 'index'
    };

    helpers.getTemplate('index',templateData,function(err,str){
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str){
            callback(200, str, 'html');
          }else {
            console.log('Error addTemplates: ', err);
            callback(500, undefined, 'html');
          }
        });
      }else {
        console.log('Error getTemplate: ', err);
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create account handler
handlers.accountCreate = function(data, callback) {
  if (data.method == 'get') {
    // Prepare the data for interpolation
    var templateData = {
      'head.title' : 'Create an Account',
      'head.description' : 'Signup is easy and only takes a few seconds.',
      'body.class' : 'accountCreate'
    };

    helpers.getTemplate('accountCreate',templateData,function(err,str){
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str){
            callback(200, str, 'html');
          }else {
            console.log('Error addTemplates: ', err);
            callback(500, undefined, 'html');
          }
        });
      }else {
        console.log('Error getTemplate: ', err);
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit existing account handler
handlers.accountEdit = function(data, callback) {
  if (data.method == 'get') {
    // Prepare the data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      'body.class' : 'accountEdit'
    };

    helpers.getTemplate('accountEdit',templateData,function(err,str){
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str){
            callback(200, str, 'html');
          }else {
            console.log('Error addTemplates: ', err);
            callback(500, undefined, 'html');
          }
        });
      }else {
        console.log('Error getTemplate: ', err);
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Account has been deleted handler
handlers.accountDeleted = function(data, callback) {
  if (data.method == 'get') {
    // Prepare the data for interpolation
    var templateData = {
      'head.title' : 'Account Deleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };

    helpers.getTemplate('accountDeleted',templateData,function(err,str){
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str){
            callback(200, str, 'html');
          }else {
            console.log('Error addTemplates: ', err);
            callback(500, undefined, 'html');
          }
        });
      }else {
        console.log('Error getTemplate: ', err);
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create a new session handler
handlers.sessionCreate = function(data, callback) {
  if (data.method == 'get') {
    // Prepare the data for interpolation
    var templateData = {
      'head.title' : 'Login to your account',
      'head.description' : 'Please enter your phone and password to access your account.',
      'body.class' : 'sessionCreate'
    };

    helpers.getTemplate('sessionCreate',templateData,function(err,str){
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str){
            callback(200, str, 'html');
          }else {
            console.log('Error addTemplates: ', err);
            callback(500, undefined, 'html');
          }
        });
      }else {
        console.log('Error getTemplate: ', err);
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Session has been deleted handler
handlers.sessionDeleted = function(data, callback) {
  if (data.method == 'get') {
    // Prepare the data for interpolation
    var templateData = {
      'head.title' : 'Loged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };

    helpers.getTemplate('sessionDeleted',templateData,function(err,str){
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if (!err && str){
            callback(200, str, 'html');
          }else {
            console.log('Error addTemplates: ', err);
            callback(500, undefined, 'html');
          }
        });
      }else {
        console.log('Error getTemplate: ', err);
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create a new check
handlers.checksCreate = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create a New Check',
      'body.class' : 'checksCreate'
    };
    // Read in a template as a string
    helpers.getTemplate('checksCreate',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Dashboard (view all checks)
handlers.checksList = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Dashboard',
      'body.class' : 'checksList'
    };
    // Read in a template as a string
    helpers.getTemplate('checksList',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Edit a Check
handlers.checksEdit = function(data,callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Check Details',
      'body.class' : 'checksEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('checksEdit',templateData,function(err,str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str,templateData,function(err,str){
          if(!err && str){
            // Return that page as HTML
            callback(200,str,'html');
          } else {
            callback(500,undefined,'html');
          }
        });
      } else {
        callback(500,undefined,'html');
      }
    });
  } else {
    callback(405,undefined,'html');
  }
};

// Favicon handler
handlers.favIcon = function(data, callback){
  if (data.method == 'get') {
    helpers.getStaticAssest('favicon.ico', function(err,data){
      if (!err && data) {
        callback(200, 'favicon');
      }else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets handler
handlers.public = function(data, callback){
  if (data.method == 'get') {
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Read the asset data
      helpers.getStaticAssest(trimmedAssetName, function(err,data){
        if (!err && data) {
          // Determin the content type (default the plain text)
          var contentType = 'plain';
          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }

          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }
          // Callback the data and content-type
          callback(200, data, contentType);
        }else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

/*
 * JSON API handlers
 *
*/

// users
handlers.users = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];

  if (acceptableMethods.indexOf(data.method) > -1){
      handlers._users[data.method](data, callback);
  } else {
      callback(405);
  }
};

// Container for users submethods
handlers._users = {};

// Users - POST
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data, callback) {
  // Check if all required data are filled out
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if (firstName && lastName && phone && password && tosAgreement){
    // Make sure that user doesn't already exists
    _data.read('users', phone, function(err, data) {
      if (err) {
        // Hash the password
        var hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          // create user object
          var userObject = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phone' : phone,
            'hashedPassword' : hashedPassword,
            'tosAgreement' : tosAgreement
          };
          // persiste user object to file on disk
          _data.create('users', phone, userObject, function(err){
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, {'Error' : 'Could not create the new user'});
            }
          });
        } else {
          callback(500, {'Error' : 'Could not hash the user\'s password'});
        }
      }else{
        // A user already exists
        callback(400,{'Error' : 'A user with that phone number already exists'});
      }
    });
  } else {
    callback(400, {"Error" : "Missing required fields!"});
  }
};

// Users - GET
// Required data: phone
// Optional data: none
handlers._users.get = function(data, callback) {
  //check that the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // Get the token from headers
    var token = typeof(data.headers.token)=='string' ? data.headers.token : false;
    // Veriofy that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){
          // lookup the user
          _data.read('users', phone, function(err, data){
            if (!err && data) {
              // Remove the hashed password from the user's object before returning in to the requestor
              delete data.hashedPassword;
              callback(200, data);
            } else {
              callback(404);
            }
          });
        }else{
          callback(403, {'Error' : 'Missing required token in header, or given token is invalid'});
        }
    });
  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// Users - PUT
// Required data: phone
// Optional data: firstName, lastName, password, at least one must be specified
handlers._users.put = function(data, callback) {
  //Check for required field
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  //Check for optional fields
  var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName : false;
  var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;

  if (phone){
    // Get the token from headers
    var token = typeof(data.headers.token)=='string' ? data.headers.token : false;
    // Veriofy that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){
          if (firstName || lastName || password){
            // Lookup the user
            _data.read('users', phone, function(err, userData){
              if (!err && userData) {
                if (firstName) {
                  userData.firstName = firstName;
                }
                if (lastName) {
                  userData.lastName = lastName;
                }
                if (password) {
                  userData.hashedPassword = helpers.hash(password);
                }
                _data.update('users', phone, userData, function(err){
                  if (!err){
                    callback(200);
                  }else{
                    callback(500, {'Error' : 'Could not update the user'});
                  }
                });
              } else {
                console.log(err);
                callback(400, {'Error' : 'This specified user doesn\'t exist'});
              }
            });
          } else {
            callback(400, {'Error' : 'Missing the fields to update'});
          }
        }else{
          callback(403, {'Error' : 'Missing required token in header, or given token is invalid'});
        }
    });
  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// Users - DELETE
// Required data: phone
// Optional data: none
handlers._users.delete = function(data, callback) {
  //check that the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if (phone) {
    // Get the token from headers
    var token = typeof(data.headers.token)=='string' ? data.headers.token : false;
    // Veriofy that the given token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,function(tokenIsValid){
        if(tokenIsValid){
          // lookup the user
          _data.read('users', phone, function(err, userData){
            if (!err && userData) {
              _data.delete('users', phone, function(err){
                if (!err) {
                  // Delete each of the checks associated with the deleted user
                  var userChecks = typeof(userData.checks)=='object' && userData.checks instanceof Array ? userData.checks : [];
                  var checksToDelete = userChecks.length;
                  if (checksToDelete > 0) {
                    var checksDeleted = 0;
                    var deletionErrors = false;
                    // Loops through the checks
                    userChecks.forEach(function(checkId){
                      // delete the check
                      _data.delete('checks', checkId, function(err) {
                        if (err) {
                          deletionErrors = true;
                        }
                        checksDeleted ++;
                        if (checksDeleted == checksToDelete){
                          if (!deletionErrors){
                            callback(200);
                          }else{
                            callback(500, {'Error' : 'Errors encountered while attempting to delete all of the user\'s checks. All checks may not have been deleted from the system successfully.'});
                          }
                        }
                      });
                    });
                  } else {
                    callback(200);
                  }
                } else {
                  callback(500, {'Error' : 'Could not delete the specified user'});
                }
              });
            } else {
              callback(400, {'Error' : 'Could not find the specified user'});
            }
          });
        }else{
          callback(403, {'Error' : 'Missing required token in header, or given token is invalid'});
        }
    });
  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// tokens
handlers.tokens = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];

  if (acceptableMethods.indexOf(data.method) > -1){
      handlers._tokens[data.method](data, callback);
  } else {
      callback(405);
  }
};

// Container for tokens submethods
handlers._tokens = {};

// Verify if given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id,phone,callback){
    // Lookup the _tokens
    _data.read('tokens', id, function(err, tokenData){
      if (!err && tokenData) {
        // Check if the token is for the given user and has not expired
        if (tokenData.phone == phone && tokenData.expires > Date.now()){
          callback(true);
        }else{
          callback(false);
        }
      } else {
        callback(false);
      }
    });
};

// tokens - POST
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data,callback) {
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone : false;
  var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password : false;

  if (phone && password) {
    // lookup the user who matches that phone number
    _data.read('users', phone, function(err, userData){
      if (!err && userData) {
        // hash the sent password and compare it to the password stored in user object
        var hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          // if valid, create a new token with random name, set expiration date 1 hour in the future.
          var tokenId = helpers.createRandomString(20);

          var expires = Date.now() + 1000 * 60 * 60;

          var tokenObject = {
            'phone' : phone,
            'id' : tokenId,
            'expires' : expires
          };

          _data.create('tokens', tokenId, tokenObject, function(err) {
            if (!err) {
              callback(200, tokenObject);
            }else{
              callback(500, {'Error' : 'Could not create a new token'});
            }
          });
        }else{
          callback(400, {'Error' : 'Password did not match the specified user\'s stored password'});
        }
      } else {
        callback(400, {'Error' : 'Could not find the specified user'});
      }
    });

  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// tokens - GET
// Required data: id
// Optional data: none
handlers._tokens.get = function(data,callback) {
  // Check that id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // lookup the token
    _data.read('tokens', id, function(err, tokenData){
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// tokens - PUT
// Required data: id, extend
// Optional data: none
handlers._tokens.put = function(data,callback) {
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend==true ? true : false;

  if (id && extend) {
    // lookup the token
    _data.read('tokens', id, function(err, tokenData){
      if (!err && tokenData) {
        // Check to make sure that token isn't already expired
        if (tokenData.expires > Date.now()) {
          tokenData.expires = Date.now() + 1000 * 60 * 60;

          // Store the new expiration
          _data.update('tokens', id, tokenData, function(err) {
            if (!err){
              callback(200);
            }else{
              callback(500, {'Error' : 'Token already expired and can\'t be extended'})
            }
          });
        } else {
          callback(400, {'Error' : 'Could not update token\'s expiration'});
        }
      } else {
        callback(400, {'Error' : 'This specified token doesn\'t exist'});
      }
    });
  } else {
    callback(400, {'Error' : 'Missing required field or field(s) are invalid'});
  }
};

// tokens - DELETE
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data,callback) {
  //check that the token id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // lookup the token
    _data.read('tokens', id, function(err, tokenData){
      if (!err && tokenData) {
        _data.delete('tokens', id, function(err){
          if (!err) {
            callback(200);
          } else {
            callback(500, {'Error' : 'Could not delete the specified token'});
          }
        });
      } else {
        callback(400, {'Error' : 'Could not find the specified token'});
      }
    });
  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// Checks handlers
handlers.checks = function(data, callback){
  var acceptableMethods = ['post','get','put','delete'];

  if (acceptableMethods.indexOf(data.method) > -1){
      handlers._checks[data.method](data, callback);
  } else {
      callback(405);
  }
};

// Container for checks submethods
handlers._checks = {};

// checks - POST
// Required data: protocol, url, method, successCodes, timeoutSeconds
// Optional data: none
handlers._checks.post = function(data, callback){
  // Check all inputs fields for validity
  var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol.trim()) > -1 ? data.payload.protocol.trim() : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method.trim()) > -1 ? data.payload.method.trim() : false;
  var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 == 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    // Get the token from headers
    var token = typeof(data.headers.token)=='string' ? data.headers.token : false;
    // lookup the token
    _data.read('tokens', token, function(err, tokenData){
      if (!err && tokenData) {
        var userPhone = tokenData.phone;
        // Lookup the user
        _data.read('users', userPhone, function(err, userData){
          if (!err && userData) {
            var userChecks = typeof(userData.checks)=='object' && userData.checks instanceof Array ? userData.checks : [];
            // Verify that user has less than the number of max-checks-per-user
            if (userChecks.length < config.maxChecks){
              // create a random id for the new check
              var checkId = helpers.createRandomString(20);
              // Create the check object and include the user's phone
              var checkObject = {
                'id' : checkId,
                'userPhone' : userPhone,
                'protocol' : protocol,
                'url' : url,
                'method' : method,
                'successCodes' : successCodes,
                'timeoutSeconds' : timeoutSeconds
              };

              _data.create('checks', checkId, checkObject, function(err){
                if (!err){
                  // Add the check id to the user object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  _data.update('users', userPhone, userData, function(err){
                    if (!err){
                      callback(200, checkObject);
                    }else{
                      callback(500, {'Error' : 'Could not update the user with the new check'});
                    }
                  });
                }else {
                  callback(500, {'Error' : 'Could not create the new check'});
                }
              });
            } else {
              callback(400, {'Error' : 'User already has the maximum number of checks ('+config.maxChecks+')' });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, {'Error' : 'Missing required inputs or input values are invalid'});
  }
};

// checks - GET
// Required data: id
// Optionaldata: none
handlers._checks.get = function(data, callback){
  //check that the id number is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the check
    _data.read('checks', id, function(err, checkData){
      if (!err && checkData) {
        // Get the token from headers
        var token = typeof(data.headers.token)=='string' ? data.headers.token : false;
        // Veriofy that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
            if(tokenIsValid){
              callback(200, checkData);
            }else{
              callback(403);
            }
        });
      } else {
        callback(404);
      }
    });
  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// checks - PUT
// Required data: id
// Optionaldata: protocol, url, method, successCodes, timeoutSeconds, one must be provided
handlers._checks.put = function(data, callback){
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

  var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol.trim()) > -1 ? data.payload.protocol.trim() : false;
  var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method.trim()) > -1 ? data.payload.method.trim() : false;
  var successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 == 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if (id) {
    // Lookup the check
    if (protocol || url || method || successCodes || timeoutSeconds) {
      // Lookup the check
      _data.read('checks', id, function(err, checkData){
        if (!err && checkData) {
          // Get the token from headers
          var token = typeof(data.headers.token)=='string' ? data.headers.token : false;
          // Veriofy that the given token is valid and belongs to the user who created the check
          handlers._tokens.verifyToken(token,checkData.userPhone,function(tokenIsValid){
            if(tokenIsValid){
              if (protocol) {
                checkData.protocol = protocol;
              }
              if (url) {
                checkData.url = url;
              }
              if (method) {
                checkData.method = method;
              }
              if (successCodes) {
                checkData.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }
              _data.update('checks', id, checkData, function(err){
                if (!err){
                  callback(200);
                } else {
                  callback(500, {'Error' : 'Could not update the check'});
                }
              });
            }else{
              callback(403);
            }
          });
        } else {
          callback(404, {'Error' : 'Check with given id doesn\'t exist'});
        }
      });
    } else {
      callback(400, {'Error' : 'Missing field(s) to update'});
    }
  } else {
    callback(400, {'Error' : 'Missing required field'});
  }
};

// checks - DELETE
// Required data: id
// Optionaldata: none
handlers._checks.delete = function(data, callback){
  //check that the check id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if (id) {
    // Lookup the check
    _data.read('checks', id, function(err, checkData){
      if (!err && checkData) {
        var userPhone = checkData.userPhone;
        // Get the token from headers
        var token = typeof(data.headers.token)=='string' ? data.headers.token : false;
        // Veriofy that the given token is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token,userPhone,function(tokenIsValid){
            if(tokenIsValid){
              _data.delete('checks', id, function(err){
                if (!err) {
                  // Lookup the user
                  _data.read('users', userPhone, function(err, userData){
                    if (!err && userData) {
                      var userChecks = typeof(userData.checks)=='object' && userData.checks instanceof Array ? userData.checks : [];
                      // Remove the deleted check from user's checks
                      var checkPosition = userChecks.indexOf(id);
                      if (checkPosition > -1) {
                        userData.checks.splice(checkPosition, 1);
                        // Resave the user's data
                        _data.update('users', userPhone, userData, function(err){
                          if (!err){
                            callback(200);
                          }else{
                            callback(500, {'Error' : 'Could not update the user data, with updated collection of checks'});
                          }
                        });
                      } else {
                        callback(500, {'Error' : 'Could not find the check on user data object, so could not remove it'});
                      }
                    } else {
                      callback(500, {'Error' : 'Could not find the user who created the check, so could not remove the check from the list of checks on their user object.'});
                    }
                  });
                } else {
                  callback(500, {'Error' : 'Could not delete the specified checks'});
                }
              });
            }else{
              callback(403);
            }
        });
      } else {
        callback(404, {'Error' : 'Check with given id doesn\'t exist'});
      }
    });
  }else{
    callback(400, {'Error' : 'Missing required field'});
  }
};

// Sample handler
handlers.ping = function(data, callback){
  // Callback a http status code, and a payload object
  callback(200);
};

// Not found handler
handlers.notFound = function(data, callback){
  callback(404);
};

// Export the module
module.exports = handlers;
