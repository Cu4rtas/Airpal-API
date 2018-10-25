//Require a config JSON with the database config
const config = require('../config/dbconf');

//Require 'mysql' lib and call its createConnection function
const connection = require('mysql').createConnection(config, (err) => {
  if(err){
    throw err;
  }
  console.log("Connected!");
});

module.exports = connection;
