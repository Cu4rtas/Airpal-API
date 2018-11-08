const installation = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
installation.name = "INSTALLATION";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
installation.href = "/" + installation.name.toLowerCase();

//Queries
installation.queries = {
  getAll: "SELECT * FROM " + installation.name
};

/**
Ejecuta el query getAll definido en installation.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla installation.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
installation.getAll = (callback) => {
    if (connection){
      connection.query(installation.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  };

installation.insert = (pojo, callback) => {
  if(connection){
    connection.insert('INSTALLATION', pojo, (err, res) => {
      if(err){
        throw err;
      } else {
        callback(res);
      }
    });
  }
};

module.exports = installation;
