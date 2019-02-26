/*
 * library for storing and editing data
 *
 */

// Dependencies
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers')

// Create container for the module to be exported
var lib = {};

// base dir for data
lib.baseDir = path.join(__dirname, '/../.data/')
// Function to write data to file
lib.create = function(dir, file, data, callback){
  // open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','wx',function(err,fileDescriptor){
      if (!err && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, function(err){
          if (!err) {
            fs.close(fileDescriptor, function(err){
              if (!err) {
                callback(false);
              } else {
                callback('error closing new file');
              }
            })
          } else {
            callback('error writing to new file');
          }
        });
      } else {
        callback('Could not create a file, it may already exist');
      }
  });

};

lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', function(err, data) {
    if (!err && data) {
      var parsedData = helpers.parseJsonToObject(data);
      callback(err, parsedData);
    }else{
      callback(err, data);
    }
  })
};

lib.update = function(dir, file, data, callback){
  // open the file for writing
  fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
      if (!err && fileDescriptor) {
        // Convert data to string
        var stringData = JSON.stringify(data);
        fs.truncate(fileDescriptor, function(err){
          if (!err) {
            fs.writeFile(fileDescriptor, stringData, function(err){
              if (!err) {
                fs.close(fileDescriptor, function(err){
                  if (!err) {
                    callback(false);
                  } else {
                    callback('error closing existing file');
                  }
                })
              } else {
                callback('error writing to existing file');
              }
            });
          } else {
            callback('error truncating existing file');
          }
        });
      } else {
        callback('Could not open the file for updating, it may not exist yet');
      }
  });
};

lib.delete = function(dir, file, callback){
  // open the file for writing
  fs.unlink(lib.baseDir+dir+'/'+file+'.json',function(err){
      if (!err) {
        callback(false);
      } else {
        callback('Could not delete the file, it may not exist yet');
      }
  });
};

// List all data from dir
lib.list = function(dir, callback) {
  fs.readdir(lib.baseDir+dir+'/', function(err,data) {
    if(!err && data && data.length > 0){
      var trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};

// Export to module
module.exports = lib;
