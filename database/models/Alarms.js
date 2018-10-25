const alarms = {};
const connection = require('../connection');

//Nombre de la tabla en la base de datos
alarms.name = "ALARMS";

//Ruta usada en el API para hacer consultas a esta tabla en la base de datos
alarms.href = "/" + alarms.name.toLowerCase();

//Queries
alarms.queries = {
  getAll: "SELECT * FROM " + alarms.name
}

/**
Ejecuta el query getAll definido en alarms.queries en la base de datos, el cuál nos retornará todos
los datos de la tabla alarms.name
Luego ejecuta el callback que se le pasa en @param callback con la respuesta que la consulta le dio
**/
alarms.getAll = (callback) => {
    if (connection){
      connection.query(alarms.queries.getAll, (err, rows) => {
        //Callback for query
        if(err) {
          throw err;
        } else {
          callback(null, rows);
        }
      });
    }
  }

module.exports = alarms;
