//Require a config JSON with the database config
const config = require('../config/dbconf');
const MysqlJson = require('mysql-json');
const connection = new MysqlJson(config);

//Require 'mysql' lib and call its createConnection function
/**const connection = require('mysql-json').createConnection(config, (err) => {
  if(err){
    throw err;
  }
  console.log("Connected!");
});
**/

module.exports = connection;
